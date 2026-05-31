# Authentication — Design

## Flow

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
