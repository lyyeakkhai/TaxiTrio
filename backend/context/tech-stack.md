# Backend Tech Stack

## Core

| Tool | Version | Purpose |
|---|---|---|
| Node.js | >= 18 | Runtime |
| TypeScript | ^5 | Language |
| Express.js | ^4 | HTTP framework |

## Auth

| Tool | Purpose |
|---|---|
| `@clerk/backend` | Verify Clerk session tokens, read `publicMetadata.role` |

## Database

| Tool | Purpose |
|---|---|
| Supabase | Managed PostgreSQL host |
| Prisma | ORM — type-safe queries, migrations |

## Validation

| Tool | Purpose |
|---|---|
| Zod | Validate all incoming request bodies and params |

## Security & Middleware

| Tool | Purpose |
|---|---|
| `cors` | Allow Next.js frontend origin |
| `helmet` | Secure HTTP headers |
| `express-rate-limit` | Brute-force and DDoS protection |

## File / Media

| Tool | Purpose |
|---|---|
| `multer` | Parse multipart/form-data (in-memory, not disk) |
| `cloudinary` | Upload and store images — driver photos, payment proofs |

## Notifications

| Tool | Purpose |
|---|---|
| `grammy` | Telegram bot — notify drivers on booking assignment |
| `resend` | Email — booking confirmation and payment receipt to customers |

## Logging & Docs

| Tool | Purpose |
|---|---|
| `pino` + `pino-http` | Structured JSON request logging |
| `swagger-jsdoc` + `swagger-ui-express` | Auto-generated API docs at `/api/docs` |

## Testing

| Tool | Purpose |
|---|---|
| Vitest | Unit and integration tests |
| Supertest | HTTP endpoint testing |

## DevOps

| Tool | Purpose |
|---|---|
| Docker | Containerize the Express server |
| ESLint + Prettier | Code quality and formatting |
| GitHub Actions | CI — lint, test, build on every PR |
| Sentry | Error tracking and crash reporting |

## Folder Structure

```
backend/
├── context/              # AI context files (this folder)
├── src/
│   ├── app.ts            # Express setup, middleware, router registration
│   ├── index.ts          # Server listen
│   ├── lib/
│   │   ├── prisma.ts     # PrismaClient singleton
│   │   ├── cloudinary.ts # Cloudinary client config
│   │   └── logger.ts     # Pino instance
│   ├── middleware/
│   │   ├── auth.ts       # verifyClerkToken → req.user
│   │   ├── role.ts       # requireRole('admin' | 'driver' | 'customer')
│   │   ├── error.ts      # Centralized error handler (last middleware)
│   │   └── validate.ts   # validateRequest(schema) Zod factory
│   ├── types/
│   │   └── express.d.ts  # Augments req.user
│   ├── modules/          # One directory per domain
│   │   ├── users/
│   │   │   ├── user.schema.ts        # Zod schemas + inferred DTOs
│   │   │   ├── user.controller.ts    # Class — HTTP only
│   │   │   ├── user.routes.ts        # Router + DI wiring
│   │   │   ├── use-cases/
│   │   │   │   ├── create-user.usecase.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── bookings/     # Same pattern
│   │   ├── drivers/
│   │   ├── taxis/
│   │   ├── routes/       # route_packages domain
│   │   ├── tours/
│   │   ├── payments/
│   │   ├── reviews/
│   │   ├── complaints/
│   │   ├── notifications/
│   │   └── assistance/
│   ├── bot/
│   │   ├── index.ts      # grammY bot instance
│   │   └── notify.ts     # notifyDriver() helper
│   └── swagger/          # Swagger JSDoc config
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── Dockerfile
└── .env
```

### Layer Pattern (per module)

```
[feature].routes.ts       — instantiates use cases + controller, wires routes
[feature].controller.ts   — Class, HTTP only, calls use case, no business logic
use-cases/[action].usecase.ts — Class, execute() method, all business logic, throws on error
[feature].schema.ts       — Zod schemas + inferred DTO types
index.ts                  — barrel export
```
