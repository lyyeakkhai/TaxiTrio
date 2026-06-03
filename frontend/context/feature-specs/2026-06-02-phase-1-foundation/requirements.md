# Requirements & Scope

## Overview
Phase 1 Foundation sets up the core infrastructure, role-based routing, internationalization (i18n), and base feature slices necessary before building the business logic for TaxiTrio.

## Scope
- Scaffold the `app/(customer)` and `app/(driver)` route groups.
- Establish role-based routing using Clerk's `publicMetadata.role`.
- Integrate `next-intl` for multi-language support (en, km, zh, ja, ko, fr).
- Setup TanStack Query for data fetching and caching.
- Create an authenticated Axios client (`lib/api.ts`) that reads the Clerk session token.
- Organize code according to the Feature Slice Pattern (see `architecture.md`).

## Context & Architecture Decisions
- **Roles**: `customer` and `driver` only. Admins are handled in a separate app.
- **Data Fetching**: Use TanStack Query client-side. The Axios instance handles injecting the Clerk token automatically.
- **State Management**: Complex UI state uses Zustand, while server state is cached via TanStack Query.
- **Component Placement**: Global shared components are placed in `components/`, whereas feature-specific logic and UI go into their respective folders inside `features/`.

## Additional Requirements
- *[Placeholder: Please add any additional requirements, context, or decisions you mentioned earlier]*
