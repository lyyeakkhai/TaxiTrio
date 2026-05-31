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
│   ├── routes/           # One file per domain
│   ├── controllers/      # Business logic per domain
│   ├── middleware/
│   │   ├── auth.ts       # verifyClerkToken
│   │   └── role.ts       # requireRole('admin' | 'driver' | 'customer')
│   ├── validators/       # Zod schemas per route
│   ├── bot/
│   │   ├── index.ts      # grammY bot instance
│   │   └── notify.ts     # notifyDriver() helper
│   ├── lib/
│   │   ├── prisma.ts     # Prisma client singleton
│   │   ├── cloudinary.ts # Cloudinary client config
│   │   └── logger.ts     # Pino instance
│   ├── swagger/          # Swagger JSDoc config
│   └── types/            # Express req.user extension, shared types
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── Dockerfile
└── .env
```
