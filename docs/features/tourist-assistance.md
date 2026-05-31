# Feature: Tourist Assistance Center

> Roles: Customer (read-only) · Admin (full CRUD)

---

## Overview

Static content section that reduces tourist travel anxiety. Admin fully controls all content — categories, titles, descriptions, and contact numbers.

---

## Assistance Categories

| Category | Content |
|---|---|
| Emergency Support | Tourist police, hospitals, dispatch contacts |
| Language Support | Driver language info, communication tips |
| Route Assistance | Travel duration, rest stops, departure tips |
| WhatsApp Support | Direct link to support chat |

---

## Frontend

**User app:** `app/(customer)/assistance/page.tsx`
**Admin dashboard:** `app/assistance/page.tsx` (list + inline edit)

---

## Backend

**Route file:** `routes/assistance.ts`, `routes/admin.ts`
**Controller:** `controllers/assistanceController.ts`

### Public Endpoints (no auth)

| Method | Path | Description |
|---|---|---|
| GET | `/api/assistance` | All active assistance content |
| GET | `/api/assistance/:id` | Single item detail |

### Admin Endpoints (role: admin)

| Method | Path | Description |
|---|---|---|
| GET | `/api/admin/assistance` | All items (including inactive) |
| POST | `/api/admin/assistance` | Create item |
| PUT | `/api/admin/assistance/:id` | Update item |
| PATCH | `/api/admin/assistance/:id/toggle` | Toggle is_active |
| DELETE | `/api/admin/assistance/:id` | Delete item |

```json
// POST /api/admin/assistance
{
  "category": "emergency | language | route | whatsapp",
  "title": "string",
  "content": "string",
  "phone": "string | null"
}
```

---

## Database

Table: `tourist_assistance`

| Column | Type |
|---|---|
| id | UUID PK |
| category | ENUM |
| title | VARCHAR(150) |
| content | TEXT |
| phone | VARCHAR(20) nullable |
| is_active | BOOLEAN default true |
| created_at | TIMESTAMP |
