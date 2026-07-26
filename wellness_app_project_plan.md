# Wellness Check-In App — Agile Project Plan
**Project:** Elderly/Chronic Illness Wellness & Safety App  
**Tech Stack:** React Native, Firebase (Auth, Firestore, Cloud Messaging), Cloud Functions  
**Methodology:** Agile Kanban  
**Solo Developer:** Mohamad  
**Target Launch:** MVP to TestFlight/Beta in ~8 weeks

---

## 📊 Project Overview: The Big Picture

### Three Core Domains
1. **Medication Reminders** — scheduled push notifications
2. **Mood/Habit Tracking** — daily check-ins + pattern analysis
3. **Caregiver Safety Net** — auto-alerts when patient goes quiet

### Build Order (Dependency Chain)
```
Phase 1: UI Shells
  ↓
Phase 2: Authentication
  ↓
Phase 3: Core Data Layer
  ↓
Phase 4: Caregiver Pairing
  ↓
Phase 5: Notifications & Alerts
  ↓
Phase 6: Testing & Polish
```

---

## 🎯 Phase 1: UI Foundation & Navigation
**Duration:** 1.5 weeks | **Story Points:** 13  
**Goal:** Build all screens with mock data; no backend yet

### Milestone: App Shell & Patient Screens

#### Epic 1.1: Navigation & Tab Structure
**User Story:** "As a patient, I can navigate between all screens from a tab bar so I can see medication, mood tracking, check-in, and profile screens."

**Tasks:**
- [ ] Set up Expo project with TypeScript
- [ ] Install React Navigation (bottom tabs + stack navigator)
- [ ] Create TabNavigator with placeholders: Home, Meds, Mood, Profile
- [ ] Set up folder structure: `/screens`, `/components`, `/utils`, `/assets`
- [ ] Configure app.json for iOS/Android icon, splash screen
- [ ] Test on physical device/simulator

**Acceptance Criteria:**
- ✅ App launches and shows tab bar with 4 tabs
- ✅ Can tap between tabs smoothly
- ✅ Each tab renders a placeholder screen
- ✅ Splash screen displays on launch

**Est. SP:** 3

---

#### Epic 1.2: Home / Dashboard Screen (Patient)
**User Story:** "As a patient, I see my next medication, today's check-in status, and a big 'I'm OK' button on the home screen."

**Tasks:**
- [ ] Design Home screen layout (Figma rough sketch or text-based wireframe)
- [ ] Build Header component (greeting + date)
- [ ] Build NextMeds card (hardcoded mock data)
- [ ] Build CheckInStatus card (shows if checked in today, last check-in time)
- [ ] Build large primary "I'm OK" button (tap-to-check-in, no action yet)
- [ ] Add greeting personalization (get patient name from phone storage)

**Acceptance Criteria:**
- ✅ Header shows current date & greeting
- ✅ Next medication displays with time
- ✅ Check-in status shows "last checked at X hours ago"
- ✅ Large button responds to tap (console log for now)
- ✅ Layout is readable on iPhone SE, iPhone 12, Android 10+

**Est. SP:** 3

---

#### Epic 1.3: Medication Reminder Screen
**User Story:** "As a patient, I can see all my medications, what they're for, when I take them, and how many doses I have left."

**Tasks:**
- [ ] Build MedsScreen layout (list of medication cards)
- [ ] Build MedicationCard component (name, dosage, time, next due, remaining count)
- [ ] Add "Take Now" button on each card (no action yet)
- [ ] Add "Upcoming" filter tab (next 24h, next week, etc.)
- [ ] Build AddMedication screen skeleton (button only, no form yet)
- [ ] Add visual indicator for overdue meds (red badge)

**Acceptance Criteria:**
- ✅ Display mock list of 3–5 medications
- ✅ Each card shows name, dosage, time, remaining count
- ✅ "Take Now" button exists and is tappable
- ✅ Overdue meds show visual alert
- ✅ Layout scrolls smoothly on long lists

**Est. SP:** 3

---

#### Epic 1.4: Mood & Habit Tracking Screen
**User Story:** "As a patient, I can log how I'm feeling today and track sleep, meals, and energy so I see patterns."

