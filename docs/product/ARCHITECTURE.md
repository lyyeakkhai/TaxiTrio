# System Architecture

> Source of truth: [PRD.md](./PRD.md)

---

## Overview

TaxiTrio has **two separate Next.js frontends**, one **Express.js backend API**, and **Supabase (PostgreSQL)** as the database.

```
┌──────────────────────────┐   ┌──────────────────────────┐
│   User App (Next.js)     │   │  Admin Dashboard (Next.js)│
│  Customer · Driver       │   │  Admin only               │
│  Clerk · shadcn/ui       │   │  Clerk · shadcn/ui        │
└────────────┬─────────────┘   └────────────┬──────────────┘
             │ HTTPS / REST                  │ HTTPS / REST
             └──────────────┬───────────────┘
                            ▼
             ┌──────────────────────────────┐
             │   Express.js REST API (TS)   │
             │  Clerk SDK · Zod · Pino      │
             │  cors · helmet · rate-limit  │
             └──────────────┬───────────────┘
                            │ Prisma ORM
                            ▼
             ┌──────────────────────────────┐
             │   Supabase (PostgreSQL)      │
             └──────────────┬───────────────┘
                            │
                            ▼
             ┌──────────────────────────────┐
             │   Cloudinary                 │
             │   driver/taxi photos,        │
             │   payment proofs             │
             └──────────────────────────────┘
```

---

## Two Frontends

| App | Audience | Routes |
|---|---|---|
| `frontend/` | Customers + Drivers | `/customer/*`, `/driver/*` |
| `admin-dashboard/` | Admin only | `/dashboard/*`, `/drivers/*`, `/bookings/*`, `/payments/*`, etc. |

Both apps hit the same backend API. Role enforcement is in the backend via Clerk `publicMetadata.role`.

---

## Frontend Stack (both apps)

| Tool | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework, SSR, file-based routing |
| TypeScript | Type safety |
| Tailwind CSS + shadcn/ui | Styling + accessible components |
| Clerk | Auth — session management, role metadata |
| TanStack Query | Server state: caching, loading, background sync |
| Zustand | Complex local UI state |
| next-intl | i18n — Khmer, English, Chinese, Japanese, Korean, French (user app only) |
| Zod | Form validation |

### User App (`frontend/`)

```
frontend/app/
├── (customer)/     # Browse, book, track, pay, review
└── (driver)/       # Trip management, earnings, profile
```

### Admin Dashboard (`admin-dashboard/`)

```
admin-dashboard/app/
├── dashboard/      # Stats overview
├── drivers/        # CRUD + approve/reject
├── taxis/          # CRUD
├── bookings/       # View all, assign driver
├── routes/         # CRUD route packages
├── tours/          # CRUD tour packages
├── payments/       # Verify / reject
├── complaints/     # Reply
├── users/          # View customers
└── assistance/     # CRUD tourist assistance content
```

---

## Backend Architecture

### Stack

| Tool | Purpose |
|---|---|
| Express.js + TypeScript | REST API server |
| Clerk SDK | Verify session tokens, read `publicMetadata.role` |
| Prisma | ORM + migrations against Supabase |
| Zod | Validate all incoming request bodies |
| cors | Allow both frontend origins |
| helmet | Secure HTTP headers |
| express-rate-limit | Brute-force and DDoS protection |
| Pino + pino-http | Structured JSON logging |
| Swagger | API docs at `/api/docs` |
| Cloudinary SDK | Image uploads — no local storage |
| multer | Parse multipart/form-data (in-memory only) |
| grammy | Telegram bot — driver notifications |
| resend | Email — booking confirmation + payment receipt to customers |

### Folder Structure

```
backend/src/
├── routes/           # One file per domain
├── controllers/      # Business logic per domain
├── middleware/
│   ├── auth.ts       # verifyClerkToken → req.user
│   └── role.ts       # requireRole('admin' | 'driver' | 'customer')
├── validators/       # Zod schemas per endpoint
├── bot/
│   ├── index.ts      # grammY bot instance + webhook handler
│   └── notify.ts     # notifyDriver(chatId, booking)
├── lib/
│   ├── prisma.ts     # Prisma client singleton
│   ├── cloudinary.ts # Cloudinary client config
│   └── logger.ts     # Pino instance
├── swagger/          # Swagger JSDoc config
└── types/            # req.user extension, shared types
```

### Request Lifecycle

```
Request
  → cors + helmet + rate-limit
  → verifyClerkToken → req.user
  → requireRole (check publicMetadata.role)
  → Zod validator (parse + validate body)
  → Controller
  → Prisma → Supabase
  → JSON response
  → Pino logs
```

---

## API Design Principle

Every resource the admin manages has **full CRUD**. The same data is read by the user app and written/managed by the admin app.

| Resource | Public / Customer | Admin |
|---|---|---|
| Taxis | GET list, GET detail | POST, PUT, DELETE |
| Route packages | GET list, GET detail | POST, PUT, DELETE |
| Tour packages | GET list, GET detail | POST, PUT, DELETE |
| Drivers | — | GET list, GET detail, PUT approve/reject, DELETE |
| Users | own profile only | GET list, GET detail |
| Bookings | own bookings | GET all, PUT assign-driver, PUT cancel |
| Payments | own payment, upload proof | GET all, PUT verify, PUT reject |
| Reviews | POST (own) | GET all |
| Complaints | POST, GET own | GET all, PUT reply, PUT resolve |
| Notifications | GET own, PUT read | — |
| Tourist Assistance | GET all | POST, PUT, DELETE |

---

## Booking Status Machine

```
PENDING → ASSIGNED → ACCEPTED → DRIVER_ARRIVED → IN_PROGRESS → COMPLETED
       ↘ CANCELLED              ↘ REJECTED
```

Invalid transitions return `400 Bad Request`. Every transition writes to `booking_status_history`.

---

## Auth Flow (Clerk)

```
User signs in via Clerk
  ← session token (JWT)

lib/api.ts injects: Authorization: Bearer <token>

Backend: verifyClerkToken → reads publicMetadata.role
  customer → /api/* (customer routes)
  driver   → /api/driver/*
  admin    → /api/admin/*
```

---

## Data & Storage

| Service | Purpose |
|---|---|
| Supabase | Managed PostgreSQL |
| Prisma | ORM, migrations |
| Cloudinary | All images — secure_url stored in DB |

---

## DevOps & Quality

| Tool | Purpose |
|---|---|
| Docker | Containerize Express backend |
| GitHub Actions | CI — lint, test, build on PR |
| ESLint + Prettier | Code quality |
| Vitest + Supertest | Unit + integration tests |
| Playwright | E2E tests |
| Sentry | Error tracking (both frontends + backend) |

---

## Key Design Decisions

| Decision | Reason |
|---|---|
| Two separate frontends | Admin dashboard is a different product — different UX, no tourist features, no i18n |
| Full CRUD on all resources | Admin must manage all content without a developer |
| is_active soft delete | Deactivating a route/tour/taxi preserves booking history |
| Clerk for auth | No custom JWT — handles MFA, social login, role metadata |
| Fixed pricing | Admin sets prices; no surge or negotiation |
| Single bookings table | booking_type enum handles taxi/route/tour |
| Manual payment verification | Admin reviews Cloudinary proof image |
| WhatsApp is a URL | No API integration — pre-filled message link |
