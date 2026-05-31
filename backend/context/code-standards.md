# Backend Code Standards

Architecture: Vertical Slice + OOP Use-Case Pattern.
Full spec: `../docs/superpowers/specs/2026-05-31-backend-architecture-design.md`

---

## Class Structure

Every class uses TypeScript access modifiers strictly.

```ts
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CreateUserDto): Promise<User> {
    // business logic only
  }
}
```

Rules:
- Injected dependencies: `private readonly`
- Public API: only `execute()` on use cases, named HTTP methods on controllers
- No `public` keyword needed (it's the default) — only write it when it aids clarity

---

## Use Cases

One class per business action. One public method: `execute()`.

```ts
// use-cases/create-user.usecase.ts
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existing = await this.prisma.user.findUnique({ where: { clerkId: dto.clerkId } })
    if (existing) throw Object.assign(new Error('User already exists'), { statusCode: 409 })
    return this.prisma.user.create({ data: dto })
  }
}
```

Rules:
- No `req`, `res`, or `next` — use cases have zero HTTP knowledge
- Throw errors with `statusCode` property for HTTP mapping
- No hardcoded `PrismaClient` — always injected via constructor
- Single Responsibility: one action per class, not one class per domain

---

## Controllers

HTTP layer only. No business logic.

```ts
export class UserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  async create(req: Request, res: Response): Promise<void> {
    const user = await this.createUser.execute(req.body)
    res.status(201).json(user)
  }
}
```

Rules:
- Only reads `req.body`, `req.params`, `req.query`, `req.user`
- Only calls use cases — no Prisma, no business conditionals
- No try/catch — Express 5 propagates async errors automatically
- Returns `void`; writes response via `res`

---

## Routes (DI Wiring)

```ts
// user.routes.ts
import { Router } from 'express'
import { prisma } from '../../lib/prisma'
import { validateRequest } from '../../middleware/validate'
import { CreateUserUseCase } from './use-cases'
import { UserController } from './user.controller'
import { CreateUserSchema } from './user.schema'

const router = Router()
const createUser = new CreateUserUseCase(prisma)
const controller = new UserController(createUser)

router.post('/', validateRequest(CreateUserSchema), (req, res) => controller.create(req, res))

export default router
```

Rules:
- Always use arrow functions `(req, res) => controller.method(req, res)` — never `.bind()`
- Instantiate use cases and controllers at module load time (top of file)
- No logic in routes — only middleware chain + controller delegation

---

## Error Handling

```ts
// Throw from use cases:
throw Object.assign(new Error('Not found'), { statusCode: 404 })

// Centralized handler in middleware/error.ts catches all:
// err.statusCode → HTTP status (default 500)
// err.message → response body { error: message }
```

Never catch errors in controllers. Let them propagate to `middleware/error.ts`.

---

## Validation

```ts
// middleware/validate.ts
export const validateRequest = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return next(Object.assign(new Error('Validation failed'), { statusCode: 400, details: result.error.flatten() }))
    }
    req.body = result.data
    next()
  }
```

Rules:
- All request bodies validated before reaching the controller
- Zod schema inferred types are the DTOs — no separate interface needed
- Params and query strings validated inline in the use case if needed

---

## TypeScript

- Strict mode enabled — no `any`, no `as any`
- Use `z.infer<typeof Schema>` as DTOs — don't duplicate type definitions
- Use interfaces for DI contracts when a use case could have multiple implementations
- Avoid type assertions (`as X`) — fix the type instead

---

## Barrel Exports

Every directory has `index.ts`:

```ts
// modules/users/use-cases/index.ts
export { CreateUserUseCase } from './create-user.usecase'
export { GetMeUseCase } from './get-me.usecase'

// modules/users/index.ts
export { default } from './user.routes'
```

Import from the directory, never from deep paths:
```ts
// Good
import { CreateUserUseCase } from './use-cases'

// Bad
import { CreateUserUseCase } from './use-cases/create-user.usecase'
```

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Use case class | `PascalCase` + `UseCase` suffix | `CreateBookingUseCase` |
| Use case file | `kebab-case.usecase.ts` | `create-booking.usecase.ts` |
| Controller class | `PascalCase` + `Controller` suffix | `BookingController` |
| Schema | `PascalCase` + `Schema` suffix | `CreateBookingSchema` |
| DTO type | `PascalCase` + `Dto` suffix | `CreateBookingDto` |
| Route file | `kebab-case.routes.ts` | `booking.routes.ts` |

---

## Logging

Use the Pino logger — never `console.log`.

```ts
import { logger } from '../../lib/logger'

logger.info({ userId }, 'User created')
logger.error({ err }, 'Unexpected error')
```
