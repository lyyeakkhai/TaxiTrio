# Database Schema

> Source of truth: [PRD.md](./PRD.md)

Database: **PostgreSQL** via **Prisma ORM**

---

## Tables

### users
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR(100) | |
| email | VARCHAR(150) UNIQUE | |
| password | VARCHAR(255) | bcrypt hashed |
| phone | VARCHAR(20) | |
| profile_photo | VARCHAR(255) | file path |
| role | ENUM | `customer`, `driver`, `admin` |
| created_at | TIMESTAMP | default now() |

---

### drivers
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| user_id | UUID FK → users | |
| taxi_id | UUID FK → taxis | nullable |
| license_number | VARCHAR(50) | |
| languages | TEXT[] | e.g. `['en','km','zh']` |
| verification_status | ENUM | `pending`, `approved`, `rejected` |
| rating | DECIMAL(3,2) | avg from reviews |
| is_available | BOOLEAN | default false |
| created_at | TIMESTAMP | |

---

### taxis
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| model | VARCHAR(100) | |
| plate_number | VARCHAR(20) UNIQUE | |
| type | VARCHAR(50) | Sedan, SUV, Van, etc. |
| passenger_capacity | INT | |
| luggage_capacity | INT | |
| comfort_category | VARCHAR(50) | Standard, Premium, etc. |
| photo | VARCHAR(255) | file path |
| created_at | TIMESTAMP | |

---

### route_packages
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| name | VARCHAR(150) | |
| origin | VARCHAR(100) | |
| destination | VARCHAR(100) | |
| duration_hours | DECIMAL(4,1) | |
| price | DECIMAL(10,2) | |
| included_services | TEXT | |
| recommended_vehicle | VARCHAR(50) | |
| image | VARCHAR(255) | |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMP | |

---

### tour_packages
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
| image | VARCHAR(255) | |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMP | |

---

### bookings
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| customer_id | UUID FK → users | |
| driver_id | UUID FK → drivers | nullable, set on assign |
| taxi_id | UUID FK → taxis | nullable |
| route_package_id | UUID FK → route_packages | nullable |
| tour_package_id | UUID FK → tour_packages | nullable |
| booking_type | ENUM | `taxi`, `route`, `tour` |
| travel_date | DATE | |
| travel_time | TIME | |
| passenger_count | INT | |
| payment_method | ENUM | `cash`, `aba`, `khqr`, `wing`, `card`, `wallet`, `corporate` |
| special_notes | TEXT | nullable |
| status | ENUM | `pending`, `assigned`, `accepted`, `driver_arrived`, `in_progress`, `completed`, `cancelled`, `rejected` |
| created_at | TIMESTAMP | |

---

### booking_status_history
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| booking_id | UUID FK → bookings | |
| status | VARCHAR(50) | |
| changed_by | UUID FK → users | |
| changed_at | TIMESTAMP | default now() |

---

### payments
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| booking_id | UUID FK → bookings | |
| amount | DECIMAL(10,2) | |
| fee | DECIMAL(10,2) | |
| net_amount | DECIMAL(10,2) | |
| method | VARCHAR(50) | |
| status | ENUM | `unpaid`, `pending_verification`, `authorized`, `verified`, `captured`, `invoice_pending`, `rejected`, `refunded` |
| transaction_id | VARCHAR(100) | nullable |
| proof_image | VARCHAR(255) | nullable, uploaded by customer |
| verified_by | UUID FK → users | nullable, admin |
| verified_at | TIMESTAMP | nullable |
| created_at | TIMESTAMP | |

---

### reviews
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| booking_id | UUID FK → bookings | UNIQUE (one review per booking) |
| customer_id | UUID FK → users | |
| driver_id | UUID FK → drivers | |
| rating | INT | 1–5 |
| message | TEXT | nullable |
| created_at | TIMESTAMP | |

---

### complaints
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| booking_id | UUID FK → bookings | |
| customer_id | UUID FK → users | |
| category | ENUM | `driver_behavior`, `vehicle_condition`, `pricing`, `service_quality`, `other` |
| description | TEXT | |
| status | ENUM | `open`, `replied`, `resolved` |
| admin_reply | TEXT | nullable |
| replied_at | TIMESTAMP | nullable |
| created_at | TIMESTAMP | |

---

### notifications
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| user_id | UUID FK → users | |
| type | VARCHAR(50) | e.g. `booking_created`, `driver_assigned` |
| message | TEXT | |
| is_read | BOOLEAN | default false |
| created_at | TIMESTAMP | |

---

### driver_earnings
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| driver_id | UUID FK → drivers | |
| booking_id | UUID FK → bookings | |
| amount | DECIMAL(10,2) | |
| created_at | TIMESTAMP | |

---

## Relationships Summary

```
users ──< bookings (as customer)
users ──< notifications
users ──< complaints (as customer)
users ──< reviews (as customer)

drivers >── users
drivers ──< bookings (as driver)
drivers ──< reviews (as driver)
drivers ──< driver_earnings

taxis >── drivers (assigned taxi)

bookings >── route_packages
bookings >── tour_packages
bookings ──< booking_status_history
bookings ──< payments
bookings ──< reviews (1:1)
bookings ──< complaints
bookings ──< driver_earnings
```
