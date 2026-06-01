# Phase 3 — Driver Features: Requirements

## Scope

Implement all driver-facing endpoints and the Telegram bot integration:

**3.1 Driver Profile**
- `GET /api/driver/profile` — own profile
- `PUT /api/driver/profile` — update name, phone, languages, photo (Cloudinary)
- `PUT /api/driver/availability` — toggle `is_available`
- `GET /api/driver/earnings` — earnings summary + per-booking list
- `GET /api/driver/reviews` — reviews received

**3.2 Booking Transitions (Driver)**
- `GET /api/driver/bookings` — assigned/active bookings for this driver
- `PUT /api/driver/bookings/:id/accept` — `assigned → accepted`
- `PUT /api/driver/bookings/:id/reject` — `assigned → rejected`
- `PUT /api/driver/bookings/:id/arrived` — `accepted → driver_arrived`
- `PUT /api/driver/bookings/:id/start` — `driver_arrived → in_progress`
- `PUT /api/driver/bookings/:id/complete` — `in_progress → completed`

**3.3 Telegram Bot**
- `POST /api/driver/telegram/generate-code` — 6-digit code, 10 min TTL
- `POST /api/telegram/webhook` — handles `/link <code>`, `accept:<id>`, `reject:<id>` callbacks

Out of scope: driver record creation (admin does this in Phase 4), payment, reviews creation, notifications module.

## Decisions

**Driver record existence:** Admin creates driver rows (Phase 4). Phase 3 assumes the driver row already exists and is linked to `req.user.id`. `GET /api/driver/profile` returns 404 if no driver row found for the authenticated user.

**Photo upload:** `PUT /api/driver/profile` uses multer in-memory → Cloudinary. Returns `secure_url` stored in `drivers.profile_photo`. No local disk storage.

**Booking transitions reuse:** All transitions call `TransitionBookingUseCase` (defined in Phase 2 bookings module). Driver-specific use cases wrap it with ownership + role checks — they do not duplicate the state machine.

**Ownership on transitions:** Driver can only act on bookings where `driver_id = req.user.driverId`. Returns 403 if booking belongs to another driver.

**Telegram linking:** `generate-code` creates a row in `telegram_link_codes` (6-digit code, `expires_at = now + 10 min`, `driver_id`). The `/link <code>` bot command looks up the code, sets `drivers.telegram_chat_id`, deletes the code row. Expired or unknown codes reply with an error message.

**Telegram Accept/Reject:** `callback_query` data format: `accept:<bookingId>` / `reject:<bookingId>`. Bot handler calls the same accept/reject use cases as the HTTP endpoints. Responds with an edited message on success.

**Earnings:** Aggregated from `driver_earnings` table — `SUM(amount)` as `total_earnings`, count of completed bookings, current `drivers.rating` as `average_rating`, plus the raw earnings rows.

**Driver bookings list:** Returns bookings where `driver_id = req.user.driverId` and status is not `cancelled` or `completed`. Supports `?status=` filter.

## Context

- Architecture: Vertical Slice + OOP Use-Case pattern
- All protected routes: `verifyClerkToken` + `requireRole('driver')`
- `TransitionBookingUseCase` imported from `src/modules/bookings/use-cases/`
- grammY bot instance lives in `src/bot/index.ts`; `notifyDriver()` in `src/bot/notify.ts` (used by Phase 4 admin assignment — wired here as the bot infrastructure)
- Refs: `../docs/features/driver-management/`, `../docs/features/booking/`, `../docs/features/telegram-bot/`
