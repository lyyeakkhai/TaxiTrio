# Backend Roadmap

Architecture: Vertical Slice + OOP Use-Case Pattern.
Standards: `code-standards.md` | Spec: `../docs/superpowers/specs/2026-05-31-backend-architecture-design.md`

Complete phases in order — each phase depends on the previous.

---

## Phase 1 — Foundation

**Goal:** Runnable server with auth, Prisma, Zod middleware, error handling, and Swagger wired up.

### 1.1 Dependencies
- [ ] Install: `@clerk/backend prisma @prisma/client zod cloudinary multer grammy resend swagger-jsdoc swagger-ui-express @sentry/node`
- [ ] Install dev: `vitest supertest @types/supertest @types/multer`

### 1.2 Shared Infrastructure
- [ ] `src/lib/prisma.ts` — PrismaClient singleton
- [ ] `src/lib/cloudinary.ts` — Cloudinary client config
- [ ] `src/types/express.d.ts` — augment `req.user: { id, clerkId, role }`
- [ ] `src/middleware/validate.ts` — `validateRequest(schema)` Zod factory
- [ ] `src/middleware/auth.ts` — `verifyClerkToken` → attaches `req.user`
- [ ] `src/middleware/role.ts` — `requireRole(...roles)` guard
- [ ] `src/middleware/error.ts` — centralized error handler (last middleware)

### 1.3 Prisma Schema
- [ ] Write `prisma/schema.prisma` — all tables from `../docs/product/DATABASE.md`
  - `users`, `drivers`, `taxis`, `route_packages`, `tour_packages`
  - `bookings`, `booking_status_history`, `payments`
  - `reviews`, `complaints`, `notifications`, `driver_earnings`
  - `telegram_link_codes`
- [ ] Connect to Supabase (`DATABASE_URL` in `.env`)
- [ ] Run `npx prisma migrate dev --name init`
- [ ] `prisma/seed.ts` — seed admin user

### 1.4 App Wiring
- [ ] Update `src/app.ts` — register module routers under `/api`, add `errorHandler` last
- [ ] `src/swagger/` — Swagger config, expose at `/api/docs`

---

## Phase 2 — Core Customer Features

**Goal:** Customers can browse packages and create/manage bookings.
**Refs:** `../docs/features/authentication/`, `../docs/features/booking/`, `../docs/features/route-tour-packages/`, `../docs/features/taxis/`, `../docs/features/tourist-assistance/`

### 2.1 Users Module (`src/modules/users/`)
- [ ] `user.schema.ts` — `CreateUserSchema`, `UpdateUserSchema`
- [ ] `use-cases/create-user.usecase.ts` — check duplicate `clerkId`, create user
- [ ] `use-cases/get-me.usecase.ts` — fetch user by `clerkId`
- [ ] `user.controller.ts` — `create`, `getMe`
- [ ] `user.routes.ts` — `POST /api/users`, `GET /api/auth/me`
- [ ] Barrel exports (`use-cases/index.ts`, `index.ts`)

### 2.2 Routes Module (`src/modules/routes/`)
- [ ] `route.schema.ts`
- [ ] `use-cases/list-routes.usecase.ts` — active only
- [ ] `use-cases/get-route.usecase.ts`
- [ ] `route.controller.ts`, `route.routes.ts`
- [ ] `GET /api/routes`, `GET /api/routes/:id`

### 2.3 Tours Module (`src/modules/tours/`)
- [ ] Same pattern as routes module
- [ ] `GET /api/tours`, `GET /api/tours/:id`

### 2.4 Taxis Module (`src/modules/taxis/`)
- [ ] `use-cases/list-taxis.usecase.ts` — active taxis with joined driver info
- [ ] `GET /api/taxis`

### 2.5 Bookings Module (`src/modules/bookings/`)
- [ ] `booking.schema.ts` — `CreateBookingSchema`
- [ ] `use-cases/create-booking.usecase.ts` — validate refs, create booking + status history entry
- [ ] `use-cases/list-my-bookings.usecase.ts`
- [ ] `use-cases/get-booking.usecase.ts` — includes status history
- [ ] `use-cases/transition-booking.usecase.ts` — shared state machine, throws `400` on invalid transition
- [ ] `use-cases/cancel-booking.usecase.ts` — calls transition (`pending → cancelled`)
- [ ] `booking.controller.ts`, `booking.routes.ts`
- [ ] `POST /api/bookings`, `GET /api/bookings/my`, `GET /api/bookings/:id`, `PUT /api/bookings/:id/cancel`

