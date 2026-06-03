# Frontend Roadmap

Architecture: Feature Slice Pattern (see `architecture.md`).
Standards: `code-standards.md` | UI: `ui-context.md` | Rules: `ai-workflow-rules.md`

Complete phases in order — each phase depends on the previous.

---

## Phase 1 — Foundation

**Goal:** Runnable app with Clerk auth, role-based routing, shared infrastructure, and design system wired up.

**Backend dependency:** None — foundation is frontend-only setup.

### 1.1 Install Dependencies

- [x] `npm install @tanstack/react-query axios zustand next-intl zod`
- [x] `npm install lucide-react`
- [x] `npx shadcn@latest init` — configure with dark theme, CSS variables
- [x] Add shadcn components: `button card badge dialog input label select textarea toast skeleton`

### 1.2 Shared Infrastructure

- [x] `lib/api.ts` — Axios instance; inject `Authorization: Bearer <clerk_session_token>` via `auth().getToken()` on every request; base URL from `NEXT_PUBLIC_API_URL`
- [x] `lib/queryClient.ts` — TanStack Query client; `staleTime: 60_000`, `retry: 1`
- [x] `app/providers.tsx` — `QueryClientProvider` + `next-intl` provider wrapper (client component)
- [x] Update `app/layout.tsx` — wrap children with `<Providers>`, set `<html lang>` from locale, update metadata title to "TaxiTrio"

### 1.3 i18n Setup

- [x] `next.config.ts` — add `next-intl` plugin
- [x] `i18n/routing.ts` — define locales `['en', 'km', 'zh', 'ja', 'ko', 'fr']`, default `en`
- [x] `messages/en.json` — English strings (all keys; other locales copy structure)
- [x] `messages/km.json`, `messages/zh.json`, `messages/ja.json`, `messages/ko.json`, `messages/fr.json` — placeholder translations (same keys, English values for now)
- [x] `middleware.ts` — extend existing `clerkMiddleware` to also handle `next-intl` locale routing

### 1.4 Role-Based Middleware

- [x] Update `middleware.ts` — after Clerk auth, redirect `role:customer` to `/(customer)/dashboard`, `role:driver` to `/(driver)/dashboard`; unauthenticated users to Clerk sign-in; protect all `/(customer)/*` and `/(driver)/*` routes

### 1.5 Route Group Scaffolding

- [x] `app/(customer)/layout.tsx` — sidebar nav + main content area; links: Dashboard, Taxis, Routes, Tours, Bookings, Payments, Complaints, Notifications, Assistance
- [x] `app/(driver)/layout.tsx` — single-column layout; links: Dashboard, Trips, Earnings, Reviews, Telegram
- [x] Stub `page.tsx` for every route listed in `architecture.md` (customer + driver groups) — each returns a `<h1>` placeholder

### 1.6 Global Shared Components

- [x] `components/StatusBadge.tsx` — booking status badge using colors from `ui-context.md`
- [x] `components/PageHeader.tsx` — page title + optional subtitle
- [x] `components/EmptyState.tsx` — icon + message for empty lists
- [x] `components/LoadingSpinner.tsx` — centered spinner for suspense boundaries

---

## Phase 2 — Customer Browse Features

**Goal:** Customers can browse taxis, route packages, and tour packages.

**Backend dependency:** `GET /api/taxis`, `GET /api/routes`, `GET /api/routes/:id`, `GET /api/tours`, `GET /api/tours/:id` — all implemented in backend Phase 2.

### 2.1 Taxi Browser (`features/taxi-browser/`)

- [x] `features/taxi-browser/types.ts` — `Taxi` type matching backend response (id, model, plate_number, car_type, passenger_capacity, image_url, is_active, driver: { name, rating, languages, is_available })
- [x] `features/taxi-browser/schema.ts` — Zod schema to parse/validate `GET /api/taxis` response
- [x] `features/taxi-browser/hooks.ts` — `useTaxis()` TanStack Query hook calling `GET /api/taxis`
- [x] `features/taxi-browser/components/TaxiCard.tsx` — vehicle photo, model, type, capacity, driver name, rating stars, language badges, availability badge
- [x] `features/taxi-browser/components/TaxiGrid.tsx` — responsive grid of `TaxiCard`; loading skeleton; empty state
- [x] `app/(customer)/taxis/page.tsx` — import `TaxiGrid`, render with `<PageHeader>`