**Tasks:**
- [ ] Build MoodScreen layout (mood selector + habit checklist)
- [ ] Build MoodSelector component (5-point emoji scale: 😢 😟 😐 🙂 😄)
- [ ] Build HabitChecklist component (Sleep ✓/✗, Breakfast ✓/✗, Lunch ✓/✗, Dinner ✓/✗, Meds Taken ✓/✗)
- [ ] Build "Submit Check-In" button (logs to AsyncStorage for now)
- [ ] Build simple HistoryView tab (shows last 7 days of mood entries, mock data)
- [ ] Add trend indicator ("You feel better on days you eat breakfast" — hardcoded example)

**Acceptance Criteria:**
- ✅ Can select mood and see selection highlighted
- ✅ Can toggle each habit on/off
- ✅ Submit button saves to local storage (verified in AsyncStorage)
- ✅ History shows last 7 entries (mock)
- ✅ Simple trend message displays (no real ML)

**Est. SP:** 3

---

#### Epic 1.5: Profile Screen (Patient)
**User Story:** "As a patient, I can see my profile info and settings like medication list, emergency contact, and app preferences."

**Tasks:**
- [ ] Build ProfileScreen layout (name, age, emergency contact, medications summary)
- [ ] Add EditProfile button (leads to edit form, not functional yet)
- [ ] Add linked caregivers section (placeholder: "No caregivers linked yet")
- [ ] Add settings section (notification toggle, language preference, theme)
- [ ] Add logout button
- [ ] Build version info footer

**Acceptance Criteria:**
- ✅ Profile displays hardcoded user info
- ✅ All buttons navigate to intended screens (or show placeholders)
- ✅ Settings toggles work locally (AsyncStorage)
- ✅ Logout button clears mock data

**Est. SP:** 2

---

## 🔐 Phase 2: Authentication
**Duration:** 1 week | **Story Points:** 8  
**Goal:** Users can sign up, log in, and stay logged in with Firebase Auth

### Milestone: Login & Account Creation

#### Epic 2.1: Firebase Auth Setup
**User Story:** "As a developer, I've set up Firebase Auth so the app can securely sign users up and log them in."

**Tasks:**
- [ ] Create Firebase project (Google Console)
- [ ] Enable Firebase Auth (Email/Password, Phone optional)
- [ ] Install `firebase` and `@react-native-firebase/auth` packages
- [ ] Create `/utils/firebaseConfig.ts` with Firebase initialization
- [ ] Write Auth context (useAuth hook) for global auth state
- [ ] Test Firebase connection on device
- [ ] Set up Firebase security rules (read/write restrictions pending)

**Acceptance Criteria:**
- ✅ Firebase project created & linked to React Native app
- ✅ Auth SDK installed and initialized
- ✅ useAuth hook works and exposes `user`, `loading`, `error`
- ✅ Console shows successful Firebase connection

**Est. SP:** 2

---

#### Epic 2.2: Sign-Up Screen
**User Story:** "As a new patient, I can create an account with email and password, and the app verifies it works."

**Tasks:**
- [ ] Build SignUpScreen layout (email input, password input, confirm password, name field, role selector: Patient/Caregiver)
- [ ] Add form validation (email format, password strength, matching passwords)
- [ ] Connect to Firebase Auth `createUserWithEmailAndPassword()`
- [ ] Create user document in Firestore (initial profile data)
- [ ] Add error handling & display (duplicate email, weak password, etc.)
- [ ] Success flow → redirect to Home after signup
- [ ] Add link to login screen ("Already have an account?")

**Acceptance Criteria:**
- ✅ Form validates inputs before submission
- ✅ Firebase Auth creates account successfully
- ✅ New user document created in Firestore with role
- ✅ User redirected to Home after signup
- ✅ Error messages are clear and actionable
- ✅ Tested on device (real Firebase project)

**Est. SP:** 3

---

#### Epic 2.3: Login Screen
**User Story:** "As a returning patient or caregiver, I can log in with my email and password."

**Tasks:**
- [ ] Build LoginScreen layout (email input, password input, login button, forgot password link)
- [ ] Connect to Firebase Auth `signInWithEmailAndPassword()`
- [ ] Persist auth state using AsyncStorage token caching
- [ ] Add error handling (wrong password, user not found, network errors)
- [ ] Success flow → redirect to Home
- [ ] Add link to SignUp screen ("Don't have an account?")
- [ ] Test login persistence (close app, reopen, still logged in)

