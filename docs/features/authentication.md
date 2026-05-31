# Feature: Authentication

> Roles: Customer · Driver · Admin

---

## Overview

All three roles share the same login endpoint. The JWT payload contains `role`, which the frontend uses to redirect to the correct dashboard and the backend uses to guard routes.

---

## Frontend

**Pages:** `pages/auth/Login.jsx`, `pages/auth/Register.jsx`

**Flow:**
1. User submits email + password
2. `api/auth.js` calls `POST /api/auth/login`
3. Token + user stored in `AuthContext`
4. Redirect based on `user.role` → `/customer`, `/driver`, or `/admin`

**Route guard:** `components/ProtectedRoute.jsx` — wraps all role-specific routes, redirects to `/login` if no token.

---

## Backend

**Route file:** `routes/auth.js`  
**Controller:** `controllers/authController.js`

### Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Register new customer |
| POST | `/api/auth/login` | — | Login all roles |
| GET | `/api/auth/me` | Any | Get current user from token |

### POST /api/auth/register

```json
// Request
{ "name": "string", "email": "string", "password": "string", "phone": "string" }

// Response 201
{ "token": "string", "user": { "id", "name", "email", "role": "customer" } }
```

### POST /api/auth/login

```json
// Request
{ "email": "string", "password": "string" }

// Response 200
{ "token": "string", "user": { "id", "name", "email", "role" } }
```

---

## Database

Tables used: `users`

| Column | Notes |
|---|---|
| role | ENUM: `customer`, `driver`, `admin` |
| password | bcrypt hashed, never returned in responses |
