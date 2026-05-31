# TaxiTrio

Smart tourist transportation and tour booking platform for Cambodia. Built for international travelers who need verified drivers, transparent pricing, and intercity travel — without the scams.

---

## What it does

- **Browse & book** taxis, intercity route packages (Phnom Penh → Siem Reap, etc.), and tour packages (Angkor Sunrise, city tours, etc.)
- **Track bookings** through a full status lifecycle: Pending → Assigned → Accepted → Driver Arrived → In Progress → Completed
- **Pay transparently** via Cash, ABA Pay, KHQR, Wing Pay, or card — with proof upload and admin verification
- **Contact via WhatsApp** with auto-filled booking messages — no new app required
- **Get travel assistance** — emergency contacts, rest stops, driver languages, tourist police info
- **Rate drivers** and submit complaints with admin follow-up

---

## Architecture

```
┌─────────────────────┐   ┌──────────────────────────┐
│  User App (Next.js) │   │ Admin Dashboard (Next.js) │
│  Customer · Driver  │   │ Admin only                │
└──────────┬──────────┘   └────────────┬──────────────┘
           │         REST API          │
           └──────────────┬────────────┘
                          ▼
           ┌──────────────────────────┐
           │  Express.js API (TS)     │
           │  Clerk · Prisma · Zod    │
           └──────────────┬───────────┘
                          ▼
           ┌──────────────────────────┐
           │  Supabase (PostgreSQL)   │
           └──────────────────────────┘
```

Two separate Next.js frontends share one backend. Role enforcement is handled by Clerk `publicMetadata.role`.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind CSS, shadcn/ui |
| Auth | Clerk (customer, driver, admin roles) |
| State | TanStack Query + Zustand |
| i18n | next-intl — Khmer, English, Chinese, Japanese, Korean, French |
| Backend | Express.js + TypeScript |
| ORM | Prisma → Supabase (PostgreSQL) |
| Images | Cloudinary |
| Notifications | Telegram bot (grammY) + Email (Resend) |
| API Docs | Swagger at `/api/docs` |

---

## Workspaces

```
TaxiTrio/
├── frontend/          # Customer + Driver app
├── admin-dashboard/   # Admin-only dashboard
├── backend/           # Express REST API
└── docs/
    ├── product/PRD.md            # Product requirements
    ├── product/ARCHITECTURE.md   # System design
    └── features/                 # Per-feature specs + OpenAPI
```

---

## Getting started

Each workspace has its own setup. See the `CLAUDE.md` in each directory for dev commands and conventions.

```bash
# Backend
cd backend && npm install && npm run dev

# User app
cd frontend && npm install && npm run dev

# Admin dashboard
cd admin-dashboard && npm install && npm run dev
```

Copy `.env.example` to `.env` in each workspace and fill in your Clerk, Supabase, and Cloudinary credentials.

---

## User roles

| Role | Access |
|---|---|
| Customer | Browse, book, pay, track, review, complain |
| Driver | Accept trips, update status, view earnings |
| Admin | Manage everything — drivers, bookings, payments, analytics |
