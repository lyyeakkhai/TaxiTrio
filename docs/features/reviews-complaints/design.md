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

## Backend Implementation

Modules: `src/modules/reviews/` and `src/modules/complaints/`

| Layer | File | Responsibility |
|---|---|---|
| Use Case | `use-cases/create-review.usecase.ts` | Creates review (booking must be `completed`); recalculates `drivers.rating` |
| Use Case | `use-cases/create-complaint.usecase.ts` | Creates complaint |
| Use Case | `use-cases/list-my-complaints.usecase.ts` | Returns complaints for `req.user.id` |
| Use Case | `use-cases/reply-complaint.usecase.ts` | Admin: sets `admin_reply`, status → `replied`, creates `complaint_replied` notification |
| Controller | `review.controller.ts` / `complaint.controller.ts` | HTTP methods |
| Routes | `review.routes.ts` / `complaint.routes.ts` | Endpoints |

- New review → recalculate `drivers.rating` as AVG
- Admin replies to complaint → status = `replied`, notification sent to customer: `complaint_replied`
