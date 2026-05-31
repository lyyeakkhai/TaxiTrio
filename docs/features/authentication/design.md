# Authentication — Design

## Backend Implementation

Module: `src/modules/users/`

| Layer | File | Responsibility |
|---|---|---|
| Middleware | `middleware/auth.ts` | `verifyClerkToken` — verifies Clerk JWT, attaches `req.user` |
| Middleware | `middleware/role.ts` | `requireRole(...roles)` — 403 if role not in list |
| Use Case | `use-cases/get-me.usecase.ts` | Fetches user by `clerkId` from DB |
| Use Case | `use-cases/create-user.usecase.ts` | Creates user record on first sign-in |
| Controller | `user.controller.ts` | `getMe`, `create` methods |
| Routes | `user.routes.ts` | `GET /api/auth/me`, `POST /api/users` |

```
User signs in via Clerk hosted UI
  ← Clerk session token (JWT)

frontend lib/api.ts injects:
  Authorization: Bearer <clerk_session_token>

Backend middleware/auth.ts:
  verifyClerkToken() → attaches req.user
  req.user.publicMetadata.role → used by requireRole()

Role-based redirect (frontend middleware.ts):
  customer → /customer/dashboard
  driver   → /driver/dashboard
  admin    → /admin/dashboard (admin-dashboard app)
```

## Middleware Chain

```
verifyClerkToken → requireRole('customer' | 'driver' | 'admin') → controller
```

## Database

Table: `users`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| clerk_id | VARCHAR(255) UNIQUE | Primary link to Clerk |
| name | VARCHAR(100) | |
| email | VARCHAR(150) UNIQUE | |
| phone | VARCHAR(20) | |
| profile_photo | VARCHAR(500) | Cloudinary secure_url |
| role | ENUM | customer, driver, admin |
| created_at | TIMESTAMP | |

> Password is not stored — Clerk manages credentials.
