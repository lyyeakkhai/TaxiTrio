# Code Standards

## General

- Keep modules small and single-purpose
- Fix root causes — do not layer workarounds
- No comments unless the WHY is non-obvious

## TypeScript

- Strict mode required throughout
- Avoid `any` — use explicit interfaces or narrowly scoped types
- Validate all form and action inputs with Zod at the boundary

## Next.js

- Default to server components; add `"use client"` only when browser interactivity requires it
- Server actions live in `features/<name>/actions.ts` — never inline in page files
- Keep pages thin: import feature components, render, done

## File Organization — Feature Slice Pattern

Every feature lives in `features/<name>/` and is fully self-contained:

```
features/manage-drivers/
├── components/   # UI components — only used inside this feature
├── actions.ts    # Next.js server actions
├── hooks.ts      # Client-side hooks
├── types.ts      # Types scoped to this feature
└── schema.ts     # Zod validation schemas
```

**Rules:**
- Nothing inside `features/<name>/` is imported by another feature — no cross-feature imports
- A component or utility moves to `components/` or `lib/` only when 2+ features need it
- `components/ui/` — shadcn/ui generated files only; never edit manually

## Styling

- Tailwind utility classes only; no hardcoded hex values
- Use shadcn/ui components — add via CLI, don't write from scratch

## API

- All requests go through `lib/api.ts`
- Validate inputs with Zod before calling the API
- Return consistent response shapes from server actions
