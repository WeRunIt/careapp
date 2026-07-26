# WellNest Prototype

A dependency-free, mobile-first prototype based on the uploaded Wellness Check-In app plan.

## Run it

Open `index.html` directly in any modern browser.

For the best local experience, you can also serve the folder:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Included interactions

- Patient dashboard and “I’m OK” check-in
- Medication list, filters, take/undo, and add-medication form
- Mood selector, habit check-in, notes, and seven-day history
- Profile settings and configurable missed-check-in threshold
- Patient/caregiver role switching
- Caregiver overview, linked patients, alerts, acknowledgement, and pairing flow
- LocalStorage persistence and reset
- Responsive desktop/mobile navigation
- Accessible focus states, large touch targets, reduced-motion support, and high-contrast text

## Design tokens

- Background: `#F9F7F4`
- Primary purple: `#6B63B5`
- Healing sage: `#5E9B8A`
- Fonts: Poppins headings + Inter body copy, with system fallbacks when those fonts are not installed

This is a front-end prototype. Firebase Auth, Firestore, Cloud Functions, and real push notifications are represented by interactive mock behavior and can be connected in a production implementation.
