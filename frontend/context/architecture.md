# Architecture Context

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js 16 + TypeScript (App Router) | SSR, file-based routing, API routes |
| UI | Tailwind CSS + shadcn/ui | Utility styling + accessible component library |
| Auth | Clerk | Sign in/up, session management, role via `publicMetadata.role` |
| Server state | TanStack Query | Caching, loading states, background sync |
| Client state | Zustand | Complex local UI state without prop-drilling |
| HTTP client | Axios (`lib/api.ts`) | Clerk token injection on every request |
| Validation | Zod | Form and API input schemas |
| i18n | next-intl | Multi-language: en, km, zh, ja, ko, fr |
| Backend | Express.js + TypeScript | REST API at `localhost:5000` |
| Database | Supabase (PostgreSQL) via Prisma | Primary data store |
| Images | Cloudinary | Driver/taxi photos, payment proofs (`secure_url` stored in DB) |
| Email | Resend | Booking confirmation, payment receipt (fire-and-forget) |
| Monitoring | Sentry | Error tracking (optional in local dev) |

## Folder Structure

```
frontend/
├── app/
│   ├── (customer)/           # Customer route group — pages only, no logic
│   │   ├── dashboard/
│   │   ├── taxis/
│   │   ├── routes/
│   │   ├── tours/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── reviews/
│   │   ├── complaints/
│   │   ├── notifications/
│   │   └── assistance/
│   ├── (driver)/             # Driver route group — pages only, no logic
│   │   ├── dashboard/
│   │   ├── trips/
│   │   ├── earnings/
│   │   ├── reviews/
│   │   └── telegram-link/
│   └── api/                  # Next.js BFF routes (if needed)
├── features/                 # Feature slices — primary home for all feature logic
│   ├── auth/                 # Clerk sign-in redirect, role-based routing
│   ├── taxi-browser/         # Browse taxis with driver info
│   ├── route-packages/       # Browse intercity route packages
│   ├── tour-packages/        # Browse tour packages
│   ├── booking/              # Create booking, status tracker, cancel
│   ├── payment/              # Upload proof, view payment status
│   ├── reviews/              # Rate driver, view reviews
│   ├── complaints/           # Submit complaint, view history + admin replies
│   ├── notifications/        # In-system inbox, mark read
│   ├── tourist-assistance/   # Emergency, language, route, WhatsApp content
│   ├── driver-trips/         # Accept/reject, update trip status
│   ├── driver-earnings/      # View earnings per trip and total
│   └── telegram-link/        # Generate link code, connect Telegram account
├── components/               # Global shared components only (used by 2+ features)
│   └── ui/                   # shadcn/ui generated components
├── lib/
│   ├── api.ts                # Axios instance with Clerk token injection
│   └── queryClient.ts        # TanStack Query client config
├── messages/                 # i18n locale files (en.json, km.json, zh.json, ja.json, ko.json, fr.json)
└── types/                    # Cross-feature TypeScript types
```

## System Boundaries

- `features/<name>/` — owns all components, server actions, hooks, types, and schemas for that feature; nothing inside is exported to other features
- `components/` — global shared components only; a component moves here only when 2+ features need it
- `app/(customer|driver)/` — pages import from `features/` and compose them; pages contain no business logic
- `lib/api.ts` — single Axios instance; injects Clerk session token on every request

## Storage Model

- **Supabase (PostgreSQL)**: All relational data — users, bookings, payments, reviews, complaints, notifications, earnings, tourist_assistance
- **Cloudinary**: Binary assets — driver profile photos, taxi photos, payment proof images (stored as `secure_url` in DB, never local paths)
- **Clerk**: Identity and session data — no passwords stored in our DB

## Auth and Access Model

- Every user signs in via Clerk hosted UI; session token (JWT) is issued by Clerk
- `lib/api.ts` injects `Authorization: Bearer <clerk_session_token>` on every Axios request
- Backend verifies the token via Clerk SDK and reads `publicMetadata.role`
- Roles: `customer`, `driver` — set in Clerk dashboard (`publicMetadata: { role: "..." }`)
- Middleware (`middleware.ts`) protects routes: `/(customer)/*` → role:customer, `/(driver)/*` → role:driver

## Invariants

1. Role is always read from Clerk `publicMetadata.role` — never stored in our own DB as the auth source
2. Images are always stored as Cloudinary `secure_url` strings — never local file paths
3. Booking status transitions must follow the defined state machine; invalid transitions return 400
4. All API mutations validate auth + role before any business logic runs
5. WhatsApp integration is a pre-filled URL only — no WhatsApp API calls
6. Telegram link codes expire after 10 minutes and are single-use
7. One review per completed booking — enforced by UNIQUE constraint on `booking_id`
