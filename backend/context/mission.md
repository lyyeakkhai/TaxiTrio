# Backend Mission

You are building the **TaxiTrio backend** — a REST API that powers a tourist-focused transportation and tour booking platform in Cambodia.

## Your Job

Build a secure, well-structured Express.js + TypeScript API that:

1. Verifies Clerk session tokens and enforces role-based access (`customer`, `driver`, `admin`)
2. Manages the full booking lifecycle from creation to completion
3. Handles manual payment verification with Cloudinary-hosted proof images
4. Sends Telegram notifications to drivers on booking assignment
5. Provides admin tools to manage drivers, routes, tours, payments, and complaints
6. Exposes auto-generated Swagger docs at `/api/docs`

## Source of Truth

| File | What it covers |
|---|---|
| `../docs/product/PRD.md` | All features, roles, business rules |
| `../docs/product/ARCHITECTURE.md` | Full stack design, request lifecycle, auth flow |
| `../docs/product/DATABASE.md` | Every table, column, type, and relationship |
| `../docs/product/SETUP.md` | Env vars, Clerk setup, Supabase, Cloudinary, Docker |
| `../docs/features/authentication/` | Clerk token flow, `GET /api/auth/me`, `clerk_id` on users table |
| `../docs/features/booking/` | Booking endpoints (all roles), status state machine |
| `../docs/features/driver-management/` | Driver profile, availability, approval endpoints |
| `../docs/features/payment/` | Payment upload, verify/reject, Cloudinary proof image |
| `../docs/features/reviews-complaints/` | Review + complaint endpoints, admin reply |
| `../docs/features/route-tour-packages/` | Public browse + admin CRUD for routes and tours |
| `../docs/features/notifications/` | Notification endpoints, auto-trigger events |
| `../docs/features/tourist-assistance/` | Assistance content endpoints |
| `../docs/features/taxis/` | Taxi fleet CRUD, public browse |
| `../docs/features/telegram-bot/` | grammY setup, driver linking flow, webhook handler |

## Non-Negotiables

- Every request body must be validated with **Zod** before reaching the controller
- Every protected route must go through `verifyClerkToken` + `requireRole` middleware
- Images (photos, payment proofs) go to **Cloudinary** — never stored locally
- All status transitions for bookings must be enforced server-side — invalid transitions return `400`
- Logging via **Pino** on every request
