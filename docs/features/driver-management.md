# Feature: Driver Management

> Roles: Driver (self-manage) · Admin (full CRUD + approve/reject/monitor)

---

## Overview

Drivers register via Clerk, then submit profile details. Admin approves before they can receive bookings. Admin has full CRUD control over driver records.

---

## Driver Verification Flow

```
Driver registers → pending → Admin approves → can receive bookings
                           ↘ Admin rejects  → cannot receive bookings
```

---

## Frontend

**User app:** `app/(driver)/profile/page.tsx`, `app/(driver)/earnings/page.tsx`, `app/(driver)/reviews/page.tsx`
**Admin dashboard:** `app/drivers/page.tsx` (list), `app/drivers/[id]/page.tsx` (detail + actions)

---

## Backend

**Route file:** `routes/driver.ts`, `routes/admin.ts`
**Controller:** `controllers/driverController.ts`

### Driver Endpoints (role: driver)

| Method | Path | Description |
|---|---|---|
| GET | `/api/driver/profile` | View own profile |
| PUT | `/api/driver/profile` | Update name, phone, languages, photo (Cloudinary) |
| PUT | `/api/driver/availability` | Toggle is_available |
| GET | `/api/driver/earnings` | Earnings summary |
| GET | `/api/driver/reviews` | Reviews received |

### Admin Endpoints (role: admin)

| Method | Path | Description |
|---|---|---|
| GET | `/api/admin/drivers` | List all drivers (filter by status, availability) |
| GET | `/api/admin/drivers/:id` | Driver detail + taxi + ratings |
| PUT | `/api/admin/drivers/:id` | Update driver record (name, languages, taxi assignment) |
| PUT | `/api/admin/drivers/:id/approve` | Set verification_status = approved |
| PUT | `/api/admin/drivers/:id/reject` | Set verification_status = rejected |
| DELETE | `/api/admin/drivers/:id` | Delete driver record |

```json
// PUT /api/admin/drivers/:id
{
  "name": "string",
  "phone": "string",
  "languages": ["en", "km"],
  "taxi_id": "uuid | null"
}
```

---

## Database

Tables used: `drivers`, `driver_earnings`

Driver profile shows: verification_status, rating (avg from `reviews`), languages, is_available.
