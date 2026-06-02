# Phase 1 Foundation Plan

This plan covers the remaining tasks for Phase 1 Foundation based on the `roadmap.md` and `progress-tracker.md`.

## 1. Route Group Scaffolding & Role-Based Middleware
- [ ] Set up folder structure: `app/(customer)/`, `app/(driver)/` with all sub-routes.
- [ ] Update `middleware.ts` to add role-based route protection (`customer` vs `driver`).
- [ ] Protect all `/(customer)/*` routes and redirect `role:customer` to `/(customer)/dashboard`.
- [ ] Protect all `/(driver)/*` routes and redirect `role:driver` to `/(driver)/dashboard`.
- [ ] Unauthenticated users should be redirected to Clerk sign-in.

## 2. Dependencies & i18n Setup
- [x] Install dependencies: TanStack Query, Zustand, next-intl, Zod, Axios, shadcn/ui, Lucide React.
- [ ] Configure `next-intl` plugin in `next.config.ts`.
- [ ] Create i18n routing in `i18n/routing.ts` (`en`, `km`, `zh`, `ja`, `ko`, `fr`).
- [ ] Set up locale JSON files in `messages/` for translations.

## 3. UI/UX Design Foundation (Pro Max)
- [ ] Read the `ui-ux-pro-max` skill to pull a premium design system for TaxiTrio.
- [ ] Configure `tailwind.config.ts` with the chosen color palette, typography (Google Fonts), and animations.
- [ ] Update `globals.css` with the core design tokens (dark mode with vibrant accents).
- [ ] Style the base `shadcn/ui` components to match the premium aesthetic.

## 4. Shared Infrastructure
- [ ] Build `lib/api.ts` with an Axios instance that injects the Clerk session token via `auth().getToken()`.
- [ ] Create TanStack Query client (`lib/queryClient.ts`) with `staleTime: 60_000`, `retry: 1`.
- [ ] Create `app/providers.tsx` with `QueryClientProvider` and `next-intl` provider.
- [ ] Update `app/layout.tsx` to wrap children with `<Providers>` and configure `metadata`.

## 5. Feature Slices & Global Shared Components
- [ ] Scaffold all feature slices under `features/` directory according to the architecture context.
- [ ] Create `components/StatusBadge.tsx` for booking statuses.
- [ ] Create `components/PageHeader.tsx` for page titles/subtitles.
- [ ] Create `components/EmptyState.tsx` for empty list states.
- [ ] Create `components/LoadingSpinner.tsx` for suspense boundaries.