**Acceptance Criteria:**
- ✅ Successful login redirects to Home
- ✅ Auth state persists across app restarts
- ✅ Logout clears auth state
- ✅ Error messages for invalid credentials
- ✅ Tested on device

**Est. SP:** 2

---

#### Epic 2.4: Auth Navigation Guard
**User Story:** "As the app, I route logged-out users to Login and logged-in users to Home automatically."

**Tasks:**
- [ ] Build RootNavigator component (checks `user` from useAuth hook)
- [ ] Redirect unauthenticated → LoginStack (Login, SignUp screens)
- [ ] Redirect authenticated → AppStack (Home, Tabs, etc.)
- [ ] Add loading spinner while checking auth state
- [ ] Test navigation on first launch, logout, and login

**Acceptance Criteria:**
- ✅ First launch shows login screen
- ✅ After login, app goes to Home
- ✅ After logout, app goes back to Login
- ✅ No flickering during auth check
- ✅ Deep links work (e.g., invite link to caregiver pairing)

**Est. SP:** 1

---

## 💾 Phase 3: Core Data Layer & Firestore
**Duration:** 2 weeks | **Story Points:** 21  
**Goal:** Patient data persists in Firestore; local caching for offline-first UX

### Milestone: Firestore Schema & CRUD Operations

#### Epic 3.1: Firestore Schema Design
**User Story:** "As a developer, I've designed a scalable Firestore schema for patients, medications, mood logs, and caregiver relationships."

**Tasks:**
- [ ] Design collections: `users`, `medications`, `moodLogs`, `checkIns`, `caregiverLinks`
- [ ] Define document structure (IDs, fields, types, indexes)
  - `users/{userId}` → (email, name, role, dateOfBirth, emergencyContact, createdAt)
  - `medications/{userId}/meds/{medId}` → (name, dosage, frequency, startDate, endDate, remindTimes)
  - `moodLogs/{userId}/logs/{logId}` → (timestamp, mood, habits{sleep, breakfast, lunch, dinner}, notes)
  - `checkIns/{userId}/checks/{checkId}` → (timestamp, status: "checked_in", createdAt)
  - `caregiverLinks/{linkId}` → (patientId, caregiverId, status: "pending"/"active", createdAt)
- [ ] Write security rules for Firestore (read own data, caregiver reads linked patient, etc.)
- [ ] Create TypeScript interfaces for all data types
- [ ] Document schema in comments or separate markdown file

**Acceptance Criteria:**
- ✅ Schema designed and documented
- ✅ TypeScript interfaces match Firestore docs
- ✅ Security rules prevent unauthorized reads
- ✅ Indexes planned for query-heavy collections

**Est. SP:** 3

---

#### Epic 3.2: Medication CRUD
**User Story:** "As a patient, I can add, view, and edit my medications, and they save to Firestore."

**Tasks:**
- [ ] Build AddMedicationScreen form (name, dosage, frequency dropdown, start/end date, reminder times)
- [ ] Write `addMedication(userId, medData)` service function
- [ ] Write `getMedications(userId)` query with real-time listener
- [ ] Build EditMedicationScreen (pre-populate form, update via service)
- [ ] Write `updateMedication(userId, medId, updates)` function
- [ ] Write `deleteMedication(userId, medId)` function
- [ ] Integrate into MedsScreen (fetch from Firestore, display, handle loading/errors)
- [ ] Add local caching (AsyncStorage backup for offline access)

**Acceptance Criteria:**
- ✅ Can add medication → appears in Firestore immediately
- ✅ Can edit medication → updates reflected in real time
- ✅ Can delete medication → removed from Firestore
- ✅ Real-time listener updates UI when med data changes
- ✅ Works offline (cached data shows, sync on reconnect)
- ✅ No console errors, proper error handling

**Est. SP:** 5

---

#### Epic 3.3: Mood Log CRUD
**User Story:** "As a patient, I can log my mood and habits, and the app stores historical data to show trends."

**Tasks:**
- [ ] Write `submitMoodLog(userId, moodData)` service function
- [ ] Write `getMoodLogs(userId, daysBack?)` query (default last 30 days)
- [ ] Write `deleteMoodLog(userId, logId)` function
- [ ] Connect MoodScreen form to `submitMoodLog()` (save on submit)
- [ ] Refactor HistoryView to fetch from Firestore instead of mock
- [ ] Add date picker to HistoryView (view logs from specific day)
- [ ] Build TrendAnalysis helper (simple: count mood by day, identify patterns)
  - e.g., "You logged sad 3x on days you skipped breakfast"
