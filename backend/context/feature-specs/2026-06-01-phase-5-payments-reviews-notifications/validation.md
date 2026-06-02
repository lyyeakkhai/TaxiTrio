# Phase 5 — Validation Criteria

## How to know this implementation is complete and ready to merge

---

## 5.1 Payments

- [ ] `GET /api/payments/:booking_id` returns `200` with payment data for the booking owner
- [ ] `GET /api/payments/:booking_id` returns `403` when a different customer requests it
- [ ] `GET /api/admin/payments` returns all payments; `?status=paid` filters correctly
- [ ] `POST /api/webhooks/clerk/billing` with a valid Svix signature and `payment.succeeded` event updates payment status to `paid`
- [ ] `payment.failed` event sets status to `failed`
- [ ] `refund.created` event sets status to `refunded`
- [ ] Webhook with invalid/missing signature returns `400`
- [ ] `payment.succeeded` creates a `payment_verified` in-system notification for the customer
- [ ] `payment.succeeded` triggers a Resend receipt email (fire-and-forget — email failure does not cause a non-200 response)

---

## 5.2 Reviews

- [ ] `POST /api/reviews` with a completed booking creates a review and returns `201`
- [ ] `POST /api/reviews` with a non-completed booking returns `400`
- [ ] Submitting a second review for the same booking returns `409`
- [ ] After review creation, `drivers.rating` equals the AVG of all reviews for that driver
- [ ] `GET /api/driver/reviews` returns only reviews for the authenticated driver
- [ ] `GET /api/admin/reviews` returns all reviews
- [ ] `DELETE /api/admin/reviews/:id` returns `204` and removes the review

---

## 5.3 Complaints

- [ ] `POST /api/complaints` creates a complaint with status `open` and returns `201`
- [ ] `GET /api/complaints/my` returns only the authenticated customer's complaints
- [ ] `GET /api/admin/complaints?status=open` filters by status
- [ ] `GET /api/admin/complaints?category=pricing` filters by category
- [ ] `PUT /api/admin/complaints/:id/reply` sets `admin_reply`, `replied_at`, status → `replied`
- [ ] Reply creates a `complaint_replied` in-system notification for the customer
- [ ] `PUT /api/admin/complaints/:id/resolve` sets status → `resolved`
- [ ] `DELETE /api/admin/complaints/:id` returns `204`

---

## 5.4 Notifications

- [ ] `GET /api/notifications` returns the authenticated user's notifications
- [ ] `GET /api/notifications?is_read=false` returns only unread notifications
- [ ] `PUT /api/notifications/:id/read` marks a single notification as read
- [ ] `PUT /api/notifications/:id/read` returns `403` when the notification belongs to another user
- [ ] `PUT /api/notifications/read-all` marks all of the user's notifications as read
- [ ] Creating a booking creates a `booking_created` notification for the customer
- [ ] Assigning a booking creates `driver_assigned` (customer) and `new_booking_assigned` (driver) notifications
- [ ] Accepting a booking creates a `booking_accepted` notification for the customer
- [ ] Completing a trip creates a `trip_completed` notification for the customer
- [ ] Replying to a complaint creates a `complaint_replied` notification for the customer

---

## 5.5 Email

- [ ] `src/lib/resend.ts` exports a Resend client singleton
- [ ] `sendBookingConfirmation()` is called after booking creation; email failure does not throw
- [ ] `sendPaymentReceipt()` is called after `payment.succeeded` webhook; email failure does not throw

---

## General

- [ ] All new routes are registered in `src/app.ts`
- [ ] All new modules have barrel `index.ts` exports
- [ ] No `console.log` — Pino logger used throughout
- [ ] All protected routes require `verifyClerkToken` + `requireRole`
- [ ] All request bodies validated with Zod before reaching controller
- [ ] TypeScript compiles with no errors (`npm run build`)
- [ ] Existing test suite still passes (`npm test`)
