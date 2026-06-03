# Phase 4: Driver Features - Implementation Plan

## 1. Driver Profile & Layout (`features/auth/`)
- **Types & Hooks**: Extend `User` type with `Driver` fields. Hook `useDriverProfile()`, `useUpdateDriverProfile()`, and `useToggleAvailability()`.
- **Components**: `DriverLayout` with a single-column layout (Dashboard, Trips, Earnings, Reviews, Telegram).
- **Pages**: `app/[locale]/driver/dashboard/page.tsx` — Shows availability toggle and profile summary.

## 2. Driver Trips (`features/driver-trips/`)
- **Types & Hooks**: `useDriverBookings()`, plus mutations for `acceptBooking`, `rejectBooking`, `markArrived`, `startTrip`, `completeTrip`.
- **Components**: 
  - `TripCard.tsx`: Summary of the trip for list view.
  - `TripActions.tsx`: Context-aware buttons that trigger the correct mutation based on the booking's current status.
- **Pages**: 
  - `app/[locale]/driver/trips/page.tsx`: List of active/assigned trips.
  - `app/[locale]/driver/trips/[id]/page.tsx`: Full trip details + `TripActions`.

## 3. Driver Earnings (`features/driver-earnings/`)
- **Types & Hooks**: `Earning` type, `useEarnings()` hook.
- **Components**: `EarningsSummary.tsx`, `EarningsTable.tsx`.
- **Page**: `app/[locale]/driver/earnings/page.tsx`.

## 4. Driver Reviews (`features/reviews/`)
- **Types & Hooks**: `Review` type, `useDriverReviews()` hook.
- **Components**: `ReviewCard.tsx` showing the 1-5 star rating and comment.
- **Page**: `app/[locale]/driver/reviews/page.tsx`.

## 5. Telegram Link (`features/telegram-link/`)
- **Types & Hooks**: `TelegramLinkCode` type, `useTelegramCode()` mutation.
- **Components**: `TelegramLinkFlow.tsx` displaying the generated 6-digit code and a countdown timer.
- **Page**: `app/[locale]/driver/telegram-link/page.tsx`.