- [ ] Add local caching for offline mood logging

**Acceptance Criteria:**
- ✅ Mood log submits to Firestore
- ✅ History view fetches and displays logs
- ✅ Can filter by date range
- ✅ Simple trend appears (e.g., "Better on breakfast days")
- ✅ Offline mood logging queues and syncs

**Est. SP:** 5

---

#### Epic 3.4: Check-In Log CRUD
**User Story:** "As a patient, I tap 'I'm OK' and it logs a check-in to Firestore; caregivers see my status."

**Tasks:**
- [ ] Write `submitCheckIn(userId, status)` service function
- [ ] Write `getLastCheckIn(userId)` query
- [ ] Connect "I'm OK" button on Home to `submitCheckIn()`
- [ ] Add success feedback (toast/haptic feedback on tap)
- [ ] Display "Last checked in X hours ago" on home screen, updated real-time
- [ ] Write `getCheckInHistory(userId, daysBack?)` for analytics
- [ ] Store check-in metadata (timezone, device, IP for debugging)
- [ ] Add offline queuing for check-ins

**Acceptance Criteria:**
- ✅ Tapping "I'm OK" creates Firestore doc immediately
- ✅ Home screen shows last check-in time, updates real-time
- ✅ Check-in timestamp is server-set (not client-set, to prevent clock manipulation)
- ✅ Works offline, syncs when reconnected
- ✅ Clear success feedback on tap

**Est. SP:** 4

---

#### Epic 3.5: User Profile Persistence
**User Story:** "As a patient, my profile (name, age, emergency contact, etc.) saves to Firestore and I can edit it."

**Tasks:**
- [ ] Write `getUserProfile(userId)` query
- [ ] Write `updateUserProfile(userId, updates)` function
- [ ] Build EditProfileScreen form (name, DOB, emergency contact, medical conditions)
- [ ] Connect ProfileScreen to `getUserProfile()`, real-time listener
- [ ] Integrate into SignUp (create initial profile doc)
- [ ] Add form validation (email, phone, etc.)
- [ ] Cache profile locally

**Acceptance Criteria:**
- ✅ Profile loads on app launch
- ✅ Can edit and save profile
- ✅ Changes reflect in real-time
- ✅ Emergency contact is required field
- ✅ Offline profile view available

**Est. SP:** 4

---

## 🤝 Phase 4: Caregiver Pairing & Relationship Management
**Duration:** 1.5 weeks | **Story Points:** 13  
**Goal:** Patients can link caregivers; caregivers see linked patients' data and alerts

### Milestone: Multi-Account & Relationship Linking

#### Epic 4.1: Caregiver Account Onboarding
**User Story:** "As a caregiver, I can sign up and my account is marked as caregiver so I can view patient data."

**Tasks:**
- [ ] Extend SignUpScreen: add role selector (Patient / Caregiver)
- [ ] Create caregiver-specific profile fields (name, phone, relation to patient)
- [ ] Update Firestore user doc to include role
- [ ] Build CaregiverHomeScreen (different layout from patient home)
  - Show list of linked patients
  - Show each patient's last check-in, mood, meds
- [ ] Add caregiver-specific navigation (home, my patients, settings)

**Acceptance Criteria:**
- ✅ Can sign up as caregiver
- ✅ User doc has role="caregiver"
- ✅ CaregiverHomeScreen displays (empty list initially)
- ✅ Caregiver can see navigation for patients

**Est. SP:** 3

---

#### Epic 4.2: Caregiver Linking / Pairing
**User Story:** "As a patient, I can generate a pairing code and send it to a caregiver so they can access my data. As a caregiver, I can enter a pairing code to link with a patient."

**Tasks:**
- [ ] Build PairingCodeScreen (show 6-digit code, auto-refresh every 10 min, copy button)
- [ ] Write `generatePairingCode(patientId)` Cloud Function
  - Creates temporary doc in `pairingCodes/{code}` with patientId + expiration (10 min)
