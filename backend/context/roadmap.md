# Backend Roadmap

Full implementation is split into 5 phases. Complete phases in order — each phase depends on the previous.

---

## Phase 1 — Project Foundation
**Goal:** Runnable Express server with auth middleware, Prisma connected to Supabase, and Swagger docs wired up.
**Refs:** `tech-stack.md`, `../docs/product/DATABASE.md`, `../docs/product/SETUP.md`, `../docs/features/authentication.md`

- [x] Init Node.js + TypeScript project (`tsconfig.json`, `package.json`)
- [x] Install core dependencies (express, cors, helmet, express-rate-limit, pino, pino-http, tsx)
- [x] Express app with `cors`, `helmet`, `express-rate-limit`, `pino-http`
- [x] Pino logger (`lib/logger.ts`)
- [x] `GET /health` endpoint
- [ ] Install remaining dependencies (see `tech-stack.md` — @clerk/backend, prisma, zod, cloudinary, multer, grammy, swagger-jsdoc, swagger-ui-express, vitest, supertest, sentry)
- [ ] Connect Prisma to Supabase (`prisma/schema.prisma`, `lib/prisma.ts`)
- [ ] Write full Prisma schema — all tables from `../docs/product/DATABASE.md`
- [ ] Run initial migration
- [ ] `middleware/auth.ts` — verify Clerk token, attach `req.user` (see `../docs/features/authentication.md`)
- [ ] `middleware/role.ts` — `requireRole(...roles)`
- [ ] Cloudinary client (`lib/cloudinary.ts`) — see `../docs/product/SETUP.md` for env vars
- [ ] Swagger at `/api/docs`

---

## Phase 2 — Core Customer Features
**Goal:** Customers can browse, book, and track.
**Refs:** `../docs/features/route-tour-packages.md`, `../docs/features/booking.md`, `../docs/features/tourist-assistance.md`, `../docs/features/authentication.md`

- [ ] `GET /api/auth/me` — return user from Clerk token
- [ ] `GET /api/routes` — list active route packages
- [ ] `GET /api/routes/:id`
- [ ] `GET /api/tours` — list active tour packages
- [ ] `GET /api/tours/:id`
- [ ] `GET /api/taxis` — list available taxis with driver info
- [ ] `POST /api/bookings` — create booking (taxi / route / tour), Zod validate body
- [ ] `GET /api/bookings/my` — customer booking history
- [ ] `GET /api/bookings/:id` — booking detail + status history
- [ ] `PUT /api/bookings/:id/cancel`
- [ ] `GET /api/assistance` — tourist assistance content

---

## Phase 3 — Driver Features
**Goal:** Drivers can manage trips and view earnings.
**Refs:** `../docs/features/driver-management.md`, `../docs/features/booking.md`, `../docs/features/reviews-complaints.md`, `../docs/features/telegram-bot.md`

- [ ] `GET /api/driver/profile`
- [ ] `PUT /api/driver/profile` — update name, phone, languages, photo (upload to Cloudinary)
- [ ] `PUT /api/driver/availability` — toggle is_available
- [ ] `GET /api/driver/bookings` — assigned bookings
- [ ] `PUT /api/driver/bookings/:id/accept` — enforce ASSIGNED → ACCEPTED transition
- [ ] `PUT /api/driver/bookings/:id/reject`
- [ ] `PUT /api/driver/bookings/:id/arrived` — ACCEPTED → DRIVER_ARRIVED
- [ ] `PUT /api/driver/bookings/:id/start` — DRIVER_ARRIVED → IN_PROGRESS
- [ ] `PUT /api/driver/bookings/:id/complete` — IN_PROGRESS → COMPLETED
- [ ] `GET /api/driver/earnings`
- [ ] `GET /api/driver/reviews`
- [ ] Telegram bot setup — `bot/index.ts` (grammY), `bot/notify.ts` (`notifyDriver()`)
- [ ] `POST /api/driver/telegram/generate-code` — one-time 6-digit code, store in `telegram_link_codes`
- [ ] `POST /api/telegram/webhook` — `/link <code>` saves `telegram_chat_id`; Accept/Reject callbacks update booking status

---

## Phase 4 — Admin Features
**Goal:** Admins can manage the full platform.
**Refs:** `../docs/features/driver-management.md`, `../docs/features/booking.md`, `../docs/features/route-tour-packages.md`, `../docs/features/payment.md`, `../docs/features/reviews-complaints.md`, `../docs/features/tourist-assistance.md`, `../docs/features/telegram-bot.md`

- [ ] `GET /api/admin/dashboard` — revenue, completed trips, pending bookings, open complaints
- [ ] `GET /api/admin/users`, `GET /api/admin/users/:id`
- [ ] `GET /api/admin/drivers`, `GET /api/admin/drivers/:id`
- [ ] `PUT /api/admin/drivers/:id/approve` — set verification_status = approved
- [ ] `PUT /api/admin/drivers/:id/reject`
- [ ] CRUD `/api/admin/taxis` — images go to Cloudinary
- [ ] CRUD `/api/admin/routes` — images go to Cloudinary
- [ ] CRUD `/api/admin/tours` — images go to Cloudinary
- [ ] `GET /api/admin/bookings`, `GET /api/admin/bookings/:id`
- [ ] `PUT /api/admin/bookings/:id/assign` — set driver, status PENDING → ASSIGNED, call `notifyDriver()` via Telegram
- [ ] `GET /api/admin/payments`, `GET /api/admin/payments/:id` — includes Cloudinary proof image URL
- [ ] `PUT /api/admin/payments/:id/verify`
- [ ] `PUT /api/admin/payments/:id/reject`
- [ ] `GET /api/admin/complaints`
- [ ] `PUT /api/admin/complaints/:id/reply` — set admin_reply, status → replied
- [ ] CRUD `/api/admin/assistance`

---

## Phase 5 — Payments, Reviews, Notifications
**Goal:** Complete the payment and feedback loop.
**Refs:** `../docs/features/payment.md`, `../docs/features/reviews-complaints.md`, `../docs/features/notifications-whatsapp.md`

- [ ] `POST /api/payments/:booking_id/upload-proof` — multer in-memory → upload to Cloudinary, store `secure_url`
- [ ] `GET /api/payments/:booking_id`
- [ ] `POST /api/reviews` — one per completed booking (UNIQUE constraint on `booking_id`)
- [ ] `POST /api/complaints`
- [ ] `GET /api/complaints/my`
- [ ] `GET /api/notifications`
- [ ] `PUT /api/notifications/:id/read`
- [ ] `PUT /api/notifications/read-all`
- [ ] Auto-create notifications in controllers: booking_created, driver_assigned, booking_accepted, payment_verified, trip_completed, complaint_replied
- [ ] Sentry integration
- [ ] Docker setup (`Dockerfile`, `.dockerignore`)
- [ ] GitHub Actions CI (lint + test on PR)
