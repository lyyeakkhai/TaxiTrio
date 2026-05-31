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

## Soft Delete

`PATCH /toggle` sets `is_active = false`. Hard `DELETE` only if no bookings reference the record.
