const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { FieldValue, Timestamp, getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");
const { logger } = require("firebase-functions");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { HttpsError, onCall } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");

initializeApp();

const db = getFirestore();
const REGION = "europe-west1";
const CODE_LIFETIME_MS = 10 * 60 * 1000;
const MAX_MULTICAST_TOKENS = 500;

function requireAuth(request) {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Sign in before performing this action.");
  }
  return request.auth.uid;
}

async function requireProfile(uid, expectedRole) {
  const snap = await db.collection("users").doc(uid).get();
  if (!snap.exists) {
    throw new HttpsError("failed-precondition", "Complete your profile first.");
  }
  const profile = snap.data();
  if (expectedRole && profile.role !== expectedRole) {
    throw new HttpsError(
      "permission-denied",
      `This action requires a ${expectedRole} account.`
    );
  }
  return profile;
}

function randomSixDigitCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function getUnusedPairingCodeReference() {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = randomSixDigitCode();
    const ref = db.collection("pairingCodes").doc(code);
    const snap = await ref.get();
    if (!snap.exists) return { code, ref };
  }
  throw new HttpsError("resource-exhausted", "Could not allocate a code. Retry shortly.");
}

async function deleteQueryInBatches(query, batchSize = 300) {
  let snapshot = await query.limit(batchSize).get();
  while (!snapshot.empty) {
    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    if (snapshot.size < batchSize) break;
    snapshot = await query.limit(batchSize).get();
  }
}

async function getEnabledTokensForUsers(userIds) {
  const tokens = [];
  for (const uid of userIds) {
    const snap = await db
      .collection("users")
      .doc(uid)
      .collection("devices")
      .where("enabled", "==", true)
      .get();
    snap.docs.forEach((doc) => {
      const token = doc.data().token || doc.id;
      if (token) tokens.push(token);
    });
  }
  return [...new Set(tokens)];
}

async function sendMulticastInChunks(tokens, notification, data = {}) {
  const messaging = getMessaging();
  for (let index = 0; index < tokens.length; index += MAX_MULTICAST_TOKENS) {
    const chunk = tokens.slice(index, index + MAX_MULTICAST_TOKENS);
    const result = await messaging.sendEachForMulticast({
      tokens: chunk,
      notification,
      data: Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, String(value)])
      ),
      android: {
        priority: "high",
        notification: {
          channelId: "care-alerts",
          sound: "default"
        }
      }
    });

    const invalidTokens = [];
    result.responses.forEach((response, responseIndex) => {
      if (
        !response.success &&
        ["messaging/registration-token-not-registered", "messaging/invalid-registration-token"]
          .includes(response.error?.code)
      ) {
        invalidTokens.push(chunk[responseIndex]);
      }
    });

    for (const invalidToken of invalidTokens) {
      const matches = await db.collectionGroup("devices")
        .where("token", "==", invalidToken)
        .get();
      const batch = db.batch();
      matches.docs.forEach((doc) => batch.set(doc.ref, {
        enabled: false,
        invalidatedAt: FieldValue.serverTimestamp()
      }, { merge: true }));
      if (!matches.empty) await batch.commit();
    }
  }
}

exports.generatePairingCode = onCall({ region: REGION }, async (request) => {
  const patientId = requireAuth(request);
  await requireProfile(patientId, "patient");

  const oldCodes = await db.collection("pairingCodes")
    .where("patientId", "==", patientId)
    .where("used", "==", false)
    .get();

  const { code, ref } = await getUnusedPairingCodeReference();
  const expiresAt = Timestamp.fromMillis(Date.now() + CODE_LIFETIME_MS);

  const batch = db.batch();
  oldCodes.docs.forEach((doc) => batch.delete(doc.ref));
  batch.set(ref, {
    code,
    patientId,
    used: false,
    createdAt: FieldValue.serverTimestamp(),
    expiresAt
  });
  await batch.commit();

  return { code, expiresAt: expiresAt.toDate().toISOString() };
});

exports.redeemPairingCode = onCall({ region: REGION }, async (request) => {
  const caregiverId = requireAuth(request);
  await requireProfile(caregiverId, "caregiver");

  const code = String(request.data?.code || "").trim();
  if (!/^\d{6}$/.test(code)) {
    throw new HttpsError("invalid-argument", "Enter a valid six-digit code.");
  }

  const codeRef = db.collection("pairingCodes").doc(code);
  let patientId;
  let linkId;

  await db.runTransaction(async (transaction) => {
    const codeSnap = await transaction.get(codeRef);
    if (!codeSnap.exists) {
      throw new HttpsError("not-found", "This pairing code does not exist.");
    }

    const codeData = codeSnap.data();
    if (codeData.used) {
      throw new HttpsError("failed-precondition", "This pairing code has already been used.");
    }
    if (!codeData.expiresAt || codeData.expiresAt.toMillis() <= Date.now()) {
      throw new HttpsError("deadline-exceeded", "This pairing code has expired.");
    }

    patientId = codeData.patientId;
    if (patientId === caregiverId) {
      throw new HttpsError("failed-precondition", "You cannot pair an account with itself.");
    }

    const patientRef = db.collection("users").doc(patientId);
    const patientSnap = await transaction.get(patientRef);
    if (!patientSnap.exists || patientSnap.data().role !== "patient") {
      throw new HttpsError("not-found", "The patient account is unavailable.");
    }

    linkId = `${patientId}_${caregiverId}`;
    const linkRef = db.collection("caregiverLinks").doc(linkId);
    transaction.set(linkRef, {
      patientId,
      caregiverId,
      status: "active",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });
    transaction.update(codeRef, {
      used: true,
      usedBy: caregiverId,
      usedAt: FieldValue.serverTimestamp()
    });
  });

  return { patientId, linkId };
});

