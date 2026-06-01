# Phase 4 — Admin Features: Validation

## How to know this implementation succeeded and can be merged

---

## Automated Tests

All vitest tests pass:
- `tests/admin-users-drivers.test.ts` — list users, get user, list drivers, get driver, update driver, delete driver (blocked + allowed), approve, reject
- `tests/admin-taxis.test.ts` — create (unique plate, Cloudinary), update, soft delete, hard delete, toggle
- `tests/admin-routes-tours.test.ts` — create/update/delete/toggle for both routes and tours
- `tests/admin-bookings.test.ts` — list with filters, assign (valid + invalid driver), cancel
- `tests/admin-payments.test.ts` — list with filters, get by id
- `tests/admin-complaints-assistance.test.ts` — list complaints, reply, resolve; create/update/delete/toggle assistance
- `tests/admin-dashboard.test.ts` — stats shape matches expected schema

Run: `npm test` — all pass, no skipped tests.

---

## Manual Smoke Checks (Swagger at `/api/docs`)

### Auth guard
- Request any `GET /api/admin/*` without a token → `401`
- Request with a customer token → `403`
- Request with an admin token → `200`

### 4.1 Users & Drivers
- `GET /api/admin/users` returns array of users
- `GET /api/admin/drivers?verification_status=pending` returns only pending drivers
- `PUT /api/admin/drivers/:id/approve` on a pending driver → `200`, `verification_status = approved`
- `PUT /api/admin/drivers/:id/approve` on an already-approved driver → `400`
- `DELETE /api/admin/drivers/:id` with active bookings → `400`

### 4.2 Taxis
- `POST /api/admin/taxis` with duplicate `plate_number` → `409`
- `POST /api/admin/taxis` with photo → Cloudinary URL stored in DB
- `PATCH /api/admin/taxis/:id/toggle` flips `is_active`

### 4.3 Routes & Tours
- `POST /api/admin/routes` creates route; appears in `GET /api/routes` (public)
- `PATCH /api/admin/routes/:id/toggle` with `is_active = false` → route disappears from public list
- Same for tours

### 4.4 Bookings + Assignment
- `GET /api/admin/bookings?status=pending` returns only pending bookings
- `PUT /api/admin/bookings/:id/assign` with unapproved driver → `400`
- `PUT /api/admin/bookings/:id/assign` with valid driver → `200`, booking status = `assigned`, Telegram notification sent (check bot logs)
- `PUT /api/admin/bookings/:id/cancel` on a completed booking → `400`

### 4.5 Payments
- `GET /api/admin/payments` returns all payment records
- No verify/reject endpoints exist (confirmed decision)

### 4.6 Complaints & Assistance
- `PUT /api/admin/complaints/:id/reply` sets `admin_reply`, status → `replied`
- `PUT /api/admin/complaints/:id/resolve` sets status → `resolved`
- `POST /api/admin/assistance` creates item; appears in `GET /api/assistance` (public)
- `PATCH /api/admin/assistance/:id/toggle` hides item from public list

### 4.7 Dashboard
- `GET /api/admin/dashboard` returns `{ total_revenue, completed_trips, pending_bookings, open_complaints, pending_drivers }` — all numeric

---

## Merge Criteria

- [ ] `npm test` passes with no failures
- [ ] TypeScript compiles: `npm run build` exits 0
- [ ] All 7 admin sub-areas have routes registered in `src/app.ts`
- [ ] No `any` types introduced
- [ ] No business logic in controllers
- [ ] Swagger docs updated for all new endpoints