### 2.2 Route Packages (`features/route-packages/`)

- [x] `features/route-packages/types.ts` — `RoutePackage` type (id, name, origin, destination, duration_minutes, price, included_services, recommended_vehicle, image_url, is_active)
- [x] `features/route-packages/schema.ts` — Zod schema for list + detail responses
- [x] `features/route-packages/hooks.ts` — `useRoutes()` and `useRoute(id)` TanStack Query hooks
- [x] `features/route-packages/components/RouteCard.tsx` — route image, name, origin→destination, duration, price, "Book" CTA button
- [x] `features/route-packages/components/RouteDetail.tsx` — full detail view: all fields + included services list + "Book This Route" button
- [x] `app/(customer)/routes/page.tsx` — route list with `RouteCard` grid
- [x] `app/(customer)/routes/[id]/page.tsx` — `RouteDetail` component

### 2.3 Tour Packages (`features/tour-packages/`)

- [x] `features/tour-packages/types.ts` — `TourPackage` type (id, name, description, duration_hours, location, price, included_services, vehicle_type, image_url, is_active)
- [x] `features/tour-packages/schema.ts` — Zod schema for list + detail responses
- [x] `features/tour-packages/hooks.ts` — `useTours()` and `useTour(id)` TanStack Query hooks
- [x] `features/tour-packages/components/TourCard.tsx` — tour image, name, location, duration, price, "Book" CTA
- [x] `features/tour-packages/components/TourDetail.tsx` — full detail: all fields + itinerary + "Book This Tour" button
- [x] `app/(customer)/tours/page.tsx` — tour list with `TourCard` grid
- [x] `app/(customer)/tours/[id]/page.tsx` — `TourDetail` component

### 2.4 Customer Dashboard (`features/auth/`)

- [x] `features/auth/hooks.ts` — `useMe()` TanStack Query hook calling `GET /api/auth/me`; auto-creates user on first sign-in via `POST /api/users`
- [x] `features/auth/types.ts` — `User` type (id, clerk_id, full_name, email, phone, profile_photo_url)
- [x] `app/(customer)/dashboard/page.tsx` — welcome card with user name, quick-links to Taxis / Routes / Tours, recent bookings count (placeholder until Phase 3)

---

## Phase 3 — Booking & Payment

**Goal:** Customers can create bookings, track status, upload payment proof, and view payment status.

**Backend dependency:** `POST /api/bookings`, `GET /api/bookings/my`, `GET /api/bookings/:id`, `PUT /api/bookings/:id/cancel`, `POST /api/payments/:booking_id/upload-proof`, `GET /api/payments/:booking_id` — backend Phases 2 + 5.

### 3.1 Booking Creation (`features/booking/`)

- [x] `features/booking/types.ts` — `Booking`, `BookingDetail`, `BookingStatusHistory` types matching booking API schema
- [x] `features/booking/schema.ts` — `CreateBookingSchema` Zod schema: `booking_type`, `travel_date`, `travel_time`, `passenger_count`, `payment_method`, optional `route_package_id | tour_package_id | taxi_id`, optional `special_notes`
- [x] `features/booking/actions.ts` — `createBooking(data)` server action calling `POST /api/bookings`; `cancelBooking(id)` calling `PUT /api/bookings/:id/cancel`
- [x] `features/booking/hooks.ts` — `useMyBookings()`, `useBooking(id)` TanStack Query hooks
- [x] `features/booking/components/BookingForm.tsx` — form with date picker, time input, passenger count, payment method select, special notes; validates with `CreateBookingSchema`; pre-fills `booking_type` + package id from query params
- [x] `features/booking/components/BookingStatusTimeline.tsx` — vertical timeline showing all statuses from `status_history`; current status highlighted; uses `StatusBadge`
- [x] `features/booking/components/BookingCard.tsx` — compact card for list view: booking type, date, status badge, "View Details" link
- [x] `app/(customer)/bookings/new/page.tsx` — renders `BookingForm`; reads `?type=`, `?id=` query params to pre-fill
- [x] `app/(customer)/bookings/page.tsx` — `useMyBookings()` list with `BookingCard`; empty state
- [x] `app/(customer)/bookings/[id]/page.tsx` — `BookingStatusTimeline` + booking details + cancel button (only when status is `pending`)
- [x] Wire "Book" buttons in `RouteDetail`, `TourDetail`, `TaxiCard` to navigate to `/bookings/new?type=route&id=...`

