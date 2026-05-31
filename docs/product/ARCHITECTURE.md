# System Architecture

> Source of truth: [PRD.md](./PRD.md)

---

## Overview

TaxiTrio is a fullstack web application with a **Next.js frontend**, **Express.js backend (TypeScript)**, and **Supabase (PostgreSQL)** database. The system serves three roles: Customer, Driver, and Admin — each with a dedicated dashboard.

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│         Next.js (App Router) · Clerk · shadcn/ui            │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS / REST
┌────────────────────────▼────────────────────────────────────┐
│              Express.js REST API (TypeScript)                │
│   Clerk SDK · Zod · cors · helmet · rate-limit · Pino       │
└────────────────────────┬────────────────────────────────────┘
                         │ Prisma ORM
┌────────────────────────▼────────────────────────────────────┐
│              Supabase (Managed PostgreSQL)                   │
└─────────────────────────────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    Cloudinary                               │
│          Images: driver photos, payment proofs              │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Stack

| Tool | Purpose |
|---|---|
| Next.js (App Router) | Framework, SSR, file-based routing |
| TypeScript | Type safety across all components and API calls |
| Tailwind CSS + shadcn/ui | Utility styling + accessible component library |
| Clerk | Authentication — sign in, sign up, session management, role metadata |
| TanStack Query | Server state: caching, loading states, background sync |
| Zustand | Client state: complex local UI state without prop-drilling |
| next-intl | Internationalization (multi-language support for tourists) |
| Zod | Form and input validation schemas |

### Folder Structure

```
frontend/
├── app/
│   ├── (customer)/       # Customer route group
│   ├── (driver)/         # Driver route group
│   ├── (admin)/          # Admin route group
│   └── api/              # Next.js API routes (if needed for BFF)
├── components/           # Reusable UI (shadcn/ui wrappers, StatusBadge, etc.)
├── hooks/                # useBooking, useNotifications, useDriver
├── lib/
│   ├── api.ts            # Axios instance with Clerk token injection
│   ├── queryClient.ts    # TanStack Query client config
│   └── zod/              # Shared Zod schemas
├── store/                # Zustand stores (bookingStore, uiStore)
├── messages/             # i18n translation files (en.json, km.json, zh.json)
└── types/                # Shared TypeScript types
```

### Route Protection

Clerk middleware (`middleware.ts`) protects routes by role stored in `publicMetadata.role`:

```
/customer/*  → requires role: customer
/driver/*    → requires role: driver
/admin/*     → requires role: admin
/sign-in     → redirects if already authenticated
```

### Auth Flow (Clerk)

```
User signs in via Clerk hosted UI
  ← Clerk session token (JWT)

frontend/lib/api.ts injects token:
  Authorization: Bearer <clerk_session_token>

Backend verifies token via Clerk SDK (not a custom JWT)
Role is read from Clerk publicMetadata.role
```

---

## Backend Architecture

### Stack

| Tool | Purpose |
|---|---|
| Express.js + TypeScript | REST API server |
| Clerk SDK | Verify frontend session tokens, read user role |
| Prisma | ORM + migrations against Supabase |
| Zod | Validate all incoming request payloads |
| cors | Allow Next.js origin |
| helmet | Secure HTTP headers |
| express-rate-limit | Brute-force and DDoS protection |
| Pino | Structured JSON logging |
| Swagger | Auto-generated API documentation at `/api/docs` |
| Cloudinary SDK | Upload and manage images (replaces local Multer storage) |

### Folder Structure

```
backend/src/
├── routes/           # One file per domain (bookings.ts, driver.ts, admin.ts)
├── controllers/      # Business logic per domain
├── middleware/
│   ├── auth.ts       # verifyClerkToken — attaches req.user from Clerk
│   └── role.ts       # requireRole('admin') — guards by publicMetadata.role
├── validators/       # Zod schemas for each request body
├── lib/
│   ├── prisma.ts     # Prisma client singleton
│   ├── cloudinary.ts # Cloudinary client config
│   └── logger.ts     # Pino logger instance
├── swagger/          # Swagger JSDoc annotations
└── types/            # Shared TypeScript types (req.user extension, etc.)
```

### Request Lifecycle

```
Request
  → cors + helmet + rate-limit
  → verifyClerkToken (validate session → attach req.user)
  → requireRole (check publicMetadata.role)
  → Zod validator (parse + validate body)
  → Controller (business logic)
  → Prisma → Supabase
  → JSON response
  → Pino logs request + response time
```

---

## Data & Storage

| Service | Purpose |
|---|---|
| Supabase | Managed PostgreSQL — primary database |
| Prisma | ORM layer — type-safe queries, migrations |
| Cloudinary | Image storage — driver photos, taxi photos, payment proofs |

Images are uploaded directly to Cloudinary from the backend. The returned `secure_url` is stored in the database (not a local file path).

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

## DevOps & Quality

| Tool | Purpose |
|---|---|
| Docker | Containerize Express backend for consistent deployments |
| GitHub Actions | CI/CD — lint, test, build on every PR |
| ESLint + Prettier | Code quality and consistent formatting |
| Vitest | Unit and integration tests |
| Playwright | End-to-end browser tests |
| Sentry | Error tracking and crash reporting (frontend + backend) |

---

## Key Design Decisions

| Decision | Reason |
|---|---|
| Clerk for auth | Handles sessions, MFA, social login — no custom JWT logic needed |
| Supabase over self-hosted Postgres | Managed DB with built-in backups and connection pooling |
| Cloudinary over local uploads | Persistent image storage, CDN delivery, no disk management |
| Zod on both frontend and backend | Single source of validation truth, shared schemas possible |
| TanStack Query over plain fetch | Automatic caching, background refetch, loading/error states |
| next-intl for i18n | Tourists speak multiple languages — Khmer, English, Chinese, Japanese, Korean, French |
| Fixed pricing | Admin sets prices; no surge or negotiation |
| Single `bookings` table | `booking_type` enum handles taxi/route/tour |
| Manual payment verification | Admin reviews Cloudinary-hosted proof image |
| WhatsApp is a URL | No API integration needed; pre-filled message link |
