# Notifications — Design

## Data Model

Table: `notifications`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| user_id | UUID FK → users | |
| type | VARCHAR(50) | see trigger events |
| message | TEXT | |
| is_read | BOOLEAN | default false |
| created_at | TIMESTAMP | |

## Creation Pattern

Notifications are created inside the relevant controller, not via a separate service:

```ts
// Inside bookingController.ts after assign
await prisma.notification.create({
  data: {
    user_id: booking.customer_id,
    type: 'driver_assigned',
    message: `Your driver has been assigned for booking #${booking.id}`
  }
})
```
