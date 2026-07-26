import { FIREBASE_REGION } from "../config";

let cache;
function load() {
  if (cache) return cache;
  const auth = require("@react-native-firebase/auth").default;
  const firestore = require("@react-native-firebase/firestore").default;
  const functions = require("@react-native-firebase/functions").default;
  const messaging = require("@react-native-firebase/messaging").default;
  const crashlytics = require("@react-native-firebase/crashlytics").default;
  cache = {
    auth: auth(),
    db: firestore(),
    functions: functions(FIREBASE_REGION),
    messaging: messaging(),
    crashlytics: crashlytics(),
    firestore
  };
  return cache;
}
export const firebaseAuth=()=>load().auth;
export const firebaseDb=()=>load().db;
export const firebaseFunctions=()=>load().functions;
export const firebaseMessaging=()=>load().messaging;
export const firebaseCrashlytics=()=>load().crashlytics;
export const firestoreStatics=()=>load().firestore;
