const fs = require("fs");
const path = require("path");

const hasAndroidFirebase = fs.existsSync(path.resolve(__dirname, "google-services.json"));
const firebasePlugins = hasAndroidFirebase
  ? ["@react-native-firebase/app", "@react-native-firebase/messaging", "@react-native-firebase/crashlytics"]
  : [];

module.exports = {
  expo: {
    name: "WellNest",
    slug: "wellnest",
    owner: "replace-with-your-expo-username",
    version: "1.0.0",
    runtimeVersion: { policy: "appVersion" },
    orientation: "portrait",
    scheme: "wellnest",
    userInterfaceStyle: "light",
    icon: "./assets/icon.png",
    splash: { image: "./assets/splash.png", resizeMode: "contain", backgroundColor: "#F9F7F4" },
    updates: { fallbackToCacheTimeout: 0 },
    android: {
      package: "com.mohamad.wellnest",
      versionCode: 1,
      adaptiveIcon: { foregroundImage: "./assets/adaptive-icon.png", backgroundColor: "#F9F7F4" },
      permissions: ["android.permission.POST_NOTIFICATIONS", "android.permission.VIBRATE"],
      ...(hasAndroidFirebase ? { googleServicesFile: "./google-services.json" } : {})
    },
    ios: { bundleIdentifier: "com.mohamad.wellnest", supportsTablet: true },
    web: { bundler: "metro", favicon: "./assets/favicon.png" },
    plugins: [
      "expo-router",
      ["expo-notifications", {
        icon: "./assets/notification-icon.png",
        color: "#6B63B5",
        defaultChannel: "care-alerts"
      }],
      ["expo-secure-store", {
        configureAndroidBackup: true,
        faceIDPermission: "Allow WellNest to use Face ID to protect your account."
      }],
      ["expo-splash-screen", {
        image: "./assets/splash.png",
        imageWidth: 180,
        resizeMode: "contain",
        backgroundColor: "#F9F7F4"
      }],
      ...firebasePlugins
    ],
    experiments: { typedRoutes: false },
    extra: { eas: { projectId: "REPLACE_WITH_EAS_PROJECT_ID" } }
  }
};
