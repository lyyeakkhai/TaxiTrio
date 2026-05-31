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

## Categories

| Category | Purpose |
|---|---|
| emergency | Tourist police, hospitals, dispatch contacts |
| language | Driver language info, communication tips |
| route | Travel duration, rest stops, departure tips |
| whatsapp | Direct WhatsApp support link |
