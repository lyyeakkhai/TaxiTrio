# Architecture Context

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js 16 + TypeScript (App Router) | SSR, file-based routing |
| UI | Tailwind CSS + shadcn/ui | Utility styling + accessible components |
| Auth | Clerk | Admin-only sign-in; `role === "admin"` enforced in middleware |
| HTTP client | Axios (`lib/api.ts`) | Requests to Express backend with Clerk token |
| Validation | Zod | Form and server action input schemas |
| Backend | Express.js + TypeScript | REST API at `localhost:5000` |
| Database | Supabase (PostgreSQL) via Prisma | Primary data store |
| Images | Cloudinary | Driver/taxi photos, payment proofs (`secure_url` in DB) |

## Folder Structure

```
admin-frontend/
├── app/
│   ├── sign-in/              # Clerk SignIn page (public)
│   └── (admin)/              # All routes require role:admin
│       ├── layout.tsx        # Sidebar nav + UserButton
│       └── dashboard/
│           ├── page.tsx      # Overview stats
│           ├── users/        # Manage all users
│           ├── drivers/      # Approve/reject/manage drivers
│           ├── taxis/        # Create/update/deactivate taxis, assign drivers
│           ├── bookings/     # View all bookings, assign drivers
│           ├── payments/     # Verify/reject payment proofs
│           ├── routes/       # Create/update/deactivate route packages
│           ├── tours/        # Create/update/deactivate tour packages
│           ├── complaints/   # Reply to and resolve complaints
│           └── analytics/    # Revenue, bookings, top drivers, routes
├── features/                 # Feature slices — primary home for all feature logic
│   ├── manage-users/         # List users, view profiles
│   │   ├── components/
│   │   ├── actions.ts
│   │   ├── hooks.ts
│   │   ├── types.ts
│   │   └── schema.ts
│   ├── manage-drivers/       # Approve/reject, view earnings & reviews
│   ├── manage-taxis/         # CRUD taxis, assign driver to taxi
│   ├── manage-bookings/      # View all bookings, assign driver
│   ├── manage-payments/      # View proof image, verify/reject
│   ├── manage-routes/        # CRUD intercity route packages
│   ├── manage-tours/         # CRUD tour packages
│   ├── manage-complaints/    # Reply to complaints, mark resolved
│   └── analytics/            # Dashboard metrics and charts
├── components/               # Global shared components only (used by 2+ features)
│   └── ui/                   # shadcn/ui generated components
├── lib/
│   └── api.ts                # Axios instance with Clerk token injection
├── types/                    # Cross-feature TypeScript types
└── context/                  # AI context files
```

## System Boundaries

- `features/<name>/` — owns all components, server actions, hooks, types, and schemas for that feature; nothing inside is exported to other features
- `components/` — global shared components only; a component moves here only when 2+ features need it
- `app/(admin)/` — pages import from `features/` and compose them; pages contain no business logic
- `lib/api.ts` — single Axios instance with Clerk token injection; all feature actions use it

## Auth and Access Model

- Only users with `publicMetadata.role === "admin"` can access any route
- `middleware.ts` redirects all non-admin users to `/sign-in`
- Admin role is set manually in the Clerk dashboard (`publicMetadata: { role: "admin" }`)

## Invariants

1. Every route under `(admin)/` requires `role === "admin"` — enforced in middleware, not in pages
2. Nothing inside `features/<name>/` is imported by another feature
3. Pages contain no business logic — they only compose feature components
4. All API calls go through `lib/api.ts`
5. Images are always stored as Cloudinary `secure_url` strings — never local file paths
6. Booking status transitions must follow the defined state machine; invalid transitions return 400
7. Driver deletion only allowed if no active bookings
