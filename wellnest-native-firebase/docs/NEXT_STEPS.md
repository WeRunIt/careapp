# Recommended implementation order

1. Run and inspect mock mode.
2. Rename the app/package before registering Firebase if you do not want `com.mohamad.wellnest`.
3. Create separate Firebase development and production projects.
4. Connect authentication and test both roles.
5. Test medication, mood, and check-in writes.
6. Test pairing through the Emulator Suite.
7. Test Firestore rules with explicit allowed/denied cases.
8. Build a native Android development client.
9. Register real FCM device tokens and test caregiver alerts.
10. Add App Check, monitoring, rate limits, and audit events.
11. Replace policy placeholders with legally reviewed documents.
12. Complete Play internal testing before production.

## Product improvements after the starter

- Immutable medication dose schedules and adherence history
- Medication edit screen and repeat-day selection
- Caregiver invitation approval/revocation history
- Better trend charts with explanations
- Localization and right-to-left layout
- Offline mutation queue conflict handling
- Patient-controlled per-caregiver permissions
- Accessibility testing with TalkBack
- Support/admin console with strict role controls
