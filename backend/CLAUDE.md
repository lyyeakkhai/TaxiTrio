# CLAUDE.md

## Commands

```bash
npm run dev      # http://localhost:5000 (tsx watch)
npm run build    # tsc → dist/
npm start        # node dist/index.js
```

## Architecture

- Entry: `src/index.ts` → `src/app.ts` (middleware + routers)
- Pattern: **Vertical Slice + OOP Use-Case** — all code grouped by domain in `src/modules/<feature>/`
- Each module: `[feature].routes.ts` → `[feature].controller.ts` → `use-cases/[action].usecase.ts`
- Every directory has an `index.ts` barrel export
- Auth: `middleware/auth.ts` verifies Clerk tokens → `req.user`; `middleware/role.ts` guards by role
- Validation: `middleware/validate.ts` — `validateRequest(schema)` factory, runs before every controller
- Errors: thrown from use cases with `statusCode` property; caught by `middleware/error.ts` (last middleware)
- `this` binding: routes use arrow functions `(req, res) => controller.method(req, res)`
- Express 5 — no `asyncHandler` needed; async errors propagate automatically
- Images go to **Cloudinary** — never stored locally
- Full spec: `../docs/superpowers/specs/2026-05-31-backend-architecture-design.md`

## Implementation State

- Roadmap: `context/roadmap.md` (5 phases, implement in order)
- Progress: `context/progress-tracker.md`
- Tech stack: `context/tech-stack.md`
- Mission: `context/mission.md`

## Key Constraints

- Booking status transitions enforced server-side — invalid transitions return `400`
- Payment verification is manual (admin reviews Cloudinary proof image)
- Telegram bot (grammY) notifies drivers on assignment — see `../docs/features/telegram-bot.md`
