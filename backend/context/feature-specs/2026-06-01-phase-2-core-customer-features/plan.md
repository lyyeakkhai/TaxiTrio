# Phase 2 — Core Customer Features: Plan

## Group 1 — Users Module

1. `src/modules/users/user.schema.ts` — `CreateUserSchema` (clerkId, email, name, phone?, role), `UpdateUserSchema` (name, phone)
2. `src/modules/users/use-cases/create-user.usecase.ts` — check duplicate `clerkId` → 409, create user
3. `src/modules/users/use-cases/get-me.usecase.ts` — fetch by `clerkId`, throw 404 if not found
4. `src/modules/users/user.controller.ts` — `create(req, res)`, `getMe(req, res)`
5. `src/modules/users/user.routes.ts` — DI wiring; `POST /api/users` (auth + customer), `GET /api/auth/me` (auth)
6. Barrel exports: `use-cases/index.ts`, `index.ts`

## Group 2 — Routes & Tours Modules

7. `src/modules/routes/route.schema.ts` — no body schemas needed (read-only for customers)
8. `src/modules/routes/use-cases/list-routes.usecase.ts` — `where: { isActive: true }`
9. `src/modules/routes/use-cases/get-route.usecase.ts` — by id, throw 404 if not found or inactive
10. `src/modules/routes/route.controller.ts`, `route.routes.ts` — `GET /api/routes`, `GET /api/routes/:id`
11. Mirror pattern for `src/modules/tours/` — `GET /api/tours`, `GET /api/tours/:id`
12. Barrel exports for both modules

## Group 3 — Taxis Module

13. `src/modules/taxis/use-cases/list-taxis.usecase.ts` — active taxis with joined driver info
14. `src/modules/taxis/taxi.controller.ts`, `taxi.routes.ts` — `GET /api/taxis`
15. Barrel exports

## Group 4 — Bookings Module

16. `src/modules/bookings/booking.schema.ts` — `CreateBookingSchema` (type, packageId?, taxiId?, scheduledAt, notes?)
17. `src/modules/bookings/use-cases/transition-booking.usecase.ts` — shared state machine; throws 400 on invalid transition
18. `src/modules/bookings/use-cases/create-booking.usecase.ts` — validate refs, create booking + first status history entry (`pending`)
19. `src/modules/bookings/use-cases/list-my-bookings.usecase.ts` — by `userId`, paginated
20. `src/modules/bookings/use-cases/get-booking.usecase.ts` — includes status history; 403 if not owner
21. `src/modules/bookings/use-cases/cancel-booking.usecase.ts` — calls `transition(pending → cancelled)`
22. `src/modules/bookings/booking.controller.ts`, `booking.routes.ts` — `POST /api/bookings`, `GET /api/bookings/my`, `GET /api/bookings/:id`, `PUT /api/bookings/:id/cancel`
23. Barrel exports

## Group 5 — Assistance Module & App Wiring

24. `src/modules/assistance/use-cases/list-assistance.usecase.ts` — `where: { isActive: true }`
25. `src/modules/assistance/assistance.controller.ts`, `assistance.routes.ts` — `GET /api/assistance`
26. Register all 6 module routers in `src/app.ts` under `/api`
27. Write unit tests for: `CreateUserUseCase`, `TransitionBookingUseCase` (valid + invalid transitions), `CancelBookingUseCase`, `GET /api/auth/me` (200 + 404)
