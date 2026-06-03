# Phase 1 Foundation Plan

This plan covers the remaining tasks for Phase 1 Foundation based on the `roadmap.md` and `progress-tracker.md`.

**Note:** The area of working for these implementations is exclusively within the `frontend` folder.

## 1. Route Group Scaffolding & Role-Based Middleware
- [x] Set up folder structure: `app/(customer)/`, `app/(driver)/` with all sub-routes.
- [x] Update `middleware.ts` to add role-based route protection (`customer` vs `driver`).
- [x] Protect all `/(customer)/*` routes and redirect `role:customer` to `/(customer)/dashboard`.
- [x] Protect all `/(driver)/*` routes and redirect `role:driver` to `/(driver)/dashboard`.
- [x] Unauthenticated users should be redirected to Clerk sign-in.

## 2. Dependencies & i18n Setup
- [x] Install dependencies: TanStack Query, Zustand, next-intl, Zod, Axios, shadcn/ui, Lucide React.
- [x] Configure `next-intl` plugin in `next.config.ts`.
- [x] Create i18n routing in `i18n/routing.ts` (`en`, `km`, `zh`, `ja`, `ko`, `fr`).
- [x] Set up locale JSON files in `messages/` for translations.

## 3. UI/UX Design Foundation (Pro Max)
- [x] Read the `ui-ux-pro-max` skill to pull a premium design system for TaxiTrio.
- [x] Configure `tailwind.config.ts` (via `globals.css` for v4) with the chosen color palette, typography (Google Fonts), and animations.
- [x] Update `globals.css` with the core design tokens (dark mode with vibrant accents).
- [x] Style the base `shadcn/ui` components to match the premium aesthetic.

## 4. Shared Infrastructure
- [x] Build `lib/api.ts` with an Axios instance that injects the Clerk session token via `auth().getToken()`.
- [x] Create TanStack Query client (`lib/queryClient.ts`) with `staleTime: 60_000`, `retry: 1`.
- [x] Create `app/providers.tsx` with `QueryClientProvider` and `next-intl` provider.
- [x] Update `app/layout.tsx` to wrap children with `<Providers>` and configure `metadata`.

## 5. Feature Slices & Global Shared Components
- [x] Scaffold all feature slices under `features/` directory according to the architecture context.
- [x] Create `components/StatusBadge.tsx` for booking statuses.
- [x] Create `components/PageHeader.tsx` for page titles/subtitles.
- [x] Create `components/EmptyState.tsx` for empty list states.
- [x] Create `components/LoadingSpinner.tsx` for suspense boundaries.
