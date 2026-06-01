# Phase 2 — Core Customer Features: Requirements

## Scope

Implement all customer-facing read/write endpoints for Phase 2 of the roadmap:
- Users module (`POST /api/users`, `GET /api/auth/me`)
- Routes module (`GET /api/routes`, `GET /api/routes/:id`)
- Tours module (`GET /api/tours`, `GET /api/tours/:id`)
- Taxis module (`GET /api/taxis`)
- Bookings module (`POST /api/bookings`, `GET /api/bookings/my`, `GET /api/bookings/:id`, `PUT /api/bookings/:id/cancel`)
- Assistance module (`GET /api/assistance`)

Out of scope for this phase: admin CRUD, driver actions, payments, reviews, complaints, notifications.

## Decisions

**User creation flow:** Separate `POST /api/users` registration step — frontend calls this after Clerk sign-up. `GET /api/auth/me` returns 404 if user not yet registered (no auto-upsert). Rationale: explicit creation is auditable and avoids silent side effects on read.

**State machine location:** `transition-booking.usecase.ts` lives inside `src/modules/bookings/use-cases/`. Driver and admin modules will import it from there in later phases. No shared lib needed until a third module requires it.

**Public vs protected endpoints:**
- `GET /api/routes`, `GET /api/tours`, `GET /api/taxis`, `GET /api/assistance` — public (no auth required)
- `POST /api/users` — requires `verifyClerkToken` (clerkId comes from `req.user.clerkId`)
- `GET /api/auth/me` — requires `verifyClerkToken`
- All booking endpoints — requires `verifyClerkToken` + `requireRole('customer')`

**Booking type validation:** `CreateBookingSchema` must enforce that `packageId` is present for `route`/`tour` types, and `taxiId` is present for `taxi` type. Use Zod `.superRefine()` for cross-field validation.

**Pagination:** `GET /api/bookings/my` accepts `?page=1&limit=10` query params. Default: page 1, limit 10.

**Ownership check:** `GET /api/bookings/:id` returns 403 (not 404) if the booking exists but belongs to another user. This prevents enumeration.

## Context

- Architecture: Vertical Slice + OOP Use-Case pattern (see `code-standards.md`)
- All request bodies validated with Zod before reaching controller
- No try/catch in controllers — Express 5 propagates async errors to `middleware/error.ts`
- Prisma client injected via constructor — never instantiated inside use cases
- Public endpoints return only `is_active = true` records (routes, tours, taxis, assistance)
- Booking status machine: `PENDING → ASSIGNED → ACCEPTED → DRIVER_ARRIVED → IN_PROGRESS → COMPLETED`; cancel only valid from `PENDING`
- Every status change writes a row to `booking_status_history`
- Refs: `../docs/features/authentication/`, `../docs/features/route-tour-packages/`, `../docs/features/taxis/`, `../docs/features/booking/`, `../docs/features/tourist-assistance/`
