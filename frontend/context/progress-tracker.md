# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

Done!

## Current Goal

Polish & Production Readiness

## Completed

- Clerk installed (`@clerk/nextjs`)
- `middleware.ts` created with `clerkMiddleware()` and route matcher
- `app/layout.tsx` updated with `ClerkProvider` and `Show` auth UI
- `frontend/.env.local` created with Clerk key placeholders
- `globals.css` updated with dark-first theme tokens (charcoal + yellow/cyan)
- All context files updated to reflect actual project spec from `docs/`
- Install: TanStack Query, Zustand, next-intl, Zod, Axios, shadcn/ui, Lucide React

## In Progress

- Phase 1-5 implemented completely.
- Phase 6 (Polish & Production Readiness) implemented including i18n, Theme Toggle, Error Boundaries, Sentry setup, and Build Verification.
- Phase 7 (Backend API Integration) implemented with centralized `API_ENDPOINTS` map and validated Zod schemas.

## Next Up

- Wait for instructions on backend setup or deployment.

## Open Questions

- What is the backend base URL for production? (currently `http://localhost:5000/api`)
- Should sign-in/sign-up use Clerk hosted UI or custom pages?
- Which locale is the default for next-intl? (assumed: `en`)

## Architecture Decisions

- Customer and Driver roles only — Admin lives in `admin-frontend/` (separate app)
- Using Clerk `publicMetadata.role` for RBAC — not a custom roles table
- Single `bookings` table with `booking_type` enum (`taxi`, `route`, `tour`)
- WhatsApp integration is a pre-filled URL only — no WhatsApp Business API
- Telegram link codes expire after 10 minutes, single-use — stored in DB
- Images stored as Cloudinary `secure_url` strings — no local file storage
- Email via Resend (fire-and-forget) — failure does not block API response
- One review per completed booking enforced by UNIQUE constraint on `booking_id`

## Session Notes

- Next.js version is 16.2.6 — check `node_modules/next/dist/docs/` before using any Next.js API
- Clerk SDK exports `Show` (not `SignedIn`/`SignedOut`) in the current installed version
- `.env.local` has placeholder keys — app will not authenticate until real keys are added
