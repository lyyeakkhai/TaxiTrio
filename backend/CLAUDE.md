# CLAUDE.md

## Commands

```bash
npm run dev      # http://localhost:5000 (tsx watch)
npm run build    # tsc → dist/
npm start        # node dist/index.js
```

## Architecture

- Entry: `src/index.ts` → `src/app.ts` (middleware + routers)
- Pattern: `routes/` → `controllers/`, validators in `validators/`, logger singleton in `lib/logger.ts`
- Auth middleware (pending): `middleware/auth.ts` verifies Clerk tokens; `middleware/role.ts` guards by role
- All request bodies validated with **Zod** before reaching controllers
- Images go to **Cloudinary** — never stored locally

## Implementation State

- Roadmap: `context/roadmap.md` (5 phases, implement in order)
- Progress: `context/progress-tracker.md`
- Tech stack: `context/tech-stack.md`
- Mission: `context/mission.md`

## Key Constraints

- Booking status transitions enforced server-side — invalid transitions return `400`
- Payment verification is manual (admin reviews Cloudinary proof image)
- Telegram bot (grammY) notifies drivers on assignment — see `../docs/features/telegram-bot.md`