### 3.2 Payment (`features/payment/`)

- [x] `features/payment/types.ts` — `Payment` type (id, booking_id, amount, method, status, proof_url, created_at)
- [x] `features/payment/schema.ts` — Zod schema for payment response
- [x] `features/payment/actions.ts` — `uploadPaymentProof(bookingId, file)` server action: upload file to `POST /api/payments/:booking_id/upload-proof` as `multipart/form-data`
- [x] `features/payment/hooks.ts` — `usePayment(bookingId)` TanStack Query hook
- [x] `features/payment/components/PaymentStatus.tsx` — status badge + method + amount + proof image thumbnail (if uploaded)
- [x] `features/payment/components/ProofUploadForm.tsx` — file input (image only), preview, submit; disabled when status is not `unpaid`
- [x] `app/(customer)/payments/[bookingId]/page.tsx` — `PaymentStatus` + `ProofUploadForm`; link from booking detail page

---

## Phase 4 — Driver Features

**Goal:** Drivers can manage profile, toggle availability, handle trip lifecycle, view earnings and reviews, and link Telegram.

**Backend dependency:** All `GET|PUT /api/driver/*` endpoints — backend Phase 3.

### 4.1 Driver Profile & Availability (`features/auth/`)

- [x] `features/auth/types.ts` — extend with `Driver` type (id, clerk_id, name, phone, languages, profile_photo_url, is_available, verification_status, rating)
- [x] `features/auth/hooks.ts` — add `useDriverProfile()` calling `GET /api/driver/profile`; `useUpdateDriverProfile()` mutation calling `PUT /api/driver/profile`
- [x] `features/auth/actions.ts` — `updateDriverProfile(data)` server action; `toggleAvailability()` calling `PUT /api/driver/availability`
- [x] `app/(driver)/dashboard/page.tsx` — availability toggle switch, profile summary card, quick stats (assigned trips count, total earnings)

### 4.2 Driver Trips (`features/driver-trips/`)

- [x] `features/driver-trips/types.ts` — reuse `Booking` + `BookingDetail` types
- [x] `features/driver-trips/hooks.ts` — `useDriverBookings()` calling `GET /api/driver/bookings`; mutations for each transition
- [x] `features/driver-trips/actions.ts` — `acceptBooking(id)`, `rejectBooking(id)`, `markArrived(id)`, `startTrip(id)`, `completeTrip(id)` — each calls the corresponding `PUT /api/driver/bookings/:id/<action>`
- [x] `features/driver-trips/components/TripCard.tsx` — booking summary + customer name + date + status badge + action button (context-aware: shows correct next action)
- [x] `features/driver-trips/components/TripActions.tsx` — action buttons rendered based on current status; confirms destructive actions (reject) with a dialog
- [x] `app/(driver)/trips/page.tsx` — list of assigned bookings with `TripCard`
- [x] `app/(driver)/trips/[id]/page.tsx` — full booking detail + `TripActions`

### 4.3 Driver Earnings (`features/driver-earnings/`)

- [x] `features/driver-earnings/types.ts` — `Earning` type (id, booking_id, amount, trip_date)
- [x] `features/driver-earnings/hooks.ts` — `useEarnings()` calling `GET /api/driver/earnings`
- [x] `features/driver-earnings/components/EarningsSummary.tsx` — total earnings card + completed trips count + average rating
- [x] `features/driver-earnings/components/EarningsTable.tsx` — per-trip earnings list with date, amount, booking reference
- [x] `app/(driver)/earnings/page.tsx` — `EarningsSummary` + `EarningsTable`

