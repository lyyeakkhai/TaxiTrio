# Feature: Booking

> Roles: Customer (create) · Driver (manage) · Admin (assign, monitor)

---

## Overview

One `bookings` table handles all three booking types: `taxi`, `route`, `tour`. Status transitions are enforced server-side.

---

## Status Flow

```
PENDING → ASSIGNED → ACCEPTED → DRIVER_ARRIVED → IN_PROGRESS → COMPLETED
       ↘ CANCELLED              ↘ REJECTED
```

---

## Frontend

**Customer pages:** `pages/customer/BookingForm.jsx`, `pages/customer/BookingDetail.jsx`, `pages/customer/BookingHistory.jsx`  
**Driver pages:** `pages/driver/TripList.jsx`, `pages/driver/TripDetail.jsx`  
**Admin pages:** `pages/admin/Bookings.jsx`

---

## Backend

**Route file:** `routes/bookings.js`, `routes/driver.js`, `routes/admin.js`  
**Controller:** `controllers/bookingController.js`

### Customer Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/bookings` | Customer | Create booking |
| GET | `/api/bookings/my` | Customer | My booking history |
| GET | `/api/bookings/:id` | Customer | Booking detail + status history |
| PUT | `/api/bookings/:id/cancel` | Customer | Cancel pending booking |

### POST /api/bookings

```json
// Request
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
{ "booking": { "id", "status": "pending", "created_at", ... } }
```

### Driver Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/driver/bookings` | Driver | Assigned bookings |
| PUT | `/api/driver/bookings/:id/accept` | Driver | Accept |
| PUT | `/api/driver/bookings/:id/reject` | Driver | Reject |
| PUT | `/api/driver/bookings/:id/arrived` | Driver | Mark arrived |
| PUT | `/api/driver/bookings/:id/start` | Driver | Start trip |
| PUT | `/api/driver/bookings/:id/complete` | Driver | Complete trip |

### Admin Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/admin/bookings` | Admin | All bookings |
| GET | `/api/admin/bookings/:id` | Admin | Booking detail |
| PUT | `/api/admin/bookings/:id/assign` | Admin | Assign driver |

```json
// PUT /api/admin/bookings/:id/assign
{ "driver_id": "uuid" }
```

---

## Database

Tables used: `bookings`, `booking_status_history`

Every status change writes a row to `booking_status_history` with `changed_by` (user id) and timestamp.
