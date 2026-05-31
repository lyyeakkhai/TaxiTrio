# Architecture Context

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js 16 + TypeScript (App Router) | SSR, file-based routing, API routes |
| UI | Tailwind CSS + shadcn/ui | Utility styling + accessible component library |
| Auth | Clerk | Sign in/up, session management, role via `publicMetadata.role` |
| Server state | TanStack Query | Caching, loading states, background sync |
| Client state | Zustand | Complex local UI state without prop-drilling |
| HTTP client | Axios (lib/api.ts) | Clerk token injection on every request |
| Validation | Zod | Form and API input schemas |
| i18n | next-intl | Multi-language: en, km, zh, ja, ko, fr |
| Backend | Express.js + TypeScript | REST API at `localhost:5000` |
| ORM | Prisma | Type-safe queries + migrations |
| Database | Supabase (PostgreSQL) | Primary data store |
| Images | Cloudinary | Driver photos, taxi photos, payment proofs |
| Monitoring | Sentry | Error tracking (optional in local dev) |

## Folder Structure

```
frontend/
├── app/
│   ├── (customer)/       # Customer route group — pages only, no logic
│   ├── (driver)/         # Driver route group — pages only, no logic
│   ├── (admin)/          # Admin route group — pages only, no logic
│   └── api/              # Next.js BFF routes (if needed)
├── features/             # Feature slices — primary home for all feature logic
│   ├── booking/
│   │   ├── components/   # UI components used only by this feature
│   │   ├── actions.ts    # Server actions for this feature
│   │   ├── hooks.ts      # Client hooks for this feature
│   │   ├── types.ts      # Types scoped to this feature
│   │   └── schema.ts     # Zod schemas for this feature
│   ├── taxi-browser/
│   ├── route-packages/
│   ├── tour-packages/
│   ├── payment/
│   ├── reviews/
│   ├── complaints/
│   ├── driver-trips/
│   ├── driver-earnings/
│   ├── admin-bookings/
│   ├── admin-drivers/
│   ├── admin-payments/
│   ├── admin-analytics/
│   └── tourist-assistance/
├── components/           # Global shared components only (used by 2+ features)
│   └── ui/               # shadcn/ui generated components
├── lib/                  # Singleton clients: api.ts, queryClient.ts
├── messages/             # i18n locale files (en.json, km.json, etc.)
└── types/                # Shared TypeScript types (cross-feature)
```

## System Boundaries

- `features/<name>/` — owns all components, server actions, hooks, types, and schemas for that feature; nothing inside is exported to other features
- `components/` — global shared components only; a component moves here only when 2+ features need it
- `app/(customer|driver|admin)/` — pages import from `features/` and compose them; pages contain no business logic
- `lib/` — shared infrastructure (Axios instance, TanStack Query client)
- `types/` — cross-feature TypeScript types only

## Storage Model

- **Supabase (PostgreSQL)**: All relational data — users, bookings, payments, reviews, complaints, notifications, earnings
- **Cloudinary**: Binary assets — driver profile photos, taxi photos, payment proof images (stored as `secure_url` in DB, never local paths)
- **Clerk**: Identity and session data — no passwords stored in our DB

## Auth and Access Model

- Every user signs in via Clerk hosted UI; session token (JWT) is issued by Clerk
- `lib/api.ts` injects `Authorization: Bearer <clerk_session_token>` on every Axios request
- Backend verifies the token via Clerk SDK and reads `publicMetadata.role`
- Roles: `customer`, `driver`, `admin` — set in Clerk dashboard (`publicMetadata: { role: "..." }`)
- Admin users must have their role set manually in the Clerk dashboard
- Middleware (`middleware.ts`) protects routes: `/customer/*` → role:customer, `/driver/*` → role:driver, `/admin/*` → role:admin

## Invariants

1. Role is always read from Clerk `publicMetadata.role` — never stored in our own DB as the auth source
2. Images are always stored as Cloudinary `secure_url` strings — never local file paths
3. Booking status transitions must follow the defined state machine (invalid transitions → 400)
4. All API mutations validate auth + role before any business logic runs
5. WhatsApp integration is a pre-filled URL only — no WhatsApp API calls
