# Taxis — Design

## Data Model

Table: `taxis`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| model | VARCHAR(100) | e.g. Toyota Camry |
| plate_number | VARCHAR(20) UNIQUE | |
| type | VARCHAR(50) | Sedan, SUV, Van, Minibus |
| passenger_capacity | INT | |
| luggage_capacity | INT | |
| comfort_category | VARCHAR(50) | Standard, Premium, VIP |
| photo | VARCHAR(500) | Cloudinary secure_url |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMP | |

Driver is linked via `drivers.taxi_id` (driver record holds the FK, not taxis).

## Public List Response

Includes joined driver info: name, rating, languages, verification_status, is_available.

## Backend Implementation

Module: `src/modules/taxis/`

| Layer | File | Responsibility |
|---|---|---|
| Use Case | `use-cases/list-taxis.usecase.ts` | Returns active taxis with joined driver info |
| Use Case | `use-cases/create-taxi.usecase.ts` | Admin: creates taxi, photo → Cloudinary |
| Use Case | `use-cases/update-taxi.usecase.ts` | Admin: updates taxi |
| Use Case | `use-cases/delete-taxi.usecase.ts` | Admin: sets `is_active = false`; hard delete if no bookings |
| Controller | `taxi.controller.ts` | HTTP methods |
| Routes | `taxi.routes.ts` | Public + admin taxi endpoints |

`DELETE /api/admin/taxis/:id` sets `is_active = false`.
Hard delete only if no bookings reference this taxi.