- [ ] Write `validatePairingCode(code)` function
- [ ] Build LinkPatientScreen (caregiver: text input for pairing code, submit button)
- [ ] Write `linkPatient(caregiverId, patientId)` function
  - Creates/updates `caregiverLinks/{linkId}` doc
  - Sets status = "active"
- [ ] Add success notification after linking
- [ ] Build linked patients list on CaregiverHomeScreen

**Acceptance Criteria:**
- ✅ Patient can generate and display pairing code
- ✅ Code expires after 10 minutes
- ✅ Caregiver can enter code and link to patient
- ✅ Both see each other in their accounts (patient sees caregiver, caregiver sees patient)
- ✅ Pairing reflected immediately in Firestore

**Est. SP:** 5

---

#### Epic 4.3: Caregiver Data Access
**User Story:** "As a caregiver, I can see my linked patient's medications, mood history, and check-ins in a unified view."

**Tasks:**
- [ ] Build PatientDetailScreen (full view of one patient)
  - Patient name, last check-in status, time
  - Recent mood logs (last 7 days)
  - Current medications + next due
  - Last 10 check-ins (timeline)
- [ ] Write queries for caregiver to fetch patient data (with security rules enforcing access)
- [ ] Build PatientListScreen (all linked patients, sortable by last check-in time, status)
- [ ] Add real-time listeners so caregiver data updates live
- [ ] Add pull-to-refresh gesture

**Acceptance Criteria:**
- ✅ Caregiver sees all linked patient data
- ✅ Data updates in real-time when patient logs mood/meds/check-in
- ✅ Can tap patient to view detailed history
- ✅ Security rules prevent caregivers from seeing unlinked patients

**Est. SP:** 4

---

#### Epic 4.4: Unlink & Manage Relationships
**User Story:** "As a patient, I can remove a caregiver. As a caregiver, I can view all my linked patients and remove a link if needed."

**Tasks:**
- [ ] Build "Linked Caregivers" section on PatientProfileScreen
  - List caregivers with "Remove" button
- [ ] Write `unlinkCaregiver(patientId, caregiverId)` function (deletes doc from `caregiverLinks`)
- [ ] Build "My Patients" section on CaregiverProfileScreen
  - List patients with "Remove" button
- [ ] Add confirmation dialog before removing link
- [ ] Update UI to reflect removal immediately

**Acceptance Criteria:**
- ✅ Patient can remove caregiver from list
- ✅ Caregiver can remove patient from list
- ✅ Unlink deletes from Firestore
- ✅ Removed caregiver loses access to patient data (verified by security rules)
- ✅ Both users get confirmation message

**Est. SP:** 2

---

## 🔔 Phase 5: Push Notifications & Missed Check-In Alerts
**Duration:** 2 weeks | **Story Points:** 21  
**Goal:** Patients get med reminders; caregivers get alerted if patient misses check-in

### Milestone: Notification Infrastructure & Cloud Functions

#### Epic 5.1: Firebase Cloud Messaging (FCM) Setup
**User Story:** "As a developer, I've set up FCM so the app can receive push notifications on both iOS and Android."

**Tasks:**
- [ ] Install `@react-native-firebase/messaging` package
- [ ] Request notification permissions from user (iOS: show native prompt, Android: auto-grant)
- [ ] Get FCM token and store in Firestore `users/{userId}/fcmToken`
- [ ] Write service to handle incoming messages (`onMessage`, `onNotificationOpenedApp`)
- [ ] Test FCM token generation on device
- [ ] Handle token refresh (store new token if it changes)
- [ ] For iOS: upload APNs certificate to Firebase Console

**Acceptance Criteria:**
- ✅ App requests notification permission on first launch
- ✅ FCM token generated and stored in Firestore
- ✅ Test notification sent from Firebase Console appears on device
- ✅ Tapping notification opens app (or navigates to specific screen)
- ✅ Works on iOS and Android devices

**Est. SP:** 4

---

#### Epic 5.2: Medication Reminder Notifications
**User Story:** "As a patient, I get a push notification at my scheduled medication times so I don't forget."

**Tasks:**
- [ ] Design notification content (med name, dosage, "Take now" button)
- [ ] Write Cloud Function `scheduleMedicationReminders(userId, medId, times[])`
  - Uses PubSub or Cloud Scheduler to trigger at specified times
  - For each time, calls FCM to send notification to patient
