# AI Workflow Rules

## Approach

Build TaxiTrio Admin incrementally using a spec-driven workflow. The `docs/` folder at the repo root is the source of truth. Always implement against those specs — do not infer or invent behavior not defined there.

## Scoping Rules

- Work on one feature unit at a time
- Prefer small, verifiable increments over large speculative changes
- Do not combine unrelated feature boundaries in a single step

## When to Split Work

Split an implementation step if it combines:

- UI changes and server action changes at the same time (unless trivially coupled)
- Multiple unrelated admin domains (e.g. payments + complaints)
- Behavior not clearly defined in `docs/`

## Handling Missing Requirements

- Do not invent admin behavior not defined in `docs/`
- If a requirement is ambiguous, add it as an open question in `progress-tracker.md` before implementing

## Protected Files

Do not modify the following unless explicitly instructed:

- `components/ui/*` — generated shadcn/ui components
- `middleware.ts` — Clerk admin-only guard
- `lib/api.ts` — Axios instance

## Keeping Docs in Sync

Update `context/` files whenever implementation changes:

- Architecture or folder structure → `architecture.md`
- Code conventions → `code-standards.md`
- Feature scope or status → `progress-tracker.md`

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope
2. No invariant defined in `architecture.md` was violated
3. `progress-tracker.md` reflects the completed work
4. `npm run build` passes without errors
