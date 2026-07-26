# WellNest — React Native + Firebase Starter

A production-oriented **React Native Android starter written in JavaScript/JSX** for medication reminders, mood/habit tracking, patient safety check-ins, caregiver pairing, and missed-check-in alerts.

The project starts in **mock mode**, so you can inspect the complete interface before creating a Firebase project. When you add your Firebase Android configuration and set `EXPO_PUBLIC_USE_MOCK_DATA=false`, the same screens use Firebase Authentication, Cloud Firestore, Cloud Functions, Firebase Cloud Messaging, and Crashlytics.

> WellNest is a wellness-support starter. It is not an emergency service or a medical device.

## Included

- Patient and caregiver account roles
- Email/password authentication
- Role-based Expo Router navigation
- Patient home, medication, mood, profile, pairing, settings, and account deletion screens
- Caregiver dashboard, patient list, patient details, alerts, profile, and pairing screens
- Medication CRUD and local daily notifications
- Mood/habit logs and check-in history
- Firestore real-time subscriptions
- Temporary six-digit caregiver pairing codes
- Scheduled missed-check-in detection
- FCM caregiver notifications
- Firestore security rules and indexes
- Firebase Emulator configuration
- Firebase Hosting privacy and account-deletion pages
- EAS Android development APK, preview APK, and production AAB profiles
- Poppins + Inter typography and the requested cream/purple/sage design system

## Technology

- Expo SDK 57
- React Native 0.86
- React 19.2
- Expo Router
- JavaScript and JSX
- React Native Firebase 25.1
- Firebase Functions v2 on Node.js 22
- EAS Build

## 1. Run the interface in mock mode

Requirements:

- Node.js 22.13 or later
- npm
- Android Studio/emulator, a physical Android device, or Expo Go for the mock-only interface

```bash
npm install
npm run check:setup
npm run start:go
```

Use either prototype login:

```text
Patient:   patient@demo.com
Caregiver: caregiver@demo.com
Password:  any non-empty password
```

Mock data is saved locally with AsyncStorage.

## 2. Connect real Firebase

Follow [docs/SETUP_FIREBASE.md](docs/SETUP_FIREBASE.md).

The important steps are:

1. Create a Firebase project.
2. Register Android package `com.mohamad.wellnest`.
3. Download `google-services.json` into the project root.
4. Enable Email/Password Authentication and Firestore.
5. Change `.env`:

```env
EXPO_PUBLIC_USE_MOCK_DATA=false
EXPO_PUBLIC_FIREBASE_REGION=europe-west1
EXPO_PUBLIC_SUPPORT_EMAIL=your-real-support-email@example.com
```

6. Install function dependencies:

```bash
cd functions
npm install
cd ..
```

7. Deploy rules, indexes, functions, and hosting:

```bash
npx firebase-tools login
npx firebase-tools use --add
npm run firebase:deploy:rules
npm run firebase:deploy:functions
npm run firebase:deploy:hosting
```

## 3. Create a native development build

React Native Firebase contains native Android code, so real Firebase mode requires a development build rather than Expo Go.

```bash
npm install --global eas-cli
eas login
eas init
eas build --platform android --profile development
```

Install the generated APK on your device, then run:

```bash
npm start
```

## 4. Build the Play Store bundle

Replace the placeholder Expo owner/project values in `app.config.js`, then:

```bash
eas build --platform android --profile production
```

The production profile creates an Android App Bundle (`.aab`).

For internal Play testing:

```bash
eas submit --platform android --profile production
```

Read [docs/PLAY_STORE_CHECKLIST.md](docs/PLAY_STORE_CHECKLIST.md) before submission.

## Important files

```text
app/                         Expo Router screens
src/components/              Shared native UI
src/context/                 Authentication and wellness state
src/services/                Firebase/data/notification services
src/firebase/native.js       Lazy native Firebase loader
functions/index.js           Trusted server operations
firestore.rules              Firestore authorization
firestore.indexes.json       Required compound indexes
public/                      Hosted privacy/deletion pages
docs/                        Setup, schema, security, and release notes
app.config.js                Expo native configuration
eas.json                     Android build/submit profiles
```

## Commands

```bash
npm run start:go                 # mock UI through Expo
npm start                        # native development client
npm run android                  # local native Android build
npm run doctor                   # Expo dependency checks
npm run check:setup              # starter configuration checks
npm run firebase:emulators       # local Firebase suite
npm run firebase:deploy:rules
npm run firebase:deploy:functions
npm run firebase:deploy:hosting
npm run build:development
npm run build:preview
npm run build:production
npm run submit:android
```

## Before production

Replace all placeholders, review the Firestore rules with a security professional, test notifications on real devices, add monitoring and abuse controls, complete the health-app/Data Safety declarations, and obtain legal/privacy review for the countries where the app will operate.
