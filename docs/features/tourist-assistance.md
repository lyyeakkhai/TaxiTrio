# Feature: Tourist Assistance Center

> Roles: Customer (read-only) · Admin (manage content)

---

## Overview

A static-content section that reduces tourist travel anxiety. Provides emergency contacts, language guidance, route tips, and WhatsApp support links. Content is managed by admin.

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

**Page:** `pages/customer/TouristAssistance.jsx`  
**Admin page:** `pages/admin/AssistanceContent.jsx`

---

## Backend

**Route file:** `routes/assistance.js`  
**Controller:** `controllers/assistanceController.js`

### Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/assistance` | — | Get all assistance content |
| POST | `/api/admin/assistance` | Admin | Create content item |
| PUT | `/api/admin/assistance/:id` | Admin | Update content item |
| DELETE | `/api/admin/assistance/:id` | Admin | Delete content item |

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

New table: `tourist_assistance`

| Column | Type |
|---|---|
| id | UUID PK |
| category | ENUM |
| title | VARCHAR(150) |
| content | TEXT |
| phone | VARCHAR(20) nullable |
| created_at | TIMESTAMP |
