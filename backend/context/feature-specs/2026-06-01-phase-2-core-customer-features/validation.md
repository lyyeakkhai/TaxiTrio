# Phase 2 — Core Customer Features: Validation

## Merge Criteria

All of the following must be true before this branch can be merged to `main`.

### TypeScript
- [ ] `npx tsc --noEmit` passes with zero errors

### Tests
- [ ] All existing Phase 1 tests still pass (`npm test`)
- [ ] `CreateUserUseCase` — duplicate clerkId returns 409
- [ ] `GetMeUseCase` — unknown clerkId returns 404
- [ ] `TransitionBookingUseCase` — valid transitions succeed; invalid transitions throw 400
- [ ] `CancelBookingUseCase` — cancels a `pending` booking; throws 400 on non-pending booking
- [ ] `GET /api/auth/me` — 200 with user object; 404 when user not in DB

### Endpoint Smoke Checks (manual or supertest)
- [ ] `POST /api/users` — 201 on valid body; 409 on duplicate clerkId; 400 on invalid body
- [ ] `GET /api/auth/me` — 200 with `{ id, clerkId, email, role, ... }`; 401 without token
- [ ] `GET /api/routes` — 200 array (only active); no auth required
- [ ] `GET /api/routes/:id` — 200 with full record; 404 on unknown id
- [ ] `GET /api/tours` — same as routes
- [ ] `GET /api/taxis` — 200 array with driver info joined; no auth required
- [ ] `POST /api/bookings` — 201 with booking + first status history; 400 on invalid type/missing refs
- [ ] `GET /api/bookings/my` — 200 paginated list; 401 without token
- [ ] `GET /api/bookings/:id` — 200 with status history; 403 if not owner
- [ ] `PUT /api/bookings/:id/cancel` — 200 on pending booking; 400 on non-pending booking
- [ ] `GET /api/assistance` — 200 array (only active); no auth required

### Code Quality
- [ ] No business logic in controllers (only `req.*` reads + use case calls)
- [ ] No Prisma calls outside use cases
- [ ] All modules have barrel `index.ts` exports
- [ ] All 6 module routers registered in `src/app.ts`
- [ ] No `any` types introduced
