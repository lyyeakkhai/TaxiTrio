# Tourist Assistance — Design

## Data Model

Table: `tourist_assistance`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| category | ENUM | emergency, language, route, whatsapp |
| title | VARCHAR(150) | |
| content | TEXT | |
| phone | VARCHAR(20) | nullable |
| is_active | BOOLEAN | default true |
| created_at | TIMESTAMP | |

## Backend Implementation

Module: `src/modules/assistance/`

| Layer | File | Responsibility |
|---|---|---|
| Use Case | `use-cases/list-assistance.usecase.ts` | Returns active assistance items (public) |
| Use Case | `use-cases/create-assistance.usecase.ts` | Admin: creates item |
| Use Case | `use-cases/update-assistance.usecase.ts` | Admin: updates item |
| Use Case | `use-cases/delete-assistance.usecase.ts` | Admin: sets `is_active = false` |
| Controller | `assistance.controller.ts` | HTTP methods |
| Routes | `assistance.routes.ts` | Public + admin assistance endpoints |

| Category | Purpose |
|---|---|
| emergency | Tourist police, hospitals, dispatch contacts |
| language | Driver language info, communication tips |
| route | Travel duration, rest stops, departure tips |
| whatsapp | Direct WhatsApp support link |
