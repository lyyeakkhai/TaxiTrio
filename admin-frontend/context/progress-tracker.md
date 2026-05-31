# Progress Tracker

## Current Phase

In Progress

## Current Goal

Foundation setup — Clerk auth, feature slice structure, context files

## Completed

- Next.js 16 project scaffolded (`admin-frontend/`)
- Clerk installed and configured (`middleware.ts` enforces `role === "admin"`)
- `app/layout.tsx` updated with `ClerkProvider`
- `app/sign-in/page.tsx` created
- `app/(admin)/layout.tsx` created with sidebar nav and `UserButton`
- `app/(admin)/dashboard/page.tsx` created (stub)
- All 9 feature slices scaffolded with `actions.ts`
- `lib/api.ts` created (Axios instance)
- All context files written

## In Progress

- Replace `.env.local` placeholder Clerk keys with real keys

## Next Up

- Add `hooks.ts`, `types.ts`, `schema.ts` to each feature as implementation begins
- Add dashboard pages per feature: `/dashboard/drivers`, `/dashboard/bookings`, etc.
- Install and configure shadcn/ui
- Build out feature components starting with highest-priority: manage-bookings, manage-drivers

## Open Questions

- Should the admin frontend share the same Clerk application as the user frontend, or use a separate one?
- What port should admin-frontend run on? (default: 3001 to avoid conflict with frontend on 3000)

## Architecture Decisions

- Separate Next.js app from user frontend — different deployment, different Clerk sign-in URL, admin-only middleware
- Feature slice pattern mirrors user frontend for consistency
- Axios instance in `lib/api.ts` — no Clerk token injection yet (add when backend admin routes require it)
