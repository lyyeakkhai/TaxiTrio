# AI Workflow Rules

## Approach

Build TaxiTrio incrementally using a spec-driven workflow. The `docs/` folder is the source of truth — `PRD.md`, `ARCHITECTURE.md`, `DATABASE.md`, and `SETUP.md` define what to build and how. Always implement against these specs. Do not infer or invent behavior not defined there.

## Scoping Rules

- Work on one feature unit at a time (e.g. customer booking form, admin driver verification)
- Prefer small, verifiable increments over large speculative changes
- Do not combine unrelated role boundaries (customer/driver/admin) in a single implementation step

## When to Split Work

Split an implementation step if it combines:

- UI changes and API route changes at the same time (unless trivially coupled)
- Multiple unrelated domains (e.g. payments + complaints)
- Behavior not clearly defined in `docs/`

If a change cannot be verified end to end quickly, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent product behavior not defined in `docs/`
- If a requirement is ambiguous, resolve it in the relevant `docs/` file before implementing
- If a requirement is missing, add it as an open question in `progress-tracker.md` before continuing

## Protected Files

Do not modify the following unless explicitly instructed:

- `components/ui/*` — generated shadcn/ui components
- `middleware.ts` — Clerk route protection (changes affect all role access)
- `lib/api.ts` — Axios + Clerk token injection (changes affect all API calls)

## Keeping Docs in Sync

Update `context/` files whenever implementation changes:

- System architecture or folder structure → `architecture.md`
- Storage model decisions → `architecture.md`
- Code conventions → `code-standards.md`
- Feature scope or status → `progress-tracker.md`

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope
2. No invariant defined in `architecture.md` was violated
3. `progress-tracker.md` reflects the completed work
4. `npm run build` passes without errors
