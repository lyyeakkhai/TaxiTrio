# Phase 4 — Admin Features: Requirements

## Scope

Full admin control plane for TaxiTrio. All endpoints require `verifyClerkToken` + `requireRole('admin')`.

---

## 4.1 Users & Drivers

**Endpoints**
- `GET /api/admin/users` — list all users (paginated, filter by role)
- `GET /api/admin/users/:id` — user detail
- `GET /api/admin/drivers` — list all drivers (filter: `verification_status`, `is_available`)
- `GET /api/admin/drivers/:id` — driver detail
- `PUT /api/admin/drivers/:id` — update driver record (name, phone, languages, taxi_id)
- `DELETE /api/admin/drivers/:id` — delete driver; blocked if active bookings exist
- `PUT /api/admin/drivers/:id/approve` — set `verification_status = approved`
- `PUT /api/admin/drivers/:id/reject` — set `verification_status = rejected`

**Business rules**
- Delete blocked if driver has bookings with status not in `[completed, cancelled, rejected]`
- Approve/reject only valid from `pending` status (return 400 otherwise)

---

## 4.2 Taxis CRUD

**Endpoints**
- `POST /api/admin/taxis` — create taxi (photo → Cloudinary)
- `PUT /api/admin/taxis/:id` — update taxi (optional photo re-upload)
- `DELETE /api/admin/taxis/:id` — soft delete (`is_active = false`) if bookings exist; hard delete otherwise
- `PATCH /api/admin/taxis/:id/toggle` — toggle `is_active`

**Business rules**
- `plate_number` must be unique
- Photo via `multipart/form-data` → Cloudinary `secure_url` stored in DB

---

## 4.3 Routes & Tours CRUD

**Endpoints (same pattern for both)**
- `POST /api/admin/routes` / `POST /api/admin/tours`
- `PUT /api/admin/routes/:id` / `PUT /api/admin/tours/:id`
- `DELETE /api/admin/routes/:id` / `DELETE /api/admin/tours/:id`
- `PATCH /api/admin/routes/:id/toggle` / `PATCH /api/admin/tours/:id/toggle`

**Business rules**
- Delete blocked if active bookings reference the package; soft-delete otherwise
- Images → Cloudinary

---

## 4.4 Bookings + Driver Assignment

**Endpoints**
- `GET /api/admin/bookings` — all bookings (filter: `status`, `driver_id`, `date`)
- `GET /api/admin/bookings/:id` — detail with status history and payment
- `PUT /api/admin/bookings/:id/assign` — assign driver; transitions `pending → assigned`; calls `notifyDriver()`
- `PUT /api/admin/bookings/:id/cancel` — cancel any booking (any non-terminal status)

**Business rules**
- Assign: driver must be `approved` and `is_available = true`
- Assign triggers Telegram notification via `bot/notify.ts`
- Assign creates a `driver_assigned` notification record
- Cancel uses the shared `transition-booking` use case

---

## 4.5 Payments

**Payment model**
- Bookings with `payment_method = cash` have no payment record — admin has no action
- Bookings with online methods (card, wallet, aba, khqr, wing, corporate) use Clerk Billing (Stripe-backed)
- Payment status is updated via Clerk billing webhooks — admin views only, no manual verify/reject

**Endpoints**
- `GET /api/admin/payments` — list all payments (filter: `status`, `booking_id`)
- `GET /api/admin/payments/:id` — payment detail

**Decision recorded:** No manual verify/reject endpoints. Webhook handles all status transitions. Admin role is read-only for payments.

---

## 4.6 Complaints & Assistance

**Complaints**
- `GET /api/admin/complaints` — all complaints (filter: `status`)
- `GET /api/admin/complaints/:id` — complaint detail
- `PUT /api/admin/complaints/:id/reply` — set `admin_reply`, status → `replied`; create `complaint_replied` notification
- `PUT /api/admin/complaints/:id/resolve` — status → `resolved`

**Assistance CRUD**
- `POST /api/admin/assistance`
- `PUT /api/admin/assistance/:id`
- `DELETE /api/admin/assistance/:id`
- `PATCH /api/admin/assistance/:id/toggle` — toggle `is_active`

---

## 4.7 Dashboard Stats

**Endpoint**
- `GET /api/admin/dashboard`

**Response shape**
```json
{
  "total_revenue": 0,
  "completed_trips": 0,
  "pending_bookings": 0,
  "open_complaints": 0,
  "pending_drivers": 0
}
```

---

## Constraints

- All admin routes: `verifyClerkToken` + `requireRole('admin')`
- No business logic in controllers — use cases only
- Zod validation on all request bodies
- Images via Cloudinary — never local
- Errors thrown with `statusCode` property; caught by `middleware/error.ts`
- Tests: vitest + supertest for all use cases
