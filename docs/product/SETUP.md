# Setup Guide

> Source of truth: [PRD.md](./PRD.md)

---

## Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- npm or yarn

---

## 1. Clone and Install

```bash
git clone <repo-url>
cd TaxiTrio

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

---

## 2. Environment Variables

**backend/.env**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/taxitrio"
JWT_SECRET="your-secret-key"
PORT=5000
UPLOAD_DIR="uploads"
```

**frontend/.env**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 3. Database Setup

```bash
cd backend

# Run migrations
npx prisma migrate dev --name init

# Seed initial admin account
npx prisma db seed
```

Default admin credentials (from seed):
- Email: `admin@taxitrio.com`
- Password: `admin123` — **change this immediately**

---

## 4. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev
# Runs on http://localhost:5000

# Terminal 2 — Frontend
cd frontend && npm run dev
# Runs on http://localhost:5173
```

---

## 5. File Uploads

Uploaded files (payment proofs, photos) are stored in `backend/uploads/`.

The backend serves them statically at `http://localhost:5000/uploads/<filename>`.

---

## 6. Project Scripts

| Command | Location | Description |
|---|---|---|
| `npm run dev` | backend | Start backend with hot reload |
| `npm run dev` | frontend | Start frontend with Vite |
| `npx prisma studio` | backend | Open database GUI |
| `npx prisma migrate dev` | backend | Run new migrations |
| `npx prisma db seed` | backend | Seed database |

---

## 7. Docs

| File | Purpose |
|---|---|
| [PRD.md](./PRD.md) | Source of truth — what we build |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Tech stack, folder structure, design decisions |
| [DATABASE.md](./DATABASE.md) | Schema, tables, relationships |
| [API.md](./API.md) | All endpoints, request/response contracts |
| [SETUP.md](./SETUP.md) | This file |
