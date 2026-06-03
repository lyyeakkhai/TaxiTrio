# Phase 3: Booking & Payment Features Plan

## 1. Booking Creation (`features/booking/`)
- **Types & Schemas**: Define `Booking`, `BookingDetail`, `BookingStatusHistory`, and `CreateBookingSchema` (Zod).
- **Hooks & Actions**: 
  - `createBooking(data)` mutation (calls `POST /api/bookings`).
  - `cancelBooking(id)` mutation (calls `PUT /api/bookings/:id/cancel`).
  - `useMyBookings()` and `useBooking(id)` queries.
- **Components**:
  - `BookingForm.tsx`: Unified form capturing travel date, time, passenger count, payment method, and special notes. Auto-populates `booking_type` and respective ID from URL query parameters.
- **Page**: `app/[locale]/customer/bookings/new/page.tsx` — Renders `BookingForm`.

## 2. Booking Management (`features/booking/`)
- **Components**:
  - `BookingCard.tsx`: Compact summary card for list view showing type, date, status badge.
  - `BookingStatusTimeline.tsx`: Vertical timeline component mapping the booking's `status_history`.
  - `StatusBadge.tsx`: Reusable badge mapped to the project's color coding for booking statuses.
- **Pages**:
  - `app/[locale]/customer/bookings/page.tsx`: Renders the list of bookings using `useMyBookings()`.
  - `app/[locale]/customer/bookings/[id]/page.tsx`: Renders booking details, the status timeline, and a conditionally visible "Cancel Booking" button (if status === 'pending').

## 3. Payment Processing (`features/payment/`)
- **Types & Schemas**: Define `Payment` type and Zod schema.
- **Hooks & Actions**:
  - `usePayment(bookingId)` query to fetch payment status.
  - `initiatePayment(bookingId)` placeholder mutation for the Bakong KHQR API.
- **Components**:
  - `PaymentStatus.tsx`: Displays current status, amount, and method.
  - `BakongPaymentWidget.tsx`: A placeholder component where the pre-built Bakong KHQR SDK will be plugged in later by the user.
- **Page**: `app/[locale]/customer/payments/[bookingId]/page.tsx` — Integrates the status display and the `BakongPaymentWidget` placeholder.