- [ ] Alternative: use React Native local notifications library (easier for solo dev)
  - Install `react-native-push-notification` or similar
  - Schedule local notifications based on med times
- [ ] Build notification handler (on tap: open app to med details, mark as taken)
- [ ] Add "snooze" option (remind in 15 min)
- [ ] Add "Mark as Taken" quick action button in notification

**Acceptance Criteria:**
- ✅ Notification appears at scheduled time
- ✅ Can tap to open app
- ✅ Can mark as taken from notification (without opening app)
- ✅ Snooze button delays notification 15 min
- ✅ Tested on iOS and Android
- ✅ Works even if app is closed (local notification handler)

**Est. SP:** 5

---

#### Epic 5.3: Missed Check-In Detection & Caregiver Alert
**User Story:** "As a caregiver, if my patient hasn't checked in for 6+ hours, I get an automatic alert so I know to call and check on them."

**Tasks:**
- [ ] Write Cloud Function `checkMissedCheckIns()` 
  - Runs on schedule (e.g., every 15 min via Cloud Scheduler)
  - For each patient with active caregivers:
    - Query latest check-in timestamp
    - If timestamp > 6 hours ago (configurable), flag as missed
    - Fetch caregiver FCM tokens from `caregiverLinks`
    - Send alert notification to each caregiver
  - Store alert status in Firestore (prevent duplicate alerts)
- [ ] Build settings screen where patient can set "alert threshold" (default 6h, range 1–24h)
- [ ] Caregiver receives notification with patient name and time since last check-in
- [ ] Tap notification → opens patient detail view in CaregiverHomeScreen
- [ ] Add "Mark as Acknowledged" button on alert (caregiver confirms they checked on patient)

**Acceptance Criteria:**
- ✅ Cloud Function runs and detects missed check-ins
- ✅ Caregiver receives notification if patient misses threshold
- ✅ Alert includes patient name and time since check-in
- ✅ Alert only sent once per missed check-in (no spam)
- ✅ Patient can customize alert threshold
- ✅ Caregiver can acknowledge alert
- ✅ Tested with manual trigger (Cloud Function console or Postman)

**Est. SP:** 7

---

#### Epic 5.4: Medication Adherence Alerts (Stretch Goal)
**User Story:** "As a caregiver, I'm notified if my patient misses a medication dose so I can follow up."

**Tasks:**
- [ ] Track med adherence: write `markMedicationTaken(userId, medId, timestamp)` function
- [ ] Patient taps "Take Now" → records in Firestore `medications/{userId}/meds/{medId}/adherence[]`
- [ ] Cloud Function `checkMissedMeds()` (similar to check-in)
  - Runs every hour
  - For each med due today with no adherence recorded:
    - If overdue by >2 hours, send alert to caregivers
- [ ] Caregiver notification: "Patient missed Aspirin (due 8am, now 10:30am)"
- [ ] Tap notification → med details view

**Acceptance Criteria:**
- ✅ Med taken timestamp records in Firestore
- ✅ Cloud Function detects overdue meds
- ✅ Caregiver notified with clear med info
- ✅ Only one alert per missed dose

**Est. SP:** 5 (stretch; defer to v1.1 if time is tight)

---

#### Epic 5.5: In-App Notification Center (Stretch Goal)
**User Story:** "As a user, I can see all past notifications in a notification center so I don't miss alerts."

**Tasks:**
- [ ] Build NotificationCenterScreen
- [ ] Write `getNotificationHistory(userId)` query
- [ ] Store notifications in Firestore `notifications/{userId}/notifications/{id}`
- [ ] Display list (recent first, grouped by date)
- [ ] Mark as read/unread
- [ ] Add search/filter (med reminders, check-in alerts, etc.)

**Acceptance Criteria:**
- ✅ Can see past notifications
- ✅ Tap to view detail
- ✅ Can mark read/delete

**Est. SP:** 3 (defer to v1.1)

---

## ✅ Phase 6: Testing, Polish & App Store Prep
**Duration:** 1.5 weeks | **Story Points:** 13  
**Goal:** MVP ready for TestFlight/beta; all bugs squashed, all flows user-tested

### Milestone: QA, UX Polish, and Submission

#### Epic 6.1: Manual Testing & Bug Fixes
**User Story:** "As QA, I've tested all flows (signup, login, meds, mood, check-in, pairing, alerts) and logged/fixed bugs."

