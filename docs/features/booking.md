# Feature: Booking

> Roles: Customer (create + track) · Driver (manage trip) · Admin (full view + assign + cancel)

---

## Overview

One `bookings` table handles all three booking types: `taxi`, `route`, `tour`. Status transitions are enforced server-side. Admin has full read access and can assign drivers or cancel any booking.

---

## Status Flow

```
PENDING → ASSIGNED → ACCEPTED → DRIVER_ARRIVED → IN_PROGRESS → COMPLETED
       ↘ CANCELLED              ↘ REJECTED
```

---

## Frontend

**User app:** `app/(customer)/bookings/new/page.tsx`, `app/(customer)/bookings/[id]/page.tsx`, `app/(customer)/bookings/page.tsx`
**User app (driver):** `app/(driver)/trips/page.tsx`, `app/(driver)/trips/[id]/page.tsx`
**Admin dashboard:** `app/bookings/page.tsx`, `app/bookings/[id]/page.tsx`

---

## Backend

**Route file:** `routes/bookings.ts`, `routes/driver.ts`, `routes/admin.ts`
**Controller:** `controllers/bookingController.ts`

### Customer Endpoints (role: customer)

| Method | Path | Description |
|---|---|---|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/my` | My booking history |
| GET | `/api/bookings/:id` | Booking detail + status history |
| PUT | `/api/bookings/:id/cancel` | Cancel pending booking |

```json
// POST /api/bookings
{
  "booking_type": "route | tour | taxi",
  "route_package_id": "uuid | null",
  "tour_package_id": "uuid | null",
  "taxi_id": "uuid | null",
  "travel_date": "2026-06-12",
  "travel_time": "08:00",
  "passenger_count": 2,
  "payment_method": "cash | aba | khqr | wing | card | wallet | corporate",
  "special_notes": "string | null"
}
// Response 201
{ "booking": { "id", "status": "pending", "created_at" } }
```

### Driver Endpoints (role: driver)

| Method | Path | Description |
|---|---|---|
| GET | `/api/driver/bookings` | Assigned bookings |
| PUT | `/api/driver/bookings/:id/accept` | ASSIGNED → ACCEPTED |
| PUT | `/api/driver/bookings/:id/reject` | ASSIGNED → REJECTED |
| PUT | `/api/driver/bookings/:id/arrived` | ACCEPTED → DRIVER_ARRIVED |
| PUT | `/api/driver/bookings/:id/start` | DRIVER_ARRIVED → IN_PROGRESS |
| PUT | `/api/driver/bookings/:id/complete` | IN_PROGRESS → COMPLETED |

### Admin Endpoints (role: admin)

| Method | Path | Description |
|---|---|---|
| GET | `/api/admin/bookings` | All bookings (filter by status, date, driver) |
| GET | `/api/admin/bookings/:id` | Booking detail + status history + payment |
| PUT | `/api/admin/bookings/:id/assign` | Assign driver → PENDING to ASSIGNED + Telegram notify |
| PUT | `/api/admin/bookings/:id/cancel` | Cancel any booking |

```json
// PUT /api/admin/bookings/:id/assign
{ "driver_id": "uuid" }
```

---

## Database

Tables: `bookings`, `booking_status_history`

Every status change writes a row to `booking_status_history` with `changed_by` (user id) and timestamp.
