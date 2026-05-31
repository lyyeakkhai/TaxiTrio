# Feature: Route & Tour Packages

> Roles: Customer (browse + book) · Admin (create / update / delete)

---

## Overview

Admin creates fixed-price route packages (intercity travel) and tour packages. Customers browse and book them. Prices are set by admin — no negotiation.

---

## Frontend

**Customer pages:** `pages/customer/Routes.tsx`, `pages/customer/RouteDetail.tsx`, `pages/customer/Tours.tsx`, `pages/customer/TourDetail.tsx`  
**Admin pages:** `pages/admin/Routes.tsx`, `pages/admin/Tours.tsx`

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

### Admin Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/admin/routes` | Create route |
| PUT | `/api/admin/routes/:id` | Update route |
| DELETE | `/api/admin/routes/:id` | Delete route |
| POST | `/api/admin/tours` | Create tour |
| PUT | `/api/admin/tours/:id` | Update tour |
| DELETE | `/api/admin/tours/:id` | Delete tour |

### POST /api/admin/routes

```json
{
  "name": "Phnom Penh → Siem Reap",
  "origin": "Phnom Penh",
  "destination": "Siem Reap",
  "duration_hours": 6,
  "price": 45.00,
  "included_services": "string",
  "recommended_vehicle": "SUV",
  "image": "file upload"
}
```

### POST /api/admin/tours

```json
{
  "name": "Angkor Sunrise Tour",
  "description": "string",
  "duration_hours": 8,
  "location": "Siem Reap",
  "included_services": "string",
  "vehicle_type": "SUV",
  "price": 80.00,
  "image": "file upload"
}
```

---

## Database

Tables used: `route_packages`, `tour_packages`

Both have `is_active` flag — soft delete, admin can deactivate without removing history.
