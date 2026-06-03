# Phase 3: Booking & Payment Features Requirements

## Scope
- **Booking Creation**: A unified booking form allowing customers to book a taxi, intercity route package, or tour package based on URL query parameters (`?type=` & `?id=`).
- **Booking Management**: Customers can view a list of all their bookings and click into a detailed view to see the full `BookingStatusTimeline`.
- **Booking Cancellation**: Customers can cancel a booking **only if** its status is `pending`.
- **Payment Proof Upload**: Customers can upload an image (receipt/screenshot) as proof of payment to a Cloudinary-backed endpoint.
- **Payment Status Tracking**: Customers can check the status of their payment (`unpaid` → `pending_verification` → `verified` / `rejected`).

## Data Models & Business Rules

### Bookings
- **Data Fields**: `id`, `booking_type` (taxi, route, tour), `travel_date`, `travel_time`, `passenger_count`, `payment_method`, `special_notes`, `status`.
- **Foreign Keys**: `customer_id`, `taxi_id`, `route_package_id`, `tour_package_id`, `driver_id` (assigned later by admin).
- **Status Machine**: `pending` → `assigned` → `accepted` → `driver_arrived` → `in_progress` → `completed`. (Branches: `pending` → `cancelled`, `assigned` → `rejected`).
- **Transitions**: State machine logic is handled strictly by the backend (`POST /api/bookings`, `PUT /api/bookings/:id/cancel`).

### Payments
- **Data Fields**: `id`, `booking_id`, `amount`, `fee`, `net_amount`, `method`, `status`.
- **Integration**: Uses Bakong KHQR via a pre-built SDK package and integration server.
- **Implementation Strategy**: The frontend will leave a placeholder for the pre-built component and make API calls to initialize/check the payment. The user will plug in the actual SDK implementation later.

## Decisions & Constraints
- **Routing**: Customer views under `app/[locale]/customer/bookings/...` and `app/[locale]/customer/payments/...`.
- **State Management**: `TanStack Query` for data fetching (`useMyBookings`, `useBooking(id)`, `usePayment(bookingId)`).
- **Mutations**: Server actions or React Query mutations for creating bookings, cancelling bookings, and uploading payment proofs.
- **Validation**: Strict form validation using `react-hook-form` and `Zod`.
- **File Upload**: Native `<input type="file" accept="image/*" />` for payment proof uploads.

## Context
These features correspond to Phase 3 of `context/roadmap.md` and satisfy the core transactional flows defined in `docs/features/booking/` and `docs/features/payment/`.
