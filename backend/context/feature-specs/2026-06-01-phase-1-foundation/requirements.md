# Phase 1 — Foundation: Requirements

## Scope

Complete the remaining Phase 1 items so the server is fully runnable with auth, Prisma, Zod middleware, error handling, and Swagger wired up.

## What's Already Done

- Node.js + TypeScript project initialized
- Core deps: express, cors, helmet, express-rate-limit, pino, pino-http, tsx
- `src/app.ts` — Express app with cors, helmet, rate-limit, pino-http
- `src/lib/logger.ts` — Pino instance
- `GET /health` working

## What This Phase Builds

### 1. Install remaining dependencies
- Runtime: `@clerk/backend prisma @prisma/client zod cloudinary multer grammy resend swagger-jsdoc swagger-ui-express @sentry/node`
- Dev: `vitest supertest @types/supertest @types/multer`

### 2. Clean up old structure
- Delete `src/controllers/`, `src/routes/`, `src/validators/` (non-vertical-slice layout)
- Keep `src/lib/logger.ts`, `src/app.ts`, `src/index.ts`

### 3. Shared infrastructure
- `src/lib/prisma.ts` — PrismaClient singleton
- `src/lib/cloudinary.ts` — Cloudinary client config
- `src/types/express.d.ts` — augment `req.user: { id, clerkId, role }`
- `src/middleware/validate.ts` — `validateRequest(schema)` Zod factory
- `src/middleware/auth.ts` — `verifyClerkToken` → attaches `req.user`
- `src/middleware/role.ts` — `requireRole(...roles)` guard
- `src/middleware/error.ts` — centralized error handler (last middleware)

### 4. Prisma schema
All tables from `../../../../docs/product/DATABASE.md`:
- `users`, `drivers`, `taxis`, `route_packages`, `tour_packages`
- `bookings`, `booking_status_history`, `payments`
- `reviews`, `complaints`, `notifications`, `driver_earnings`
- `telegram_link_codes` (included now for Phase 3 readiness)

### 5. App wiring
- Update `src/app.ts` — register module routers under `/api`, add `errorHandler` last
- `src/swagger/` — Swagger config, expose at `/api/docs`

### 6. Seed
- `prisma/seed.ts` — seed admin user

## Key Decisions

| Decision | Rationale |
|---|---|
| `telegram_link_codes` included in initial migration | Avoids schema change mid-Phase 3 |
| Old `src/controllers/`, `src/routes/`, `src/validators/` deleted | Vertical slice architecture requires modules-based layout |
| `.env` setup steps included | Credentials not yet configured |
| Multer in-memory (no disk) | Images go to Cloudinary, never stored locally |

## Constraints (from mission.md)

- Every request body validated with Zod before reaching controller
- Every protected route through `verifyClerkToken` + `requireRole`
- Images to Cloudinary — never stored locally
- Logging via Pino on every request
- Express 5 — no `asyncHandler` needed
