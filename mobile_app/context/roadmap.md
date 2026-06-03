# Roadmap

## Phase 1: Foundation (Weeks 1-2)
- **App Setup:** Scaffold Expo app, configure TypeScript, ESLint, Prettier.
- **Navigation:** Setup Expo Router structure (tabs, stacks, modals).
- **Theming & UI:** Configure NativeWind, create core UI components (Buttons, Inputs, Cards, Typography) based on the Dark Gold theme.
- **Localization:** Integrate `i18next` with base strings for English and Khmer.
- **Auth Module:** Integrate Clerk Expo for sign-in/sign-up flows. Support roles (Tourist vs. Driver).

## Phase 2: Core Customer Experience (Weeks 3-5)
- **Home/Dashboard:** Dynamic feed showcasing top tours, route packages, and available taxis.
- **Browsing:** Search and filter views for:
  - Taxis (by vehicle type)
  - Intercity Routes (source to destination)
  - Tour Packages (itinerary, duration)
- **Booking Flow:** Multi-step wizard (select service, date/time, pickup location, passenger details).
- **Booking Tracking:** Active booking screen with real-time status updates (Pending -> Accepted -> En Route -> Completed).

## Phase 3: Payments & Support (Weeks 6-7)
- **Payments:** Integrate payment method selection.
- **Manual Payments:** Build flow for uploading bank transfer payment proofs.
- **Reviews & Ratings:** Ability for tourists to rate drivers/tours and leave feedback.
- **Tourist Assistance:** Emergency contacts screen, travel tips, and direct WhatsApp deep-linking for live support.

## Phase 4: Driver Experience (Weeks 8-9)
- **Driver Auth/Onboarding:** Specific login flow and document verification pending state.
- **Driver Dashboard:** Toggle Online/Offline status. View assigned/incoming bookings.
- **Trip Management:** Update trip statuses (Accept, Arrived, Started, Completed).
- **Earnings & History:** View past trips, daily/weekly earnings breakdown, and tourist reviews.

## Phase 5: Polish & Release (Weeks 10-12)
- **Performance:** Optimize images, list rendering (FlashList), and animation performance.
- **Offline & Cache:** Implement caching for static content (tours, tips) when offline.
- **Push Notifications:** Setup Expo Push Notifications for booking status changes.
- **QA & Accessibility:** Screen reader support, dynamic text sizing, end-to-end testing.
- **Deployment:** App store submission via EAS Submit (iOS App Store & Google Play).
