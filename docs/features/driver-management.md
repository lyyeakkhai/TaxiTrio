# Feature: Driver Management

> Roles: Driver (self-manage) · Admin (approve / reject / monitor)

---

## Overview

Drivers register as users with `role: driver`, then submit profile details. Admin approves before they can receive bookings.

---

## Driver Verification Flow

```
Driver registers → pending → Admin approves → can receive bookings
                           ↘ Admin rejects  → cannot receive bookings
```

---

## Frontend

**Driver pages:** `pages/driver/Profile.jsx`, `pages/driver/Earnings.jsx`, `pages/driver/Reviews.jsx`  
**Admin pages:** `pages/admin/Drivers.jsx`, `pages/admin/DriverDetail.jsx`

---

## Backend

**Route file:** `routes/driver.js`, `routes/admin.js`  
**Controller:** `controllers/driverController.js`

### Driver Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/driver/profile` | Driver | View own profile |
| PUT | `/api/driver/profile` | Driver | Update name, phone, languages, photo |
| PUT | `/api/driver/availability` | Driver | Toggle is_available |
| GET | `/api/driver/earnings` | Driver | Earnings summary |
| GET | `/api/driver/reviews` | Driver | Reviews received |

### Admin Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/admin/drivers` | Admin | List all drivers |
| GET | `/api/admin/drivers/:id` | Admin | Driver detail |
| PUT | `/api/admin/drivers/:id/approve` | Admin | Approve driver |
| PUT | `/api/admin/drivers/:id/reject` | Admin | Reject driver |

---

## Database

Tables used: `drivers`, `driver_earnings`

Driver profile shows: verification status, rating (avg from `reviews`), languages, availability.
