# Phase 3 — Driver Features: Validation

## Merge Criteria

All of the following must be true before this branch can be merged to `main`.

### TypeScript
- [ ] `npx tsc --noEmit` passes with zero errors

### Tests
- [ ] All existing Phase 1 + Phase 2 tests still pass (`npm test`)
- [ ] `GetDriverProfileUseCase` — returns 404 when no driver row exists for user
- [ ] `ToggleAvailabilityUseCase` — returns updated driver with new `is_available` value
- [ ] `AcceptBookingUseCase` — returns 403 when booking belongs to a different driver
- [ ] `AcceptBookingUseCase` — returns 400 when booking is not in `assigned` status
- [ ] `CompleteBookingUseCase` — happy path: status transitions to `completed`, history row written
- [ ] `GenerateTelegramCodeUseCase` — code is exactly 6 digits, `expires_at` is ~10 min from now

### Endpoint Smoke Checks (manual or supertest)
- [ ] `GET /api/driver/profile` — 200 with driver object; 401 without token; 404 if no driver row
- [ ] `PUT /api/driver/profile` — 200 with updated profile; photo upload stores Cloudinary URL
- [ ] `PUT /api/driver/availability` — 200 with `{ is_available: true/false }`; 400 on missing field
- [ ] `GET /api/driver/earnings` — 200 with `{ total_earnings, completed_trips, average_rating, earnings[] }`
- [ ] `GET /api/driver/reviews` — 200 array; empty array when no reviews
- [ ] `GET /api/driver/bookings` — 200 paginated list; `?status=accepted` filters correctly
- [ ] `PUT /api/driver/bookings/:id/accept` — 200 on assigned booking; 400 on wrong status; 403 on wrong driver
- [ ] `PUT /api/driver/bookings/:id/reject` — same guards as accept
- [ ] `PUT /api/driver/bookings/:id/arrived` — 200 on accepted booking
- [ ] `PUT /api/driver/bookings/:id/start` — 200 on driver_arrived booking
- [ ] `PUT /api/driver/bookings/:id/complete` — 200 on in_progress booking
- [ ] `POST /api/driver/telegram/generate-code` — 200 with `{ code, expires_at, bot_link }`; 401 without token
- [ ] `POST /api/telegram/webhook` — 200 on valid update; `/link <code>` sets `telegram_chat_id`; expired code replies with error

### Code Quality
- [ ] No business logic in controllers
- [ ] No Prisma calls outside use cases
- [ ] All transition use cases delegate to `TransitionBookingUseCase` — no duplicated state machine logic
- [ ] `src/bot/index.ts` and `src/bot/notify.ts` exist and export correctly
- [ ] All new modules have barrel `index.ts` exports
- [ ] No `any` types introduced
