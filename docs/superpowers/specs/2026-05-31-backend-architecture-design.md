# Backend Architecture Design

**Date:** 2026-05-31  
**Scope:** Express backend for TaxiTrio — foundational architecture and `users` module as canonical pattern  
**Status:** Approved

---

## 1. Architecture

**Paradigm:** Vertical Slice + OOP Use-Case Pattern  
**Framework:** Express 5 (async errors propagate automatically — no `asyncHandler` needed)  
**Language:** TypeScript strict mode  
**DB:** Supabase (PostgreSQL) via Prisma ORM  
**Auth:** Clerk (`@clerk/backend`) — JWT verified in middleware, role read from `publicMetadata.role`  
**Validation:** Zod — all request bodies validated before reaching controllers  
**Logging:** Pino (structured JSON)

---

## 2. Folder Structure

```
backend/src/
├── app.ts                        # Express setup, middleware, router registration
├── index.ts                      # Server listen (unchanged)
├── lib/
│   ├── prisma.ts                 # PrismaClient singleton
│   ├── logger.ts                 # Pino instance (exists)
│   └── cloudinary.ts             # Cloudinary client
├── middleware/
│   ├── auth.ts                   # verifyClerkToken → attaches req.user
│   ├── role.ts                   # requireRole(...roles) guard
│   ├── error.ts                  # Centralized error handler (last middleware)
│   └── validate.ts               # validateRequest(schema) factory
├── types/
│   └── express.d.ts              # Augments Express.Request with req.user
├── modules/
│   ├── users/
│   │   ├── user.schema.ts        # Zod schemas + inferred DTOs
│   │   ├── user.controller.ts    # Class — HTTP only, no business logic
│   │   ├── user.routes.ts        # Router + DI wiring
│   │   ├── use-cases/
│   │   │   ├── create-user.usecase.ts
│   │   │   └── index.ts          # Barrel export
│   │   └── index.ts              # Barrel export (exports router)
│   ├── bookings/                 # Same pattern
│   ├── drivers/
│   ├── taxis/
│   ├── routes/                   # route_packages domain
│   ├── tours/
│   ├── payments/
│   ├── reviews/
│   ├── complaints/
│   ├── notifications/
│   └── assistance/
└── bot/
    ├── index.ts                  # grammY bot instance
    └── notify.ts                 # notifyDriver()
```

---

## 3. Request Lifecycle

```
Request
  → auth middleware        (verifyClerkToken → attaches req.user)
  → role middleware        (requireRole guard — 403 if unauthorized)
  → validateRequest(schema)(Zod parse — 400 on ZodError)
  → Controller.method      (extracts validated data, calls use case)
  → UseCase.execute(dto)   (all business logic — throws on error)
  → Prisma                 (DB query)
  → res.json(result)
  → [on throw] Express 5 → errorHandler → { error: message }
```

---

## 4. Layer Contracts

### Routes (`[feature].routes.ts`)
- Instantiates `new UseCase(prisma)` and `new Controller(useCase)`
- Registers middleware chain and delegates to controller via arrow function: `(req, res) => controller.method(req, res)`
- No logic of any kind

### Controller (`[feature].controller.ts`)
- Class with `constructor(private readonly useCase: UseCase)`
- Reads `req.body` / `req.params` / `req.user`, calls `useCase.execute()`, writes `res`
- No business logic — no DB calls, no conditionals on domain state

### Use Case (`use-cases/[action].usecase.ts`)
- Class with `constructor(private readonly prisma: PrismaClient)`
- Exposes exactly one public method: `execute(dto: Dto): Promise<Result>`
- All business logic lives here — validation of domain rules, state checks, DB writes
- No knowledge of `req` or `res`
- Throws errors with `statusCode` property for HTTP mapping

### Schema (`[feature].schema.ts`)
- Zod schemas for all incoming payloads
- Exports inferred TypeScript types as DTOs (e.g., `export type CreateUserDto = z.infer<typeof CreateUserSchema>`)

### Barrel Exports (`index.ts`)
- Every directory exports all public members
- Consumers import from the directory, never from deep paths

---

## 5. Error Handling

Use cases throw plain errors with a `statusCode` property:

```ts
const err = Object.assign(new Error('User already exists'), { statusCode: 409 })
throw err
```

The centralized `errorHandler` middleware:
- Reads `err.statusCode` (defaults to 500)
- Logs via Pino
- Returns `{ error: err.message }`

---

## 6. `this` Context

Controllers are passed to routes via arrow functions to preserve `this`:

```ts
router.post('/', validateRequest(CreateUserSchema), (req, res) => controller.create(req, res))
```

---

## 7. Shared Infrastructure Files

| File | Responsibility |
|---|---|
| `lib/prisma.ts` | Exports single `PrismaClient` instance |
| `lib/logger.ts` | Exports Pino logger (already exists) |
| `lib/cloudinary.ts` | Exports configured Cloudinary instance |
| `middleware/validate.ts` | `validateRequest(schema)` — generic Zod middleware factory |
| `middleware/auth.ts` | `verifyClerkToken` — verifies JWT, attaches `req.user` |
| `middleware/role.ts` | `requireRole(...roles)` — 403 if `req.user.role` not in list |
| `middleware/error.ts` | `errorHandler(err, req, res, next)` — last middleware in `app.ts` |
| `types/express.d.ts` | Augments `Express.Request` with `user: { id, clerkId, role }` |

---

## 8. `users` Module — Canonical Example

Demonstrates the full pattern. All other modules follow identically.

**`user.schema.ts`**
- `CreateUserSchema`: `{ clerkId: string, name: string, email: string, role: enum }`
- Exports `CreateUserDto` inferred type

**`use-cases/create-user.usecase.ts`**
- Checks for existing user by `clerkId` — throws 409 if found
- Creates and returns the new user via Prisma

**`user.controller.ts`**
- `create(req, res)`: calls `this.createUser.execute(req.body)`, returns `201` with user

**`user.routes.ts`**
- `POST /api/users` — `validateRequest(CreateUserSchema)` → `controller.create`

---

## 9. `app.ts` Changes

- Keep existing `routes/health` as-is (simple ping, no business logic, no use-case pattern needed)
- Import and mount all module routers under `/api`
- Register `errorHandler` as the last `app.use()`

---

## 10. Decisions Log

| Decision | Rationale |
|---|---|
| Vertical slices over flat MVC | Scales better as feature count grows; each domain is self-contained |
| No `asyncHandler` | Express 5 propagates async errors natively |
| Arrow functions for `this` binding | Simpler than `.bind()`, explicit at the call site |
| `statusCode` on Error objects | Minimal overhead, no custom error class hierarchy needed for V1 |
| Prisma injected via constructor | Enables unit testing without mocking module-level imports |
