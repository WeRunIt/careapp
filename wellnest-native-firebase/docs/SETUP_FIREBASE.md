# Firebase setup

## 1. Create the project

Open Firebase Console and create a project. Record its project ID.

Enable:

- Authentication → Sign-in method → Email/Password
- Cloud Firestore
- Cloud Messaging
- Crashlytics
- Cloud Functions
- Hosting

Cloud Functions deployments require billing to be enabled on the Firebase project.

## 2. Register the Android application

Register:

```text
Android package name: com.mohamad.wellnest
```

This must exactly match `expo.android.package` in `app.config.js`.

Download the generated `google-services.json` and place it here:

```text
wellnest-native-firebase/google-services.json
```

Do not use `firebase/google-services.example.json` as real configuration. It is only a shape reference.

## 3. Configure local environment

Edit `.env`:

```env
EXPO_PUBLIC_USE_MOCK_DATA=false
EXPO_PUBLIC_FIREBASE_REGION=europe-west1
EXPO_PUBLIC_SUPPORT_EMAIL=support@yourdomain.com
```

Restart Metro whenever `.env` changes.

## 4. Select the Firebase project

```bash
npx firebase-tools login
npx firebase-tools use --add
```

This creates `.firebaserc`. Do not manually copy `.firebaserc.example` without replacing the project ID.

## 5. Install function packages

```bash
cd functions
npm install
cd ..
```

## 6. Deploy Firestore

```bash
npm run firebase:deploy:rules
```

The command deploys both `firestore.rules` and `firestore.indexes.json`.

## 7. Deploy Cloud Functions

```bash
npm run firebase:deploy:functions
```

Included callable/triggered functions:

- `generatePairingCode`
- `redeemPairingCode`
- `unlinkRelationship`
- `onCheckInCreated`
- `checkMissedCheckIns`
- `deleteMyAccount`

## 8. Deploy the public pages

Edit the support email and company details inside `public/`, then:

```bash
npm run firebase:deploy:hosting
```

After deployment, paste the privacy-policy and deletion URLs into Play Console.

## 9. Create a native development build

```bash
npm install --global eas-cli
eas login
eas init
eas build --platform android --profile development
```

When `eas init` provides a project ID, replace `REPLACE_WITH_EAS_PROJECT_ID` in `app.config.js`. Also replace the placeholder `owner`.

## 10. Test with two accounts

1. Register a patient.
2. Register a caregiver on another device or emulator.
3. Generate a pairing code as the patient.
4. Redeem it as the caregiver.
5. Submit a patient check-in.
6. Verify caregiver data access.
7. Temporarily set the patient threshold to one hour in Firestore and use the emulator/manual function testing to validate alerts.

Do not change a device clock to test trusted server scheduling. Use emulator data or controlled timestamps in a non-production Firebase project.
