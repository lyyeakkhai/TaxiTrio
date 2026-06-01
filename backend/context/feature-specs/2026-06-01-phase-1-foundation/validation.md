# Phase 1 — Foundation: Validation

## How to know this phase is complete and can be merged

### Server starts
```bash
cd backend && npm run dev
# Expected: server listening on http://localhost:5000
# Expected: GET /health returns { status: "ok" }
```

### Prisma connected
```bash
npx prisma migrate dev --name init
# Expected: migration applied, all tables created in Supabase
npx prisma studio
# Expected: all tables visible with correct columns
```

### Auth middleware works
- `GET /api/auth/me` without token → `401 Unauthorized`
- `GET /api/auth/me` with valid Clerk token → `200` with user object
- `GET /api/auth/me` with token for wrong role → `403 Forbidden` (if role guard applied)

### Validation middleware works
- POST with invalid body → `400` with `{ error: "Validation failed", details: {...} }`
- POST with valid body → passes through to controller

### Error handler works
- Any thrown error with `statusCode` → correct HTTP status + `{ error: message }`
- Unhandled error → `500 { error: "Internal server error" }`

### Swagger accessible
- `GET /api/docs` → Swagger UI renders in browser

### Tests pass
```bash
npm test
# Expected: all tests pass, no failures
```

### Test coverage checklist
- [ ] `verifyClerkToken` — missing token → 401, invalid token → 401, valid token → attaches req.user
- [ ] `requireRole` — wrong role → 403, correct role → passes
- [ ] `validateRequest` — invalid body → 400, valid body → req.body replaced with parsed data
- [ ] `errorHandler` — statusCode on error → correct status, no statusCode → 500
- [ ] `GET /health` → 200 `{ status: "ok" }`

### Cloudinary configured
- `src/lib/cloudinary.ts` exports a configured client (no upload test needed at this phase)

### Seed runs
```bash
npx prisma db seed
# Expected: admin user created in users table
```