exports.unlinkRelationship = onCall({ region: REGION }, async (request) => {
  const uid = requireAuth(request);
  const linkId = String(request.data?.linkId || "").trim();
  if (!linkId) {
    throw new HttpsError("invalid-argument", "A relationship ID is required.");
  }

  const ref = db.collection("caregiverLinks").doc(linkId);
  const snap = await ref.get();
  if (!snap.exists) return { removed: true };

  const link = snap.data();
  if (link.patientId !== uid && link.caregiverId !== uid) {
    throw new HttpsError("permission-denied", "You cannot remove this relationship.");
  }

  await ref.delete();
  return { removed: true };
});

exports.onCheckInCreated = onDocumentCreated(
  {
    document: "users/{patientId}/checkIns/{checkInId}",
    region: REGION
  },
  async (event) => {
    const patientId = event.params.patientId;
    const patientRef = db.collection("users").doc(patientId);
    const activeAlerts = await db.collection("alerts")
      .where("patientId", "==", patientId)
      .where("status", "==", "active")
      .get();

    const batch = db.batch();
    batch.set(patientRef, {
      lastCheckInAt: FieldValue.serverTimestamp(),
      activeMissedCheckInAlertId: null,
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });
    activeAlerts.docs.forEach((doc) => batch.set(doc.ref, {
      status: "resolved",
      resolvedAt: FieldValue.serverTimestamp(),
      resolution: "patient_checked_in"
    }, { merge: true }));
    await batch.commit();
  }
);

exports.checkMissedCheckIns = onSchedule(
  {
    schedule: "every 15 minutes",
    region: REGION,
    timeZone: "UTC",
    retryCount: 1
  },
  async () => {
    const patientsSnap = await db.collection("users").where("role", "==", "patient").get();
    const now = Date.now();

    for (const patientDoc of patientsSnap.docs) {
      const patient = patientDoc.data();
      const thresholdHours = Math.min(24, Math.max(1, Number(patient.alertThresholdHours || 6)));
      const baseline = patient.lastCheckInAt || patient.createdAt;
      if (!baseline?.toMillis) continue;

      const elapsedMs = now - baseline.toMillis();
      if (elapsedMs <= thresholdHours * 60 * 60 * 1000) continue;
      if (patient.activeMissedCheckInAlertId) continue;

      const links = await db.collection("caregiverLinks")
        .where("patientId", "==", patientDoc.id)
        .where("status", "==", "active")
        .get();
      const caregiverIds = links.docs.map((doc) => doc.data().caregiverId).filter(Boolean);
      if (!caregiverIds.length) continue;

      const alertRef = db.collection("alerts").doc();
      const created = await db.runTransaction(async (transaction) => {
        const freshPatient = await transaction.get(patientDoc.ref);
        if (!freshPatient.exists || freshPatient.data().activeMissedCheckInAlertId) return false;

        transaction.set(alertRef, {
          patientId: patientDoc.id,
          patientName: patient.fullName || "A linked patient",
          caregiverIds,
          type: "missed_check_in",
          status: "active",
          thresholdHours,
          lastCheckInAt: baseline,
          message: `No check-in has been recorded for more than ${thresholdHours} hours.`,
          createdAt: FieldValue.serverTimestamp()
        });
        transaction.set(patientDoc.ref, {
          activeMissedCheckInAlertId: alertRef.id,
          updatedAt: FieldValue.serverTimestamp()
        }, { merge: true });
        return true;
      });

      if (!created) continue;

      const tokens = await getEnabledTokensForUsers(caregiverIds);
      if (tokens.length) {
        await sendMulticastInChunks(tokens, {
          title: `${patient.fullName || "Patient"} missed a check-in`,
          body: `No check-in has been recorded for more than ${thresholdHours} hours.`
        }, {
          type: "missed_check_in",
          patientId: patientDoc.id,
          alertId: alertRef.id
        });
      }
    }
  }
);

exports.deleteMyAccount = onCall(
  {
    region: REGION,
    timeoutSeconds: 540,
    memory: "512MiB"
  },
  async (request) => {
    const uid = requireAuth(request);
    const userRef = db.collection("users").doc(uid);

    const [patientLinks, caregiverLinks, patientAlerts, codeDocs] = await Promise.all([
      db.collection("caregiverLinks").where("patientId", "==", uid).get(),
      db.collection("caregiverLinks").where("caregiverId", "==", uid).get(),
      db.collection("alerts").where("patientId", "==", uid).get(),
      db.collection("pairingCodes").where("patientId", "==", uid).get()
    ]);

    const batch = db.batch();
    [...patientLinks.docs, ...caregiverLinks.docs, ...patientAlerts.docs, ...codeDocs.docs]
      .forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    const caregiverAlertQuery = db.collection("alerts").where("caregiverIds", "array-contains", uid);
    await deleteQueryInBatches(caregiverAlertQuery);

    await db.recursiveDelete(userRef);
    await getAuth().deleteUser(uid);

    logger.info("WellNest account deleted", { uid });
    return { deleted: true };
  }
);
