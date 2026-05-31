# System Architecture

> Source of truth: [PRD.md](./PRD.md)

---

## Overview

TaxiTrio is a fullstack web application with a **React frontend**, **Node.js/Express backend**, and **PostgreSQL database**. The system serves three roles: Customer, Driver, and Admin — each with a dedicated dashboard.

```
┌─────────────────────────────────────────────────────┐
│                     Browser                         │
│              React + Vite + Tailwind                │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS / REST
┌────────────────────▼────────────────────────────────┐
│               Express REST API                      │
│         JWT Auth · Role Guard · Multer              │
└────────────────────┬────────────────────────────────┘
                     │ Prisma ORM
┌────────────────────▼────────────────────────────────┐
│                 PostgreSQL                          │
└─────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Stack

| Tool | Purpose |
|---|---|
| React + Vite | UI framework, fast dev server |
| Tailwind CSS | Utility-first styling |
| React Router v6 | Client-side routing, role-based guards |
| Axios | HTTP client with JWT interceptor |
| Context API | Auth state, theme state |

### Folder Structure

```
frontend/src/
├── api/              # One file per domain (auth.js, bookings.js, etc.)
├── components/       # Reusable UI (Button, Card, Modal, StatusBadge)
├── context/          # AuthContext, ThemeContext
├── hooks/            # useAuth, useBooking, useNotifications
├── pages/
│   ├── customer/     # Home, Browse, BookingDetail, History, Profile
│   ├── driver/       # Dashboard, TripDetail, Earnings, Reviews
│   └── admin/        # Dashboard, Bookings, Drivers, Payments, Complaints
└── utils/            # formatDate, formatCurrency, whatsappLink
```

### Route Protection

```
/customer/*  → requires role: customer
/driver/*    → requires role: driver
/admin/*     → requires role: admin
/login       → redirects if already authenticated
```

---

## Backend Architecture

### Stack

| Tool | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Prisma | ORM + migrations |
| JWT + Bcrypt | Stateless auth, password hashing |
| Multer | File uploads (photos, payment proof) |

### Folder Structure

```
backend/src/
├── routes/           # One file per domain (auth, bookings, driver, admin)
├── controllers/      # Business logic per domain
├── middleware/
│   ├── auth.js       # verifyToken — decodes JWT, attaches req.user
│   └── role.js       # requireRole('admin') — guards by role
├── prisma/
│   ├── schema.prisma # All table definitions
│   └── seed.js       # Default admin account
└── utils/
    ├── jwt.js        # sign / verify helpers
    └── response.js   # success / error response helpers
```

### Request Lifecycle

```
Request
  → verifyToken middleware (decode JWT → req.user)
  → requireRole middleware (check req.user.role)
  → Controller (business logic)
  → Prisma query
  → JSON response
```

---

## Auth Flow

```
POST /api/auth/login
  ← { token, user: { id, name, role } }

Client stores token in localStorage
Every request: Authorization: Bearer <token>
```

---

## Booking Status Machine

```
PENDING
  → ASSIGNED      (admin assigns driver)
  → ACCEPTED      (driver accepts)
  → DRIVER_ARRIVED
  → IN_PROGRESS   (driver starts trip)
  → COMPLETED
  → CANCELLED     (customer or admin)
  → REJECTED      (driver rejects)
```

Invalid transitions return `400 Bad Request`.

---

## Key Design Decisions

| Decision | Reason |
|---|---|
| Fixed pricing | Admin sets prices; no surge or negotiation |
| Single `bookings` table | `booking_type` enum handles taxi/route/tour |
| Manual payment verification | Admin reviews uploaded proof image |
| WhatsApp is a URL | No API integration needed; pre-filled message link |
| Driver availability is manual | Driver toggles online/offline |
