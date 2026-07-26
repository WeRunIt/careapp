# Security and safety notes

This starter includes meaningful safeguards, but no starter repository should be treated as a completed security review.

## Existing controls

- Deny-by-default Firestore rules
- Users may only write their own wellness collections
- Caregivers only read data belonging to actively linked patients
- Pairing codes are server-generated, temporary, and single-use
- Relationship creation/deletion is handled by trusted Cloud Functions
- Account deletion is performed on the server
- Check-in alert detection uses server time
- Invalid FCM tokens are disabled
- Hosted pages send basic defensive HTTP headers

## Required production work

1. Add Firebase App Check enforcement.
2. Add rate limiting and abuse monitoring to callable functions.
3. Consider multi-factor authentication for caregivers.
4. Validate every writable field in Firestore rules, not only the critical fields shown.
5. Keep immutable medication-dose records rather than a `takenToday` Boolean.
6. Add audit records for relationship and alert changes.
7. Write emulator tests for every allowed and denied rule path.
8. Separate development, staging, and production Firebase projects.
9. Configure log retention and remove unnecessary health data from logs.
10. Define data retention, export, correction, and deletion procedures.
11. Review encryption, backup, breach response, and applicable health/privacy laws with qualified professionals.
12. Never describe the app as guaranteed emergency monitoring.

## Sensitive data

Medication, mood, and safety information may be health-related personal data. Collect only what is necessary. Avoid storing IP addresses, precise location, or device details unless there is a documented need, legal basis, retention rule, and clear disclosure.

## Emergency wording

Use language such as:

> WellNest supports routines and caregiver awareness. It is not an emergency service and cannot guarantee continuous monitoring or notification delivery.

Do not imply that a missed-check-in notification proves that a person is unsafe.
