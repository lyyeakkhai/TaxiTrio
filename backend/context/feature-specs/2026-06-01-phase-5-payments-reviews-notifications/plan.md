# Phase 5 — Implementation Plan

## Group 1 — Payments Module

### 1.1 Customer payment view
- `src/modules/payments/payment.schema.ts` — no input schema needed (param only)
- `src/modules/payments/use-cases/get-payment.usecase.ts` — fetch by `booking_id`, assert `booking.customer_id === req.user.id`
- `src/modules/payments/payment.controller.ts` — `getPayment`
- `src/modules/payments/payment.routes.ts` — `GET /api/payments/:booking_id` (auth: customer)
- `src/modules/payments/use-cases/index.ts`, `src/modules/payments/index.ts`

### 1.2 Admin payment endpoints
- `src/modules/payments/use-cases/list-payments.usecase.ts` — filter by `status`, `date`
- `src/modules/payments/use-cases/get-payment-admin.usecase.ts` — fetch any payment by id
- Add `listPayments`, `getPaymentAdmin` to controller and admin routes

### 1.3 Clerk billing webhook
- `src/modules/webhooks/webhook.routes.ts` — `POST /api/webhooks/clerk/billing`
  - Verify Svix signature with `CLERK_WEBHOOK_SECRET`
  - Handle `payment.succeeded` → update payment status to `paid`, create `payment_verified` notification, send receipt email (fire-and-forget)
  - Handle `payment.failed` → update status to `failed`
  - Handle `refund.created` → update status to `refunded`
- Register router in `src/app.ts`

---

## Group 2 — Reviews Module

### 2.1 Customer submit review
- `src/modules/reviews/review.schema.ts` — `CreateReviewSchema` (`booking_id`, `rating` 1–5, `message?`)
- `src/modules/reviews/use-cases/create-review.usecase.ts`
  - Assert booking status is `completed`
  - Assert `booking.customer_id === req.user.id`
  - Create review (Prisma unique constraint handles duplicate)
  - Recalculate `drivers.rating` via `AVG` aggregate query
- `src/modules/reviews/review.controller.ts` — `create`
- `src/modules/reviews/review.routes.ts` — `POST /api/reviews` (auth: customer)

### 2.2 Driver view own reviews
- `src/modules/reviews/use-cases/list-driver-reviews.usecase.ts` — filter by `driver_id` from `req.user`
- Add `listDriverReviews` to controller; add `GET /api/driver/reviews` route (auth: driver)

### 2.3 Admin review endpoints
- `src/modules/reviews/use-cases/list-reviews.usecase.ts` — all reviews
- `src/modules/reviews/use-cases/delete-review.usecase.ts`
- Add to controller + admin routes: `GET /api/admin/reviews`, `DELETE /api/admin/reviews/:id`
- `src/modules/reviews/use-cases/index.ts`, `src/modules/reviews/index.ts`

---

## Group 3 — Complaints Module

### 3.1 Customer endpoints
- `src/modules/complaints/complaint.schema.ts` — `CreateComplaintSchema` (`booking_id`, `category`, `description`)
- `src/modules/complaints/use-cases/create-complaint.usecase.ts`
- `src/modules/complaints/use-cases/list-my-complaints.usecase.ts` — filter by `customer_id`
- `src/modules/complaints/complaint.controller.ts` — `create`, `listMy`
- `src/modules/complaints/complaint.routes.ts` — `POST /api/complaints`, `GET /api/complaints/my` (auth: customer)

### 3.2 Admin endpoints
- `src/modules/complaints/use-cases/list-complaints.usecase.ts` — filter by `status`, `category`
- `src/modules/complaints/use-cases/get-complaint.usecase.ts`
- `src/modules/complaints/use-cases/reply-complaint.usecase.ts` — set `admin_reply`, `replied_at`, status → `replied`; create `complaint_replied` notification for customer
- `src/modules/complaints/use-cases/resolve-complaint.usecase.ts` — status → `resolved`
- `src/modules/complaints/use-cases/delete-complaint.usecase.ts`
- Add to controller + admin routes: `GET /api/admin/complaints`, `GET /api/admin/complaints/:id`, `PUT /api/admin/complaints/:id/reply`, `PUT /api/admin/complaints/:id/resolve`, `DELETE /api/admin/complaints/:id`
- `src/modules/complaints/use-cases/index.ts`, `src/modules/complaints/index.ts`

---

## Group 4 — Notifications Module

### 4.1 Notification endpoints
- `src/modules/notifications/use-cases/list-notifications.usecase.ts` — filter by `user_id`, optional `is_read`
- `src/modules/notifications/use-cases/mark-read.usecase.ts` — assert ownership, set `is_read = true`
- `src/modules/notifications/use-cases/mark-all-read.usecase.ts` — bulk update by `user_id`
- `src/modules/notifications/notification.controller.ts` — `list`, `markRead`, `markAllRead`
- `src/modules/notifications/notification.routes.ts` — `GET /api/notifications`, `PUT /api/notifications/:id/read`, `PUT /api/notifications/read-all` (auth: any role)
- `src/modules/notifications/use-cases/index.ts`, `src/modules/notifications/index.ts`

### 4.2 Wire notifications into existing use cases
- `src/modules/bookings/use-cases/create-booking.usecase.ts` — add `booking_created` notification
- `src/modules/bookings/use-cases/accept-booking.usecase.ts` — add `booking_accepted` notification
- `src/modules/bookings/use-cases/complete-booking.usecase.ts` — add `trip_completed` notification
- `src/modules/admin/use-cases/assign-booking.usecase.ts` — add `driver_assigned` (customer) + `new_booking_assigned` (driver) notifications

---

## Group 5 — Email (Resend)

### 5.1 Resend client
- `src/lib/resend.ts` — Resend singleton using `RESEND_API_KEY`

### 5.2 Email templates
- `src/lib/email-templates/booking-confirmation.ts` — `sendBookingConfirmation(to, booking)` fire-and-forget
- `src/lib/email-templates/payment-receipt.ts` — `sendPaymentReceipt(to, payment)` fire-and-forget

### 5.3 Wire email
- `create-booking.usecase.ts` — call `sendBookingConfirmation()` after booking created
- Webhook handler on `payment.succeeded` — call `sendPaymentReceipt()` after status update

---

## Register all new routers in app.ts

Add to `src/app.ts`:
- `payments` router at `/api`
- `reviews` router at `/api`
- `complaints` router at `/api`
- `notifications` router at `/api`
- `webhooks` router at `/api`
