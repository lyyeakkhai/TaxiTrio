# Feature: Reviews & Complaints

> Roles: Customer (submit) · Driver (view reviews) · Admin (reply to complaints)

---

## Overview

After a trip is completed, customers can rate the driver. Separately, customers can submit complaints at any time against a booking. Admin replies to complaints.

---

## Frontend

**Customer pages:** `pages/customer/ReviewForm.jsx`, `pages/customer/ComplaintForm.jsx`, `pages/customer/Complaints.jsx`  
**Driver pages:** `pages/driver/Reviews.jsx`  
**Admin pages:** `pages/admin/Complaints.jsx`

---

## Backend

**Route file:** `routes/reviews.js`, `routes/complaints.js`, `routes/admin.js`  
**Controller:** `controllers/reviewController.js`, `controllers/complaintController.js`

### Review Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/reviews` | Customer | Submit review (once per completed booking) |
| GET | `/api/driver/reviews` | Driver | View own reviews |

```json
// POST /api/reviews
{ "booking_id": "uuid", "rating": 5, "message": "string | null" }
```

### Complaint Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/complaints` | Customer | Submit complaint |
| GET | `/api/complaints/my` | Customer | My complaints + admin replies |
| GET | `/api/admin/complaints` | Admin | All complaints |
| PUT | `/api/admin/complaints/:id/reply` | Admin | Reply to complaint |

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

Tables used: `reviews`, `complaints`

- `reviews` has a UNIQUE constraint on `booking_id` — one review per booking.
- `complaints` status: `open` → `replied` → `resolved`.
- Driver `rating` in `drivers` table is recalculated as AVG after each new review.
