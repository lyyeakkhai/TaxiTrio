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

## Approval Flow

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
