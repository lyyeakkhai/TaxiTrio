# Code Standards

## General

- Keep modules small and single-purpose
- Fix root causes — do not layer workarounds
- Do not mix unrelated concerns in one component or route
- No comments unless the WHY is non-obvious

## TypeScript

- Strict mode required throughout
- Avoid `any` — use explicit interfaces or narrowly scoped types
- Validate unknown external input (API responses, form data) at system boundaries with Zod before trusting it

## Next.js

- Default to server components; add `"use client"` only when browser interactivity requires it
- Route groups: `(customer)`, `(driver)`, `(admin)` — keep role boundaries clean
- Keep route handlers focused on a single responsibility
- Use `await auth()` (async in Next.js 15+) for server-side auth checks

## Styling

- Use Tailwind utility classes; no hardcoded hex values
- Follow shadcn/ui component conventions — use the CLI to add new components, don't write from scratch
- Dark/light theme must be supported via Tailwind's `dark:` variant

## API Routes / Axios

- All requests go through `lib/api.ts` (Axios instance with Clerk token injection)
- Validate and parse request input with Zod before any logic runs
- Enforce auth and ownership before any mutation
- Return consistent, predictable response shapes

## Data and Storage

- Relational metadata belongs in Supabase via Prisma
- Images belong in Cloudinary — store only the `secure_url` in the database
- Do not store large binary content directly in the database

## File Organization — Feature Slice Pattern

Every feature lives in `features/<name>/` and is fully self-contained:

```
features/booking/
├── components/   # UI components — only used inside this feature
├── actions.ts    # Next.js server actions
├── hooks.ts      # Client-side hooks (TanStack Query, Zustand)
├── types.ts      # Types scoped to this feature
└── schema.ts     # Zod validation schemas
```

**Rules:**
- Nothing inside `features/<name>/` is imported by another feature — no cross-feature imports
- A component or utility moves to `components/` or `lib/` only when 2+ features need it
- Pages in `app/(customer|driver|admin)/` import from `features/` and compose — no business logic in pages
- `components/ui/` — shadcn/ui generated files only; never edit manually
