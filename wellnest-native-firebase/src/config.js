export const USE_MOCK_DATA =
  String(process.env.EXPO_PUBLIC_USE_MOCK_DATA).toLowerCase() !== "false";
export const FIREBASE_REGION =
  process.env.EXPO_PUBLIC_FIREBASE_REGION || "europe-west1";
export const SUPPORT_EMAIL =
  process.env.EXPO_PUBLIC_SUPPORT_EMAIL || "support@example.com";
