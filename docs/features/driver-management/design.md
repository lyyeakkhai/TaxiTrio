# Driver Management — Design

## Data Model

Table: `drivers`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| user_id | UUID FK → users | |
| taxi_id | UUID FK → taxis | nullable |
| license_number | VARCHAR(50) | |
| languages | TEXT[] | e.g. ['en','km','zh'] |
| verification_status | ENUM | pending, approved, rejected |
| rating | DECIMAL(3,2) | recalculated avg after each review |
| is_available | BOOLEAN | default false |
| telegram_chat_id | VARCHAR(50) | nullable, set after Telegram linking |
| created_at | TIMESTAMP | |

Table: `driver_earnings`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| driver_id | UUID FK → drivers | |
| booking_id | UUID FK → bookings | |
| amount | DECIMAL(10,2) | |
| created_at | TIMESTAMP | |

## Backend Implementation

Module: `src/modules/drivers/`

| Layer | File | Responsibility |
|---|---|---|
| Use Case | `use-cases/get-driver-profile.usecase.ts` | Fetches driver + user join |
| Use Case | `use-cases/update-driver-profile.usecase.ts` | Updates name, phone, languages, photo (Cloudinary upload) |
| Use Case | `use-cases/toggle-availability.usecase.ts` | Flips `is_available` |
| Use Case | `use-cases/approve-driver.usecase.ts` | Sets `verification_status = approved` (admin only) |
| Use Case | `use-cases/reject-driver.usecase.ts` | Sets `verification_status = rejected` (admin only) |
| Use Case | `use-cases/get-earnings.usecase.ts` | Returns `driver_earnings` for driver |
| Controller | `driver.controller.ts` | HTTP methods |
| Routes | `driver.routes.ts` | Driver + admin driver endpoints |

Rating recalculation runs inside `reviews` module after a new review is created.

```
Driver registers (Clerk) → user record created with role: driver
  → driver record created with verification_status: pending
  → Admin reviews → approve or reject
  → Only approved drivers appear in taxi browsing and can receive bookings
```

## Rating Recalculation

After each new review, `drivers.rating` is updated:
```sql
UPDATE drivers SET rating = (
  SELECT AVG(rating) FROM reviews WHERE driver_id = :id
) WHERE id = :id
```
