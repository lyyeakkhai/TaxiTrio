# Reviews & Complaints — Design

## Data Models

Table: `reviews`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| booking_id | UUID FK → bookings | UNIQUE |
| customer_id | UUID FK → users | |
| driver_id | UUID FK → drivers | |
| rating | INT | 1–5 |
| message | TEXT | nullable |
| created_at | TIMESTAMP | |

Table: `complaints`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| booking_id | UUID FK → bookings | |
| customer_id | UUID FK → users | |
| category | ENUM | driver_behavior, vehicle_condition, pricing, service_quality, other |
| description | TEXT | |
| status | ENUM | open, replied, resolved |
| admin_reply | TEXT | nullable |
| replied_at | TIMESTAMP | nullable |
| created_at | TIMESTAMP | |

## Side Effects

- New review → recalculate `drivers.rating` as AVG
- Admin replies to complaint → status = `replied`, notification sent to customer: `complaint_replied`
