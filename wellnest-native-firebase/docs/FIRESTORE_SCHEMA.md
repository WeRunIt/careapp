# Firestore schema

## `users/{uid}`

```js
{
  email: "maya@example.com",
  fullName: "Maya Haddad",
  role: "patient", // patient | caregiver
  relation: null,
  alertThresholdHours: 6,
  emergencyContact: {
    name: "Rami Haddad",
    phone: "+961..."
  },
  lastCheckInAt: Timestamp | null,
  activeMissedCheckInAlertId: string | null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## `users/{uid}/medications/{medicationId}`

```js
{
  name: "Metformin",
  dosage: "500 mg",
  instructions: "Take with breakfast",
  time: "08:00",
  remainingDoses: 24,
  takenToday: false,
  enabled: true,
  lastTakenAt: Timestamp | null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

The starter treats `takenToday` as a prototype field. A production adherence system should use immutable dose occurrence documents rather than resetting a Boolean.

## `users/{uid}/moodLogs/{logId}`

```js
{
  mood: 4,
  habits: {
    sleep: true,
    breakfast: true,
    lunch: true,
    dinner: true,
    medications: true,
    movement: true
  },
  notes: "A calm day.",
  createdAt: Timestamp
}
```

## `users/{uid}/checkIns/{checkInId}`

```js
{
  status: "okay",
  timezone: "Asia/Beirut",
  source: "mobile",
  createdAt: Timestamp
}
```

## `users/{uid}/devices/{token}`

```js
{
  token: "FCM registration token",
  platform: "android",
  enabled: true,
  updatedAt: Timestamp,
  invalidatedAt: Timestamp | null
}
```

## `caregiverLinks/{patientId_caregiverId}`

```js
{
  patientId: "patient uid",
  caregiverId: "caregiver uid",
  status: "active",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

The deterministic ID allows Firestore rules to verify a relationship without a query.

## `pairingCodes/{sixDigitCode}`

```js
{
  code: "481926",
  patientId: "patient uid",
  used: false,
  usedBy: null,
  createdAt: Timestamp,
  expiresAt: Timestamp,
  usedAt: Timestamp | null
}
```

Client access is denied. Callable Cloud Functions manage codes.

## `alerts/{alertId}`

```js
{
  patientId: "patient uid",
  patientName: "Maya Haddad",
  caregiverIds: ["caregiver uid"],
  type: "missed_check_in",
  status: "active", // active | acknowledged | resolved
  thresholdHours: 6,
  lastCheckInAt: Timestamp,
  message: "No check-in has been recorded for more than 6 hours.",
  createdAt: Timestamp,
  acknowledgedAt: Timestamp | null,
  acknowledgedBy: string | null,
  resolvedAt: Timestamp | null
}
```
