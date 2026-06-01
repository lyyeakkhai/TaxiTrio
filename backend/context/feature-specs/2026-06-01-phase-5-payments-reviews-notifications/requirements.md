# Phase 5 — Payments, Reviews, Notifications: Requirements

## Scope

Four feature groups, all in `src/modules/`:

| Group | Modules touched |
|---|---|
| 5.1 Payments | `payments/` + `webhooks/` |
| 5.2 Reviews | `reviews/` |
| 5.3 Complaints | `complaints/` |
| 5.4 Notifications + Email | `notifications/` + `src/lib/resend.ts` + email templates |

Production hardening (Sentry, Dockerfile, CI) is out of scope for this spec.

---

## 5.1 Payments

### Roles & Access
- Customer: `GET /api/payments/:booking_id` — own payment only (enforce `payment.booking.customer_id === req.user.id`)
- Admin: `GET /api/admin/payments` (filter by `status`, `date`), `GET /api/admin/payments/:id`
- Public (no auth): `POST /api/webhooks/clerk/billing`

### Business Rules
- Payment record is created at booking creation time (already handled in Phase 2 `create-booking.usecase.ts`)
- Status is updated exclusively via Clerk billing webhooks — no manual status mutation endpoint
- Webhook events to handle: `payment.succeeded → paid`, `payment.failed → failed`, `refund.created → refunded`
- On `payment.succeeded`: create `payment_verified` in-system notification for customer + send Resend receipt email (fire-and-forget)
- Webhook handler must verify the Svix signature using `CLERK_WEBHOOK_SECRET` env var

### Decisions
- No `upload-proof` endpoint — payment is Clerk Billing (Stripe-backed), not manual proof upload
- Webhook handler lives in `src/modules/webhooks/webhook.routes.ts` (separate from payments module)

---

## 5.2 Reviews

### Roles & Access
- Customer: `POST /api/reviews` — submit review for a completed booking
- Driver: `GET /api/driver/reviews` — own reviews only
- Admin: `GET /api/admin/reviews`, `DELETE /api/admin/reviews/:id`

### Business Rules
- Booking must have status `completed` — throw `400` otherwise
- One review per booking (UNIQUE constraint on `booking_id`) — throw `409` on duplicate
- After creating a review, recalculate `drivers.rating` as `AVG(reviews.rating)` for that driver
- `driver_id` is derived from the booking's assigned driver — not passed in the request body

---

## 5.3 Complaints

### Roles & Access
- Customer: `POST /api/complaints`, `GET /api/complaints/my`
- Admin: `GET /api/admin/complaints` (filter by `status`, `category`), `GET /api/admin/complaints/:id`, `PUT /api/admin/complaints/:id/reply`, `PUT /api/admin/complaints/:id/resolve`, `DELETE /api/admin/complaints/:id`

### Business Rules
- Complaint status machine: `open → replied → resolved`
- `reply` sets `admin_reply`, `replied_at`, status → `replied`; creates `complaint_replied` in-system notification for customer
- `resolve` sets status → `resolved` (no notification)
- Category enum: `driver_behavior | vehicle_condition | pricing | service_quality | other`

---

## 5.4 Notifications

### Roles & Access
- Any authenticated user: `GET /api/notifications` (own only, optional `?is_read=` filter), `PUT /api/notifications/:id/read`, `PUT /api/notifications/read-all`

### Business Rules
- No admin-facing notification endpoints
- Notifications are created inline (direct `prisma.notification.create()`) inside the use case that triggers the event — no shared helper
- Notification types and their trigger points:

| Type | Triggered in |
|---|---|
| `booking_created` | `create-booking.usecase.ts` (Phase 2) |
| `driver_assigned` | `assign-booking.usecase.ts` (Phase 4) |
| `booking_accepted` | `accept-booking.usecase.ts` (Phase 3) |
| `payment_verified` | `webhook.routes.ts` on `payment.succeeded` |
| `trip_completed` | `complete-booking.usecase.ts` (Phase 3) |
| `complaint_replied` | `reply-complaint.usecase.ts` (Phase 5) |
| `new_booking_assigned` | `assign-booking.usecase.ts` (Phase 4, driver recipient) |

- Phase 2/3/4 use cases that already exist will need notification calls wired in as part of this phase

### Email (Resend)
- `src/lib/resend.ts` — Resend client singleton using `RESEND_API_KEY` env var
- `src/lib/email-templates/booking-confirmation.ts` — plain function returning `{ subject, html }`
- `src/lib/email-templates/payment-receipt.ts` — same shape
- Wire into `create-booking.usecase.ts`: fire-and-forget `sendBookingConfirmation()`
- Wire into webhook handler on `payment.succeeded`: fire-and-forget `sendPaymentReceipt()`
- Email failures must not throw — wrap in `.catch(logger.error)`

---

## Constraints (from mission.md / code-standards.md)

- All request bodies validated with Zod before reaching controller
- Protected routes: `verifyClerkToken` + `requireRole`
- No `req`/`res` in use cases
- Errors thrown with `statusCode` property
- Barrel exports from every directory
- No `console.log` — use Pino logger