### 2.6 Assistance Module (`src/modules/assistance/`)
- [ ] `use-cases/list-assistance.usecase.ts` — active items only
- [ ] `GET /api/assistance`

---

## Phase 3 — Driver Features

**Goal:** Drivers can manage their profile, toggle availability, and handle trip lifecycle.
**Refs:** `../docs/features/driver-management/`, `../docs/features/booking/`, `../docs/features/telegram-bot/`

### 3.1 Drivers Module (`src/modules/drivers/`)
- [ ] `driver.schema.ts`
- [ ] `use-cases/get-driver-profile.usecase.ts`
- [ ] `use-cases/update-driver-profile.usecase.ts` — photo upload → Cloudinary
- [ ] `use-cases/toggle-availability.usecase.ts`
- [ ] `use-cases/get-earnings.usecase.ts`
- [ ] `use-cases/get-driver-reviews.usecase.ts`
- [ ] `driver.controller.ts`, `driver.routes.ts`
- [ ] `GET /api/driver/profile`, `PUT /api/driver/profile`, `PUT /api/driver/availability`
- [ ] `GET /api/driver/bookings`, `GET /api/driver/earnings`, `GET /api/driver/reviews`

### 3.2 Booking Transitions (Driver)
- [ ] `use-cases/accept-booking.usecase.ts` — `assigned → accepted`
- [ ] `use-cases/reject-booking.usecase.ts` — `assigned → rejected`
- [ ] `use-cases/arrived-booking.usecase.ts` — `accepted → driver_arrived`
- [ ] `use-cases/start-booking.usecase.ts` — `driver_arrived → in_progress`
- [ ] `use-cases/complete-booking.usecase.ts` — `in_progress → completed`
- [ ] Routes: `PUT /api/driver/bookings/:id/accept|reject|arrived|start|complete`

### 3.3 Telegram Bot (`src/bot/`)
- [ ] `src/bot/index.ts` — grammY bot instance
- [ ] `src/bot/notify.ts` — `notifyDriver(chatId, booking)`
- [ ] `use-cases/generate-telegram-code.usecase.ts` — 6-digit code, 10 min TTL
- [ ] `src/modules/telegram/telegram.routes.ts` — `/link <code>` handler + Accept/Reject callbacks
- [ ] `POST /api/driver/telegram/generate-code`, `POST /api/telegram/webhook`

---

## Phase 4 — Admin Features

**Goal:** Admins can manage the full platform.
**Refs:** `../docs/features/driver-management/`, `../docs/features/booking/`, `../docs/features/route-tour-packages/`, `../docs/features/taxis/`, `../docs/features/payment/`, `../docs/features/reviews-complaints/`, `../docs/features/tourist-assistance/`

### 4.1 Admin — Users & Drivers
- [ ] `use-cases/list-users.usecase.ts`, `use-cases/get-user.usecase.ts`
- [ ] `use-cases/list-drivers.usecase.ts`, `use-cases/get-driver.usecase.ts`
- [ ] `use-cases/approve-driver.usecase.ts` — `verification_status = approved`
- [ ] `use-cases/reject-driver.usecase.ts`
- [ ] `GET /api/admin/users`, `GET /api/admin/users/:id`
- [ ] `GET /api/admin/drivers`, `GET /api/admin/drivers/:id`
- [ ] `PUT /api/admin/drivers/:id/approve`, `PUT /api/admin/drivers/:id/reject`

### 4.2 Admin — Taxis CRUD
- [ ] `use-cases/create-taxi.usecase.ts` — photo → Cloudinary
- [ ] `use-cases/update-taxi.usecase.ts`
- [ ] `use-cases/delete-taxi.usecase.ts` — soft delete; hard delete if no bookings
- [ ] `POST /api/admin/taxis`, `PUT /api/admin/taxis/:id`, `DELETE /api/admin/taxis/:id`