### 4.4 Driver Reviews (`features/reviews/`)

- [x] `features/reviews/types.ts` — `Review` type (id, booking_id, rating, message, customer_name, created_at)
- [x] `features/reviews/hooks.ts` — `useDriverReviews()` calling `GET /api/driver/reviews`
- [x] `features/reviews/components/ReviewCard.tsx` — star rating display, message, customer name, date
- [x] `app/(driver)/reviews/page.tsx` — list of reviews with average rating header

### 4.5 Telegram Link (`features/telegram-link/`)

- [x] `features/telegram-link/types.ts` — `TelegramLinkCode` type (code, expires_at)
- [x] `features/telegram-link/actions.ts` — `generateTelegramCode()` calling `POST /api/driver/telegram/generate-code`
- [x] `features/telegram-link/hooks.ts` — `useTelegramCode()` mutation
- [x] `features/telegram-link/components/TelegramLinkFlow.tsx` — "Generate Code" button → shows 6-digit code + countdown timer (10 min) + instructions to message the bot with `/link <code>`
- [x] `app/(driver)/telegram-link/page.tsx` — renders `TelegramLinkFlow`

---

## Phase 5 — Reviews, Complaints, Notifications & Assistance

**Goal:** Customers can rate drivers, submit complaints, view notifications, and access tourist assistance.

**Backend dependency:** `POST /api/reviews`, `POST /api/complaints`, `GET /api/complaints/my`, `GET /api/notifications`, `PUT /api/notifications/:id/read`, `PUT /api/notifications/read-all`, `GET /api/assistance` — backend Phase 5.

### 5.1 Customer Reviews (`features/reviews/`)

- [x] `features/reviews/schema.ts` — `CreateReviewSchema`: `booking_id` (uuid), `rating` (1–5 int), `message` (string, optional)
- [x] `features/reviews/actions.ts` — `createReview(data)` calling `POST /api/reviews`
- [x] `features/reviews/components/ReviewForm.tsx` — star rating selector (1–5), message textarea, submit; only shown when booking status is `completed` and no review exists yet
- [x] `app/(customer)/bookings/[id]/page.tsx` — append `ReviewForm` below booking detail when eligible

### 5.2 Complaints (`features/complaints/`)

- [x] `features/complaints/types.ts` — `Complaint` type (id, booking_id, category, description, status, admin_reply, created_at)
- [x] `features/complaints/schema.ts` — `CreateComplaintSchema`: `booking_id`, `category` enum (driver_behavior | vehicle_condition | pricing | service_quality | other), `description`
- [x] `features/complaints/actions.ts` — `createComplaint(data)` calling `POST /api/complaints`
- [x] `features/complaints/hooks.ts` — `useMyComplaints()` calling `GET /api/complaints/my`
- [x] `features/complaints/components/ComplaintForm.tsx` — category select, description textarea, submit
- [x] `features/complaints/components/ComplaintCard.tsx` — category, status badge, description, admin reply (if present)
- [x] `app/(customer)/complaints/page.tsx` — complaint list + "New Complaint" button → opens `ComplaintForm` in a dialog
- [x] `app/(customer)/complaints/new/page.tsx` — standalone `ComplaintForm` page (linked from booking detail)

### 5.3 Notifications (`features/notifications/`)

- [x] `features/notifications/types.ts` — `Notification` type (id, type, message, is_read, created_at)
- [x] `features/notifications/hooks.ts` — `useNotifications()` calling `GET /api/notifications`; `useMarkRead()` and `useMarkAllRead()` mutations
- [x] `features/notifications/components/NotificationList.tsx` — list of notifications; unread items highlighted; "Mark all read" button
- [x] `features/notifications/components/NotificationBell.tsx` — bell icon with unread count badge; used in layout nav
- [x] Update `app/(customer)/layout.tsx` — add `NotificationBell` to nav header
- [x] `app/(customer)/notifications/page.tsx` — full `NotificationList`

### 5.4 Tourist Assistance (`features/tourist-assistance/`)