**Tasks:**
- [ ] Test matrix: iOS + Android, multiple devices (old/new)
- [ ] Test flows:
  - Sign up as patient, sign up as caregiver
  - Add medication, edit, delete
  - Log mood, view history, see trends
  - Tap "I'm OK", see check-in update
  - Generate pairing code, link as caregiver
  - Caregiver sees patient data real-time
  - Med reminder notification triggers
  - Missed check-in alert triggers
- [ ] Test edge cases:
  - Offline mode (flight mode toggle)
  - Network flakiness (slow 3G sim)
  - App backgrounding/resuming
  - Timezone changes
  - Low battery mode
- [ ] Log bugs in simple tracker (Notion, GitHub Issues, or spreadsheet)
- [ ] Prioritize and fix critical bugs
- [ ] Retest fixes

**Acceptance Criteria:**
- ✅ All critical flows work end-to-end
- ✅ No crashes on core screens
- ✅ Offline data caching works
- ✅ Real-time updates sync properly
- ✅ Notifications deliver reliably
- ✅ No memory leaks (check React DevTools)

**Est. SP:** 5

---

#### Epic 6.2: UX Polish & Accessibility
**User Story:** "As a user, the app feels polished with smooth animations, clear error messages, and accessibility features."

**Tasks:**
- [ ] Add loading spinners on async operations
- [ ] Refine error messages (be specific, suggest fix)
- [ ] Add haptic feedback (vibration on button tap, success)
- [ ] Improve color contrast (WCAG AA standard)
- [ ] Add screen reader support (AccessibilityInfo labels)
- [ ] Smooth transitions between screens
- [ ] Add empty state screens (e.g., "No meds yet. Tap + to add.")
- [ ] Polish icons, spacing, typography
- [ ] Dark mode support (optional but nice)

**Acceptance Criteria:**
- ✅ No white text on light backgrounds
- ✅ Buttons/links are >44x44pt for touch
- ✅ Empty states are clear
- ✅ Loading spinners on every async call
- ✅ Error messages guide user to fix

**Est. SP:** 4

---

#### Epic 6.3: App Store Submission Prep
**User Story:** "As a developer, I've prepared the app for submission to TestFlight and Google Play beta."

**Tasks:**
- [ ] Create privacy policy (explain data collection, compliance with HIPAA/GDPR)
- [ ] Create terms of service
- [ ] Prepare app store screenshots (3-5 images per platform showing key flows)
- [ ] Write app description (what it does, for whom, why it matters)
- [ ] Set app version (e.g., 0.1.0 for beta, follow semver)
- [ ] Add app icon (1024x1024 minimum, must be PNG)
- [ ] Add splash screen art
- [ ] Configure app.json for both platforms
  - iOS: bundle ID, version, build number
  - Android: package name, version code
- [ ] iOS: create provisioning profiles & signing certificates (or use EAS)
- [ ] Android: generate signing key
- [ ] Set Firebase rules to prod (not test mode)

**Acceptance Criteria:**
- ✅ Privacy policy written and linked
- ✅ Screenshots capture key features
- ✅ App description is clear, under 170 chars
- ✅ Icons and splash screen ready
- ✅ Version bumped to 0.1.0
- ✅ All signing configs set up
- ✅ Firebase rules secure (read own data, caregiver access only)

**Est. SP:** 3

---

#### Epic 6.4: Beta Release to TestFlight & Play Store
**User Story:** "As a user, I can download the app from TestFlight (iOS) and Google Play internal testing (Android)."

**Tasks:**
- [ ] Build for iOS via EAS: `eas build --platform ios`
- [ ] Upload to TestFlight via Xcode or EAS
- [ ] Add internal testers (you + a few beta users)
- [ ] Build for Android via EAS: `eas build --platform android`
- [ ] Upload to Google Play Console (Internal Testing track)
- [ ] Invite testers via Google Play
- [ ] Monitor crash logs from TestFlight/Play Console
- [ ] Fix any submission blockers

**Acceptance Criteria:**
- ✅ App downloadable from TestFlight (iOS)
- ✅ App downloadable from Google Play Internal (Android)
- ✅ Testers can download and install
- ✅ App launches without crashing
- ✅ No crash reports in TestFlight/Play Console

**Est. SP:** 1

---

## 📅 Timeline Summary

