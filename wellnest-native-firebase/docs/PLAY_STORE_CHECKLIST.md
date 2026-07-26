# Google Play release checklist

## Application identity

- [ ] Replace Expo `owner`
- [ ] Run `eas init` and replace the EAS project ID
- [ ] Confirm permanent package name
- [ ] Set version and Android version code
- [ ] Replace placeholder icon/splash artwork if desired
- [ ] Verify production AAB signing credentials

## Firebase

- [ ] Production `google-services.json` is present
- [ ] `.env` uses `EXPO_PUBLIC_USE_MOCK_DATA=false`
- [ ] Production Firestore rules and indexes are deployed
- [ ] Functions are deployed in the configured region
- [ ] App Check is enabled and enforced
- [ ] Crashlytics receives a controlled test crash
- [ ] Push notifications work on multiple Android versions
- [ ] Account deletion removes application data correctly

## Store listing

- [ ] App name and descriptions
- [ ] App icon
- [ ] Feature graphic
- [ ] Phone screenshots
- [ ] Support email
- [ ] Privacy-policy URL
- [ ] Public account-deletion URL
- [ ] Accurate Data Safety form
- [ ] Health Apps declaration
- [ ] Content rating
- [ ] Target audience declaration
- [ ] Ads declaration
- [ ] App access/testing credentials if required

## Testing

- [ ] Patient sign-up/login/logout/reset
- [ ] Caregiver sign-up/login/logout/reset
- [ ] Medication add/take/delete
- [ ] Local reminder after app closes
- [ ] Mood and habit logging
- [ ] Check-in creation and live caregiver update
- [ ] Pairing expiration and one-time use
- [ ] Unauthorized caregiver cannot access patient data
- [ ] Relationship removal immediately removes access
- [ ] Missed-check-in function avoids duplicate alerts
- [ ] Alert notification opens the intended patient screen
- [ ] Offline and reconnect behavior
- [ ] Account deletion
- [ ] Accessibility with large text and screen reader
- [ ] Small phone and tablet layouts
- [ ] Internal and closed Play testing requirements completed

## Build

```bash
eas build --platform android --profile production
eas submit --platform android --profile production
```

The included production build profile outputs an Android App Bundle.