- [x] `features/tourist-assistance/types.ts` — `AssistanceItem` type (id, category, title, content, is_active)
- [x] `features/tourist-assistance/hooks.ts` — `useAssistance()` calling `GET /api/assistance`
- [x] `features/tourist-assistance/components/AssistanceSection.tsx` — grouped by category (Emergency Support, Language Support, Route Assistance, Support Contact); each item as an accordion card
- [x] `features/tourist-assistance/components/WhatsAppButton.tsx` — renders a WhatsApp deep-link button with pre-filled message; accepts `message` prop; opens `https://wa.me/<number>?text=<encoded>`
- [x] `app/(customer)/assistance/page.tsx` — `AssistanceSection` + prominent `WhatsAppButton` for general support

---

## Phase 6 — Polish & Production Readiness

**Goal:** i18n complete, dark/light theme toggle, error boundaries, Sentry, responsive QA.

**Backend dependency:** None — frontend-only polish.

### 6.1 i18n Completion

- [x] Fill all `messages/*.json` locale files with real translations (km, zh, ja, ko, fr)
- [x] Add locale switcher component to both layout navbars
- [x] Verify all user-facing strings use `useTranslations()` — no hardcoded English strings in components

### 6.2 Theme Toggle

- [x] `components/ThemeToggle.tsx` — light/dark toggle using `next-themes`; install `next-themes`
- [x] Update `app/providers.tsx` — wrap with `ThemeProvider` from `next-themes`
- [x] Add `ThemeToggle` to both layout navbars

### 6.3 Error Handling

- [x] `app/error.tsx` — global error boundary page
- [x] `app/(customer)/error.tsx` and `app/(driver)/error.tsx` — role-scoped error boundaries
- [x] `app/not-found.tsx` — 404 page
- [x] Add Sentry: `npm install @sentry/nextjs`; `sentry.client.config.ts`, `sentry.server.config.ts`; wrap `app/layout.tsx`

### 6.4 Responsive QA

- [x] Audit all pages at mobile (375px), tablet (768px), desktop (1280px)
- [x] Fix any layout overflow or unreadable text at small breakpoints
- [x] Verify touch targets are ≥ 44px on mobile

### 6.5 Build Verification

- [x] `npm run build` passes with zero errors and zero TypeScript errors
- [x] `npm run lint` passes clean
- [x] Update `context/progress-tracker.md` to reflect all completed phases

---

## Backend Readiness Map

This table shows which backend endpoints each frontend phase depends on. Do not start a frontend phase until the corresponding backend endpoints are available.

| Frontend Phase | Required Backend Endpoints | Backend Phase |
|---|---|---|
| Phase 1 — Foundation | None | — |
| Phase 2 — Browse | `GET /api/taxis`, `GET /api/routes`, `GET /api/routes/:id`, `GET /api/tours`, `GET /api/tours/:id`, `GET /api/auth/me`, `POST /api/users` | Backend Phase 2 |
| Phase 3 — Booking & Payment | `POST /api/bookings`, `GET /api/bookings/my`, `GET /api/bookings/:id`, `PUT /api/bookings/:id/cancel`, `POST /api/payments/:booking_id/upload-proof`, `GET /api/payments/:booking_id` | Backend Phases 2 + 5 |
| Phase 4 — Driver | `GET|PUT /api/driver/profile`, `PUT /api/driver/availability`, `GET /api/driver/bookings`, `PUT /api/driver/bookings/:id/accept|reject|arrived|start|complete`, `GET /api/driver/earnings`, `GET /api/driver/reviews`, `POST /api/driver/telegram/generate-code` | Backend Phase 3 |
| Phase 5 — Reviews/Complaints/Notifications | `POST /api/reviews`, `POST /api/complaints`, `GET /api/complaints/my`, `GET /api/notifications`, `PUT /api/notifications/:id/read`, `PUT /api/notifications/read-all`, `GET /api/assistance` | Backend Phase 5 |
| Phase 6 — Polish | None | — |

---

## Legend

| Symbol | Meaning |
|---|---|
| 🔴 | Not started |
| 🟡 | In progress |
| 🟢 | Complete |
