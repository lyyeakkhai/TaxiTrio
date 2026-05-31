# Booking — Design

## Data Model

Table: `bookings`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| customer_id | UUID FK → users | |
| driver_id | UUID FK → drivers | nullable, set on assign |
| taxi_id | UUID FK → taxis | nullable |
| route_package_id | UUID FK → route_packages | nullable |
| tour_package_id | UUID FK → tour_packages | nullable |
| booking_type | ENUM | taxi, route, tour |
| travel_date | DATE | |
| travel_time | TIME | |
| passenger_count | INT | |
| payment_method | ENUM | cash, aba, khqr, wing, card, wallet, corporate |
| special_notes | TEXT | nullable |
| status | ENUM | pending, assigned, accepted, driver_arrived, in_progress, completed, cancelled, rejected |
| created_at | TIMESTAMP | |

Table: `booking_status_history`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| booking_id | UUID FK → bookings | |
| status | VARCHAR(50) | |
| changed_by | UUID FK → users | |
| changed_at | TIMESTAMP | default now() |

## Status Transition Rules

| From | To | Actor |
|---|---|---|
| pending | assigned | admin |
| pending | cancelled | customer or admin |
| assigned | accepted | driver |
| assigned | rejected | driver |
| accepted | driver_arrived | driver |
| driver_arrived | in_progress | driver |
| in_progress | completed | driver |

Any other transition returns `400 Bad Request`.

## Side Effects on Assign
When admin assigns a driver:
1. `booking.status` → `assigned`
2. `booking.driver_id` → set
3. `notifyDriver(driver.telegram_chat_id, booking)` called
4. Notification created for customer: `driver_assigned`
