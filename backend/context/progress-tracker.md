# Backend Progress Tracker

Update this file as each item is completed. Mark items `[x]` when done.

---

## Phase 1 — Project Foundation
> Ref: `../docs/product/DATABASE.md`, `../docs/product/SETUP.md`, `../docs/features/authentication/`

- [x] Node.js + TypeScript project initialized
- [x] Core dependencies installed (express, cors, helmet, rate-limit, pino, tsx)
- [x] Express app with cors, helmet, rate-limit, pino-http
- [x] Pino logger configured (`lib/logger.ts`)
- [x] `GET /health` working
- [ ] Remaining dependencies installed (@clerk/backend, prisma, zod, cloudinary, multer, grammy, swagger-jsdoc, swagger-ui-express, vitest, supertest, @sentry/node)
- [ ] Prisma schema written (all tables from `../docs/product/DATABASE.md`)
- [ ] Prisma connected to Supabase
- [ ] Initial migration run
- [ ] `middleware/auth.ts` — Clerk token verification
- [ ] `middleware/role.ts` — role guard
- [ ] Cloudinary client configured (`lib/cloudinary.ts`)
- [ ] Swagger at `/api/docs`

**Status:** 🟡 In progress

---

## Phase 2 — Core Customer Features
> Ref: `../docs/features/route-tour-packages/`, `../docs/features/booking/`, `../docs/features/tourist-assistance/`, `../docs/features/authentication/`

- [ ] `GET /api/auth/me`
- [ ] Route packages endpoints
- [ ] Tour packages endpoints
- [ ] Taxi browsing endpoint
- [ ] Create booking
- [ ] Booking history + detail
- [ ] Cancel booking
- [ ] Tourist assistance endpoint

**Status:** 🔴 Not started

---

## Phase 3 — Driver Features
> Ref: `../docs/features/driver-management/`, `../docs/features/booking/`, `../docs/features/reviews-complaints/`, `../docs/features/telegram-bot/`

- [ ] Driver profile endpoints
- [ ] Availability toggle
- [ ] Trip management endpoints (accept / reject / arrived / start / complete)
- [ ] Earnings endpoint
- [ ] Reviews endpoint
- [ ] Telegram bot initialized (`bot/index.ts`, `bot/notify.ts`)
- [ ] Driver Telegram linking flow (`telegram_link_codes` table)
- [ ] Telegram webhook handler (Accept/Reject callbacks)

**Status:** 🔴 Not started

---

## Phase 4 — Admin Features
> Ref: `../docs/features/driver-management/`, `../docs/features/booking/`, `../docs/features/route-tour-packages/`, `../docs/features/payment/`, `../docs/features/reviews-complaints/`, `../docs/features/tourist-assistance/`, `../docs/features/telegram-bot/`

- [ ] Dashboard stats
- [ ] User management
- [ ] Driver management + approval
- [ ] Taxi CRUD
- [ ] Route CRUD
- [ ] Tour CRUD
- [ ] Booking management + driver assignment (triggers Telegram notify)
- [ ] Payment management + verify/reject
- [ ] Complaint management + reply
- [ ] Assistance content CRUD

**Status:** 🔴 Not started

---

## Phase 5 — Payments, Reviews, Notifications
> Ref: `../docs/features/payment/`, `../docs/features/reviews-complaints/`, `../docs/features/notifications/`

- [ ] Payment proof upload (Cloudinary)
- [ ] Payment status endpoint
- [ ] Reviews
- [ ] Complaints
- [ ] Notifications
- [ ] Auto-notifications wired into controllers
- [ ] Sentry integration
- [ ] Docker setup
- [ ] GitHub Actions CI

**Status:** 🔴 Not started

---

## Legend

| Symbol | Meaning |
|---|---|
| 🔴 | Not started |
| 🟡 | In progress |
| 🟢 | Complete |
