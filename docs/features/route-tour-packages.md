# Feature: Route & Tour Packages

> Roles: Customer (browse + book) · Admin (full CRUD)

---

## Overview

Admin creates and manages fixed-price route packages (intercity travel) and tour packages. Customers browse and book them. Prices are set by admin — no negotiation. Both resources support soft-delete via `is_active`.

---

## Frontend

**User app:** `app/(customer)/routes/page.tsx`, `app/(customer)/routes/[id]/page.tsx`, `app/(customer)/tours/page.tsx`, `app/(customer)/tours/[id]/page.tsx`
**Admin dashboard:** `app/routes/page.tsx`, `app/routes/[id]/page.tsx`, `app/tours/page.tsx`, `app/tours/[id]/page.tsx`

---

## Backend

**Route file:** `routes/packages.ts`, `routes/admin.ts`
**Controller:** `controllers/packageController.ts`

### Public Endpoints (no auth)

| Method | Path | Description |
|---|---|---|
| GET | `/api/routes` | List active route packages |
| GET | `/api/routes/:id` | Route detail |
| GET | `/api/tours` | List active tour packages |
| GET | `/api/tours/:id` | Tour detail |

### Admin Endpoints (role: admin)

| Method | Path | Description |
|---|---|---|
| GET | `/api/admin/routes` | List all routes (including inactive) |
| POST | `/api/admin/routes` | Create route |
| PUT | `/api/admin/routes/:id` | Update route |
| PATCH | `/api/admin/routes/:id/toggle` | Toggle is_active |
| DELETE | `/api/admin/routes/:id` | Delete route |
| GET | `/api/admin/tours` | List all tours (including inactive) |
| POST | `/api/admin/tours` | Create tour |
| PUT | `/api/admin/tours/:id` | Update tour |
| PATCH | `/api/admin/tours/:id/toggle` | Toggle is_active |
| DELETE | `/api/admin/tours/:id` | Delete tour |

```json
// POST /api/admin/routes
{
  "name": "Phnom Penh → Siem Reap",
  "origin": "Phnom Penh",
  "destination": "Siem Reap",
  "duration_hours": 6,
  "price": 45.00,
  "included_services": "string",
  "recommended_vehicle": "SUV",
  "image": "file upload → Cloudinary"
}

// POST /api/admin/tours
{
  "name": "Angkor Sunrise Tour",
  "description": "string",
  "duration_hours": 8,
  "location": "Siem Reap",
  "included_services": "string",
  "vehicle_type": "SUV",
  "price": 80.00,
  "image": "file upload → Cloudinary"
}
```

---

## Database

Tables: `route_packages`, `tour_packages`

Both have `is_active` — soft delete preserves booking history. Admin list returns all; public list returns `is_active = true` only.