### 4.3 Admin — Routes & Tours CRUD
- [ ] Same pattern as taxis for both `routes/` and `tours/` modules
- [ ] `POST|PUT|DELETE /api/admin/routes/:id`, `POST|PUT|DELETE /api/admin/tours/:id`
- [ ] `PATCH /api/admin/routes/:id/toggle`, `PATCH /api/admin/tours/:id/toggle`

### 4.4 Admin — Bookings & Assignment
- [ ] `use-cases/list-bookings.usecase.ts` (admin, all bookings)
- [ ] `use-cases/assign-booking.usecase.ts` — set driver, `pending → assigned`, call `notifyDriver()`, create `driver_assigned` notification
- [ ] `GET /api/admin/bookings`, `GET /api/admin/bookings/:id`
- [ ] `PUT /api/admin/bookings/:id/assign`

### 4.5 Admin — Payments
- [ ] `use-cases/list-payments.usecase.ts`
- [ ] `use-cases/verify-payment.usecase.ts` — set `verified`, `verified_by`, `verified_at`; create `payment_verified` notification + send email
- [ ] `use-cases/reject-payment.usecase.ts`
- [ ] `GET /api/admin/payments`, `GET /api/admin/payments/:id`
- [ ] `PUT /api/admin/payments/:id/verify`, `PUT /api/admin/payments/:id/reject`

### 4.6 Admin — Complaints & Assistance
- [ ] `use-cases/list-complaints.usecase.ts`
- [ ] `use-cases/reply-complaint.usecase.ts` — set `admin_reply`, status → `replied`, create `complaint_replied` notification
- [ ] Admin CRUD for `assistance/` module
- [ ] `GET /api/admin/complaints`, `PUT /api/admin/complaints/:id/reply`
- [ ] `POST|PUT|DELETE /api/admin/assistance/:id`

### 4.7 Admin — Dashboard
- [ ] `use-cases/get-dashboard-stats.usecase.ts` — revenue, completed trips, pending bookings, open complaints
- [ ] `GET /api/admin/dashboard`

---

## Phase 5 — Payments, Reviews, Notifications & DevOps

**Goal:** Complete the payment/feedback loop and harden for production.
**Refs:** `../docs/features/payment/`, `../docs/features/reviews-complaints/`, `../docs/features/notifications/`

### 5.1 Payments Module (`src/modules/payments/`)
- [ ] `use-cases/upload-proof.usecase.ts` — multer in-memory → Cloudinary → store `secure_url`, status → `pending_verification`
- [ ] `use-cases/get-payment.usecase.ts`
- [ ] `POST /api/payments/:booking_id/upload-proof`, `GET /api/payments/:booking_id`

### 5.2 Reviews Module (`src/modules/reviews/`)
- [ ] `use-cases/create-review.usecase.ts` — booking must be `completed`; recalculate `drivers.rating` as AVG
- [ ] `POST /api/reviews`

### 5.3 Complaints Module (`src/modules/complaints/`)
- [ ] `use-cases/create-complaint.usecase.ts`
- [ ] `use-cases/list-my-complaints.usecase.ts`
- [ ] `POST /api/complaints`, `GET /api/complaints/my`

### 5.4 Notifications Module (`src/modules/notifications/`)
- [ ] `use-cases/list-notifications.usecase.ts`
- [ ] `use-cases/mark-read.usecase.ts`
- [ ] `use-cases/mark-all-read.usecase.ts`
- [ ] `GET /api/notifications`, `PUT /api/notifications/:id/read`, `PUT /api/notifications/read-all`

### 5.5 Email (`src/lib/resend.ts`)
- [ ] Resend client config
- [ ] `src/lib/email-templates/` — `booking-confirmation.ts`, `payment-receipt.ts`
- [ ] Wire into `create-booking.usecase.ts` and `verify-payment.usecase.ts` (fire-and-forget)

### 5.6 Production Hardening
- [ ] Sentry integration (`@sentry/node`) in `src/app.ts`
- [ ] `Dockerfile` + `.dockerignore`
- [ ] `.github/workflows/ci.yml` — lint + test on PR
- [ ] `prisma/seed.ts` — seed admin user + sample data

---

## Legend

| Symbol | Meaning |
|---|---|
| 🔴 | Not started |
| 🟡 | In progress |
| 🟢 | Complete |
