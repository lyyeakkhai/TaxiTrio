# Setup Guide

> Source of truth: [PRD.md](./PRD.md)

---

## Prerequisites

- Node.js >= 18
- npm or yarn
- Docker (for backend containerization)
- A [Clerk](https://clerk.com) account
- A [Supabase](https://supabase.com) project
- A [Cloudinary](https://cloudinary.com) account
- A [Sentry](https://sentry.io) project (optional for local dev)

---

## 1. Clone and Install

```bash
git clone <repo-url>
cd TaxiTrio

cd backend && npm install
cd ../frontend && npm install
```

---

## 2. Environment Variables

**backend/.env**
```env
PORT=5000

# Supabase
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"

# Clerk
CLERK_SECRET_KEY="sk_test_..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Resend
RESEND_API_KEY="re_..."
EMAIL_FROM="TaxiTrio <bookings@taxitrio.com>"

# Sentry (optional)
SENTRY_DSN="https://..."
```

**frontend/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/

# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN="https://..."
```

---

## 3. Clerk Setup

1. Create an application in the Clerk dashboard
2. Enable the roles you need by adding `role` to `publicMetadata` for each user
3. Set allowed roles: `customer`, `driver`, `admin`
4. Admin users must have `publicMetadata: { role: "admin" }` set manually in the Clerk dashboard

---

## 4. Database Setup

```bash
cd backend

# Push schema to Supabase
npx prisma migrate dev --name init

# Seed lookup data (assistance categories, etc.)
npx prisma db seed
```

---

## 5. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev
# Runs on http://localhost:5000
# Swagger docs at http://localhost:5000/api/docs

# Terminal 2 — Frontend
cd frontend && npm run dev
# Runs on http://localhost:3000
```

---

## 6. Docker (Backend)

```bash
cd backend
docker build -t taxitrio-backend .
docker run -p 5000:5000 --env-file .env taxitrio-backend
```

---

## 7. Testing

```bash
# Unit + integration tests (Vitest)
cd backend && npm run test
cd frontend && npm run test

# End-to-end tests (Playwright)
cd frontend && npx playwright test
```

---

## 8. Project Scripts

| Command | Location | Description |
|---|---|---|
| `npm run dev` | backend | Start backend with hot reload |
| `npm run dev` | frontend | Start Next.js dev server |
| `npm run test` | both | Run Vitest tests |
| `npx playwright test` | frontend | Run E2E tests |
| `npx prisma studio` | backend | Open Supabase DB GUI |
| `npx prisma migrate dev` | backend | Run new migrations |
| `npx prisma db seed` | backend | Seed database |

---

## 9. Docs

| File | Purpose |
|---|---|
| [PRD.md](./PRD.md) | Source of truth — what we build |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Tech stack, folder structure, design decisions |
| [DATABASE.md](./DATABASE.md) | Schema, tables, relationships |
| [SETUP.md](./SETUP.md) | This file |
