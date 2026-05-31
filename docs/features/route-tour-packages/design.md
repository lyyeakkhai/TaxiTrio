# Route & Tour Packages — Design

## Data Models

Table: `route_packages`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR(150) | e.g. Phnom Penh → Siem Reap |
| origin | VARCHAR(100) | |
| destination | VARCHAR(100) | |
| duration_hours | DECIMAL(4,1) | |
| price | DECIMAL(10,2) | |
| included_services | TEXT | |
| recommended_vehicle | VARCHAR(50) | |
| image | VARCHAR(500) | Cloudinary secure_url |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMP | |

Table: `tour_packages`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR(150) | |
| description | TEXT | |
| duration_hours | DECIMAL(4,1) | |
| location | VARCHAR(100) | |
| included_services | TEXT | |
| vehicle_type | VARCHAR(50) | |
| price | DECIMAL(10,2) | |
| image | VARCHAR(500) | Cloudinary secure_url |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMP | |

## Backend Implementation

Modules: `src/modules/routes/` and `src/modules/tours/`

| Layer | File | Responsibility |
|---|---|---|
| Use Case | `use-cases/list-routes.usecase.ts` | Returns active route packages |
| Use Case | `use-cases/get-route.usecase.ts` | Returns single route package |
| Use Case | `use-cases/create-route.usecase.ts` | Admin: creates route, image → Cloudinary |
| Use Case | `use-cases/update-route.usecase.ts` | Admin: updates route |
| Use Case | `use-cases/toggle-route.usecase.ts` | Admin: sets `is_active` |
| Use Case | `use-cases/delete-route.usecase.ts` | Admin: hard delete if no bookings, else 409 |
| Controller | `route.controller.ts` | HTTP methods |
| Routes | `route.routes.ts` | Public + admin route endpoints |

Same pattern applies to `tours/` module for `tour_packages`.

`PATCH /toggle` sets `is_active = false`. Hard `DELETE` only if no bookings reference the record.
