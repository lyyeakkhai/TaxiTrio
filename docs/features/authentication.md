# Feature: Authentication

> Roles: Customer · Driver · Admin

---

## Overview

Authentication is fully handled by **Clerk**. There are no custom login/register endpoints. The backend verifies Clerk session tokens on every protected request. Role is stored in Clerk `publicMetadata.role`.

---

## Frontend

**Pages:** `app/sign-in/page.tsx`, `app/sign-up/page.tsx` — Clerk hosted UI components

**Flow:**
1. User signs in via Clerk (`<SignIn />` component)
2. Clerk issues a session token
3. `middleware.ts` reads `publicMetadata.role` and redirects to `/customer`, `/driver`, or `/admin`
4. `lib/api.ts` Axios instance auto-injects `Authorization: Bearer <clerk_token>` on every request

**Route guard:** Next.js `middleware.ts` using `clerkMiddleware()` — protects all role-specific routes.

---

## Backend

**Middleware:** `middleware/auth.ts` — calls Clerk SDK `verifyToken()`, attaches `req.user`  
**Middleware:** `middleware/role.ts` — reads `req.user.publicMetadata.role`, guards by role

No `/api/auth/*` endpoints. Clerk handles all session management.

### GET /api/auth/me

```json
// Headers: Authorization: Bearer <clerk_token>

// Response 200
{ "id": "clerk_user_id", "name": "string", "email": "string", "role": "customer | driver | admin" }
```

---

## Database

Tables used: `users`

| Column | Notes |
|---|---|
| clerk_id | Clerk user ID — primary link between Clerk and DB |
| role | ENUM: `customer`, `driver`, `admin` — mirrors Clerk `publicMetadata.role` |
| password | Not stored — Clerk manages credentials |
