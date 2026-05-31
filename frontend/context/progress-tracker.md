# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

In Progress

## Current Goal

Foundation setup — Clerk auth, project structure, context files aligned with docs/

## Completed

- Clerk installed (`@clerk/nextjs`)
- `middleware.ts` created with `clerkMiddleware()` and route matcher
- `app/layout.tsx` updated with `ClerkProvider`, `Show` auth UI
- `frontend/.env.local` created with Clerk key placeholders
- All context files updated to reflect actual project spec from `docs/`

## In Progress

- Replace `.env.local` placeholder keys with real Clerk keys from dashboard

## Next Up

- Set up folder structure: `app/(customer)/`, `app/(driver)/`, `app/(admin)/`
- Add role-based middleware protection per route group
- Install and configure: TanStack Query, Zustand, next-intl, Zod, Axios, shadcn/ui, Lucide React
- Build `lib/api.ts` (Axios instance with Clerk token injection)
- Build customer-facing pages: taxi browser, route packages, tour packages

## Open Questions

- What is the backend base URL for production? (currently `http://localhost:5000/api`)
- Should sign-in/sign-up use Clerk hosted UI or custom pages?
- Which locale is the default for next-intl? (assumed: `en`)

## Architecture Decisions

- Using Clerk `publicMetadata.role` for RBAC — not a custom roles table — because Clerk handles session security and role is set by admin in the dashboard
- Single `bookings` table with `booking_type` enum (`taxi`, `route`, `tour`) — avoids three separate booking tables
- WhatsApp integration is a pre-filled URL only — no WhatsApp Business API needed
- Images stored as Cloudinary `secure_url` strings — no local file storage

## Session Notes

- Next.js version is 16.2.6 — check `node_modules/next/dist/docs/` before using any Next.js API
- Clerk SDK exports `Show` (not `SignedIn`/`SignedOut`) in the current installed version
- `.env.local` has placeholder keys — app will not authenticate until real keys are added