| Phase | Title | Duration | Total SP | Dependency |
|-------|-------|----------|----------|-----------|
| 1 | UI Foundation | 1.5 weeks | 13 | None |
| 2 | Authentication | 1 week | 8 | Phase 1 |
| 3 | Firestore & Data | 2 weeks | 21 | Phase 2 |
| 4 | Caregiver Pairing | 1.5 weeks | 13 | Phase 3 |
| 5 | Notifications & Alerts | 2 weeks | 21 | Phase 4 |
| 6 | Testing & Launch | 1.5 weeks | 13 | Phase 5 |
| **TOTAL MVP** | **~9 weeks** | **89 SP** | **Solo** |

---

## 🚀 Weekly Cadence (Suggested)

**Rhythm:**
- **Monday:** Sprint planning (1h) — pick 13–21 SP for week, break into daily tasks
- **Daily:** 15 min standup (write in Slack/Notion: done yesterday, doing today, blockers)
- **Friday:** Demo + review (test builds on device, demo to imaginary stakeholder, log bugs)

**Velocity Target:** 13–21 SP/week (adjust based on actual output)

---

## 🔴 Critical Path & Risk Mitigation

**Critical Path:**
```
Phase 1 (UI) → Phase 2 (Auth) → Phase 3 (Firestore) 
  ↓
Phase 4 (Pairing) → Phase 5 (Alerts) → Phase 6 (Polish)
```

**Risks & Mitigation:**

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Firebase rules too restrictive | Caregiver can't read patient data | Write security rules early, test with Firestore emulator |
| Push notifications fail on iOS | Users miss med reminders | Test FCM + APNs setup in Phase 5 Epic 5.1 early |
| Cloud Function logic has bugs | Wrong alerts sent, false alarms | Unit test functions locally before deploy |
| Real-time Firestore listeners leak memory | App crashes over time | Unsubscribe from listeners on screen unmount |
| Offline caching conflicts with live sync | Data inconsistency | Design clear conflict resolution (server-wins for now) |

---

## 📊 Kanban Board Template

Print this weekly and update:

```
┌─────────────────┬──────────────────┬────────────────┬──────────┐
│   📋 To Do      │  🔄 In Progress  │  👀 In Review  │  ✅ Done │
├─────────────────┼──────────────────┼────────────────┼──────────┤
│ Epic 1.1: Nav   │ Epic 1.2: Home   │                │          │
│ Epic 1.3: Meds  │                  │                │          │
│ Epic 1.4: Mood  │                  │                │          │
│ Epic 1.5: Prof  │                  │                │          │
└─────────────────┴──────────────────┴────────────────┴──────────┘
```

Move cards left-to-right as work progresses. Limit WIP (work in progress) to 2–3 items.

---

## 📝 Definition of Done (DoD)

A story is done when:

- [ ] Code written and formatted (Prettier/ESLint pass)
- [ ] Tested on both iOS and Android devices
- [ ] Error handling implemented (no silent failures)
- [ ] Security reviewed (if applicable)
- [ ] Logged in GitHub with commit message
- [ ] Demo-able to stakeholder (works without console errors)
- [ ] No blocking bugs

---

## 🎯 Success Criteria for MVP Launch

- ✅ Patient can sign up, log in, stay logged in
- ✅ Patient can add meds and see reminders
- ✅ Patient can log mood/habits and see 7-day trend
- ✅ Patient can tap "I'm OK" and see check-in history
- ✅ Patient can link a caregiver via pairing code
- ✅ Caregiver can see linked patient's data in real-time
- ✅ Caregiver gets alert if patient misses 6h check-in window
- ✅ All data persists in Firestore
- ✅ Works offline (basic caching)
- ✅ No crashes or memory leaks
- ✅ Ready for TestFlight beta release

---

## Next Steps

1. **This week:** Print this plan, pick Phase 1 Epic 1.1–1.5 as Sprint 1
2. **Monday:** Create GitHub issues for each Task (link to this doc)
3. **Start coding:** Begin with RootNavigator + TabNavigator from Epic 1.1
4. **Daily:** Update Kanban board, track blockers
5. **Friday:** Demo to yourself (or a friend), log bugs

---

**Good luck! You've got this.** 🚀

This is a realistic, solo-dev roadmap. Adjust timeline based on your actual velocity after Sprint 1.
