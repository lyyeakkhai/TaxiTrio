# Feature: Taxi Management

> Roles: Customer (browse) · Admin (full CRUD)

---

## Overview

Admin manages the fleet of taxis. Each taxi is linked to a driver. Customers browse available taxis before booking. Admin can create, update, deactivate, or delete taxis.

---

## Frontend

**User app:** `app/(customer)/taxis/page.tsx`, `app/(customer)/taxis/[id]/page.tsx`
**Admin dashboard:** `app/taxis/page.tsx`, `app/taxis/new/page.tsx`, `app/taxis/[id]/page.tsx`

---

## Backend

**Route file:** `routes/taxis.ts`, `routes/admin.ts`
**Controller:** `controllers/taxiController.ts`

### Public Endpoints (no auth)

| Method | Path | Description |
|---|---|---|
| GET | `/api/taxis` | List available taxis with assigned driver info |
| GET | `/api/taxis/:id` | Taxi detail + driver profile |

### Admin Endpoints (role: admin)

| Method | Path | Description |
|---|---|---|
| GET | `/api/admin/taxis` | List all taxis (including inactive) |
| GET | `/api/admin/taxis/:id` | Taxi detail |
| POST | `/api/admin/taxis` | Create taxi |
| PUT | `/api/admin/taxis/:id` | Update taxi |
| PATCH | `/api/admin/taxis/:id/toggle` | Toggle is_active |
| DELETE | `/api/admin/taxis/:id` | Delete taxi |

```json
// POST /api/admin/taxis
{
  "model": "Toyota Camry",
  "plate_number": "PP-1234",
  "type": "Sedan | SUV | Van | Minibus",
  "passenger_capacity": 4,
  "luggage_capacity": 3,
  "comfort_category": "Standard | Premium | VIP",
  "photo": "file upload → Cloudinary",
  "driver_id": "uuid | null"
}
```

---

## Database

Table: `taxis`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| model | VARCHAR(100) | |
| plate_number | VARCHAR(20) UNIQUE | |
| type | VARCHAR(50) | Sedan, SUV, Van, Minibus |
| passenger_capacity | INT | |
| luggage_capacity | INT | |
| comfort_category | VARCHAR(50) | Standard, Premium, VIP |
| photo | VARCHAR(500) | Cloudinary secure_url |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMP | |

Driver is linked via `drivers.taxi_id` (driver owns the taxi assignment, not the other way).
