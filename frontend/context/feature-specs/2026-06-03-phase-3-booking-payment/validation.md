# Phase 3: Validation & Success Criteria

## 1. Booking Creation Flow
- **Form Navigation**: Clicking "Book" on a Taxi, Route, or Tour correctly routes to `/bookings/new?type=...&id=...`.
- **Validation**: Form cannot be submitted with missing required fields (Date, Time, Passenger Count, Payment Method). Zod validation errors display correctly.
- **Submission**: Successfully creating a booking redirects the customer to the newly created Booking Detail page or Payment page.

## 2. Booking Tracking & Management
- **List View**: The `/bookings` page correctly lists all bookings created by the customer, ordered chronologically.
- **Detail View**: The `/bookings/[id]` page successfully loads.
- **Timeline**: `BookingStatusTimeline` accurately reflects the history of status transitions.
- **Cancellation**: The "Cancel" button is ONLY visible and clickable when the booking status is `pending`. Triggering it updates the status to `cancelled`.

## 3. Payment Flow
- **Access**: The Payment page (`/payments/[bookingId]`) correctly fetches the payment record tied to the booking.
- **Placeholder**: The `BakongPaymentWidget` displays a clear placeholder area ready for the user to inject the SDK.
- **API Calls**: The `initiatePayment` API hook is defined and called appropriately, leaving the actual transaction handling to the SDK.

## 4. UI/UX Quality
- Adheres to the dark-first theme (using `ui-ux-pro-max` guidelines and `ui-context.md`).
- Skeletons display properly during data fetching.
- Forms use accessible `shadcn/ui` inputs with proper labels and error states.
