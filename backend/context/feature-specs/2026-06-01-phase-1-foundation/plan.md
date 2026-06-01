# Phase 1 — Foundation: Plan

## Group 1 — Dependencies (1.1)

1. Install runtime deps: `@clerk/backend prisma @prisma/client zod cloudinary multer grammy resend swagger-jsdoc swagger-ui-express @sentry/node`
2. Install dev deps: `vitest supertest @types/supertest @types/multer`
3. Delete old non-vertical-slice dirs: `src/controllers/`, `src/routes/`, `src/validators/`

## Group 2 — Shared Infrastructure (1.2)

4. `src/lib/prisma.ts` — PrismaClient singleton
5. `src/lib/cloudinary.ts` — Cloudinary client config (reads `CLOUDINARY_*` env vars)
6. `src/types/express.d.ts` — augment `req.user: { id: string; clerkId: string; role: string }`
7. `src/middleware/validate.ts` — `validateRequest(schema)` Zod factory; returns `400` with `{ error, details }` on failure
8. `src/middleware/auth.ts` — `verifyClerkToken`; reads Bearer token, verifies with `@clerk/backend`, attaches `req.user`; returns `401` on failure
9. `src/middleware/role.ts` — `requireRole(...roles)`; returns `403` if `req.user.role` not in list
10. `src/middleware/error.ts` — centralized error handler; uses `err.statusCode` if present, else `500`

## Group 3 — Prisma Schema (1.3)

11. Write `prisma/schema.prisma` — all tables: `users`, `drivers`, `taxis`, `route_packages`, `tour_packages`, `bookings`, `booking_status_history`, `payments`, `reviews`, `complaints`, `notifications`, `driver_earnings`, `telegram_link_codes`
12. Set `DATABASE_URL` in `.env` (Supabase connection string)
13. Run `npx prisma migrate dev --name init`
14. Write `prisma/seed.ts` — create admin user
15. Run `npx prisma db seed`

## Group 4 — App Wiring (1.4)

16. Update `src/app.ts` — register module routers under `/api`, mount `errorHandler` last
17. Create `src/swagger/index.ts` — Swagger JSDoc config
18. Mount Swagger UI at `/api/docs` in `src/app.ts`
19. Smoke-test: `GET /health` → 200, `GET /api/docs` → Swagger UI renders
20. Run `npm test` — all middleware unit tests pass
