# Feature: Reviews & Complaints

> Roles: Customer (submit) · Driver (view reviews) · Admin (full CRUD on complaints + reply)

---

## Overview

After a trip completes, customers rate the driver. Customers can also submit complaints at any time. Admin has full read access to all reviews and full management of complaints.

---

## Frontend

**User app:** `app/(customer)/bookings/[id]/review/page.tsx`, `app/(customer)/complaints/page.tsx`, `app/(customer)/complaints/new/page.tsx`
**User app (driver):** `app/(driver)/reviews/page.tsx`
**Admin dashboard:** `app/reviews/page.tsx`, `app/complaints/page.tsx`, `app/complaints/[id]/page.tsx`

---

## Backend

**Route file:** `routes/reviews.ts`, `routes/complaints.ts`, `routes/admin.ts`
**Controller:** `controllers/reviewController.ts`, `controllers/complaintController.ts`

### Review Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/reviews` | Customer | Submit review (once per completed booking) |
| GET | `/api/driver/reviews` | Driver | View own reviews |
| GET | `/api/admin/reviews` | Admin | All reviews |
| DELETE | `/api/admin/reviews/:id` | Admin | Remove inappropriate review |

```json
// POST /api/reviews
{ "booking_id": "uuid", "rating": 5, "message": "string | null" }
```

### Complaint Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/complaints` | Customer | Submit complaint |
| GET | `/api/complaints/my` | Customer | My complaints + admin replies |
| GET | `/api/admin/complaints` | Admin | All complaints (filter by status, category) |
| GET | `/api/admin/complaints/:id` | Admin | Complaint detail |
| PUT | `/api/admin/complaints/:id/reply` | Admin | Reply → status = replied |
| PUT | `/api/admin/complaints/:id/resolve` | Admin | Mark resolved |
| DELETE | `/api/admin/complaints/:id` | Admin | Delete complaint |

```json
// POST /api/complaints
{
  "booking_id": "uuid",
  "category": "driver_behavior | vehicle_condition | pricing | service_quality | other",
  "description": "string"
}

// PUT /api/admin/complaints/:id/reply
{ "admin_reply": "string" }
```

---

## Database

Tables: `reviews`, `complaints`

- `reviews` UNIQUE on `booking_id` — one review per booking.
- `complaints` status: `open` → `replied` → `resolved`.
- Driver `rating` in `drivers` recalculated as AVG after each new review.
