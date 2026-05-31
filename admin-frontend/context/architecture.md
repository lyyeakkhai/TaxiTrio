# Architecture Context

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js 16 + TypeScript (App Router) | SSR, file-based routing |
| UI | Tailwind CSS + shadcn/ui | Utility styling + accessible components |
| Auth | Clerk | Admin-only sign-in; role enforced in middleware |
| HTTP client | Axios (`lib/api.ts`) | Requests to Express backend |
| Validation | Zod | Form and server action input schemas |
| Backend | Express.js + TypeScript | REST API at `localhost:5000` |
| Database | Supabase (PostgreSQL) via Prisma | Primary data store |
| Images | Cloudinary | Driver/taxi photos, payment proofs |

## Folder Structure

```
admin-frontend/
├── app/
│   ├── sign-in/              # Clerk SignIn page (public)
│   └── (admin)/              # Admin route group — all routes require role:admin
│       ├── layout.tsx        # Sidebar nav + UserButton
│       └── dashboard/
│           ├── page.tsx      # Overview stats
│           ├── users/
│           ├── drivers/
│           ├── taxis/
│           ├── bookings/
│           ├── payments/
│           ├── routes/
│           ├── tours/
│           ├── complaints/
│           └── analytics/
├── features/                 # Feature slices — primary home for all feature logic
│   ├── manage-users/
│   │   ├── components/       # UI components used only by this feature
│   │   ├── actions.ts        # Server actions
│   │   ├── hooks.ts          # Client hooks
│   │   ├── types.ts          # Feature-scoped types
│   │   └── schema.ts         # Zod schemas
│   ├── manage-drivers/
│   ├── manage-taxis/
│   ├── manage-bookings/
│   ├── manage-payments/
│   ├── manage-routes/
│   ├── manage-tours/
│   ├── manage-complaints/
│   └── analytics/
├── components/               # Global shared components only (used by 2+ features)
│   └── ui/                   # shadcn/ui generated components
├── lib/
│   └── api.ts                # Axios instance (base URL from env)
├── types/                    # Cross-feature TypeScript types
└── context/                  # AI context files
```

## System Boundaries

- `features/<name>/` — owns all components, server actions, hooks, types, and schemas for that feature; nothing inside is exported to other features
- `components/` — global shared components only; a component moves here only when 2+ features need it
- `app/(admin)/` — pages import from `features/` and compose them; pages contain no business logic
- `lib/api.ts` — single Axios instance; all feature actions use it

## Auth and Access Model

- Only users with `publicMetadata.role === "admin"` can access any route
- `middleware.ts` redirects all non-admin users to `/sign-in`
- Admin role is set manually in the Clerk dashboard

## Invariants

1. Every route under `(admin)/` requires `role === "admin"` — enforced in middleware, not in pages
2. Nothing inside `features/<name>/` is imported by another feature
3. Pages contain no business logic — they only compose feature components
4. All API calls go through `lib/api.ts`
