# Phase 3 — Driver Features: Plan

## Group 1 — Driver Profile Module (`src/modules/drivers/`)

1. `src/modules/drivers/driver.schema.ts` — `UpdateDriverProfileSchema` (name?, phone?, languages?), `ToggleAvailabilitySchema` (is_available: boolean)
2. `src/modules/drivers/use-cases/get-driver-profile.usecase.ts` — fetch by `userId`, throw 404 if not found
3. `src/modules/drivers/use-cases/update-driver-profile.usecase.ts` — optional photo upload → Cloudinary → update driver row
4. `src/modules/drivers/use-cases/toggle-availability.usecase.ts` — set `is_available`, return updated driver
5. `src/modules/drivers/use-cases/get-earnings.usecase.ts` — aggregate from `driver_earnings` + `drivers.rating`
6. `src/modules/drivers/use-cases/get-driver-reviews.usecase.ts` — reviews where `driver_id = driverId`
7. `src/modules/drivers/driver.controller.ts` — `getProfile`, `updateProfile`, `toggleAvailability`, `getEarnings`, `getReviews`
8. `src/modules/drivers/driver.routes.ts` — DI wiring; all routes require `verifyClerkToken` + `requireRole('driver')`
9. Barrel exports: `use-cases/index.ts`, `index.ts`

## Group 2 — Driver Booking Transitions (`src/modules/drivers/`)

10. `src/modules/drivers/use-cases/list-driver-bookings.usecase.ts` — bookings by `driverId`, optional `?status=` filter
11. `src/modules/drivers/use-cases/accept-booking.usecase.ts` — ownership check → `TransitionBookingUseCase(assigned → accepted)`
12. `src/modules/drivers/use-cases/reject-booking.usecase.ts` — ownership check → `TransitionBookingUseCase(assigned → rejected)`
13. `src/modules/drivers/use-cases/arrived-booking.usecase.ts` — ownership check → `TransitionBookingUseCase(accepted → driver_arrived)`
14. `src/modules/drivers/use-cases/start-booking.usecase.ts` — ownership check → `TransitionBookingUseCase(driver_arrived → in_progress)`
15. `src/modules/drivers/use-cases/complete-booking.usecase.ts` — ownership check → `TransitionBookingUseCase(in_progress → completed)`
16. Add to `driver.controller.ts`: `listBookings`, `acceptBooking`, `rejectBooking`, `arrivedBooking`, `startBooking`, `completeBooking`
17. Add to `driver.routes.ts`: `GET /api/driver/bookings`, `PUT /api/driver/bookings/:id/accept|reject|arrived|start|complete`

## Group 3 — Telegram Bot Infrastructure (`src/bot/`)

18. `src/bot/index.ts` — grammY `Bot` instance, export `bot`
19. `src/bot/notify.ts` — `notifyDriver(chatId, booking)` — sends message with Accept/Reject inline keyboard
20. `src/modules/drivers/use-cases/generate-telegram-code.usecase.ts` — generate 6-digit code, upsert `telegram_link_codes` row with `expires_at = now + 10 min`
21. `src/modules/telegram/telegram.controller.ts` — `generateCode`, `handleWebhook`
22. `src/modules/telegram/telegram.routes.ts` — `POST /api/driver/telegram/generate-code` (auth + driver), `POST /api/telegram/webhook` (public)
23. Webhook handler logic (inside controller or dedicated handler file):
    - `/link <code>` → validate code, set `drivers.telegram_chat_id`, delete code row
    - `callback_query accept:<id>` → call `AcceptBookingUseCase`
    - `callback_query reject:<id>` → call `RejectBookingUseCase`
24. Register `telegramRouter` in `src/app.ts`
25. Barrel exports for `src/modules/telegram/`

## Group 4 — Tests

26. Unit tests:
    - `GetDriverProfileUseCase` — 404 when no driver row
    - `ToggleAvailabilityUseCase` — returns updated `is_available`
    - `AcceptBookingUseCase` — 403 on wrong driver; 400 on invalid transition
    - `CompleteBookingUseCase` — happy path writes status history
    - `GenerateTelegramCodeUseCase` — code is 6 digits, expires in 10 min
