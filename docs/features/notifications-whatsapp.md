# Feature: Notifications & WhatsApp Support

> Roles: All (notifications) · Customer (WhatsApp)

---

## Overview

System notifications are generated automatically on key booking events. WhatsApp support is a pre-filled URL — no API integration required.

---

## Notification Triggers

| Event | Recipient |
|---|---|
| Booking created | Customer |
| Driver assigned | Customer |
| Booking accepted | Customer |
| Payment verified | Customer |
| Trip completed | Customer |
| Complaint replied | Customer |
| New booking assigned | Driver |

---

## Frontend

**Component:** `components/NotificationBell.jsx` — polls or uses SSE for new notifications  
**WhatsApp button:** `components/WhatsAppButton.jsx` — generates pre-filled URL

### WhatsApp URL Format

```js
const msg = `Hello, I want to book:\nRoute: ${origin} → ${destination}\nDate: ${date}\nPassengers: ${count}`
const url = `https://wa.me/855XXXXXXXXX?text=${encodeURIComponent(msg)}`
```

---

## Backend

**Route file:** `routes/notifications.js`  
**Controller:** `controllers/notificationController.js`

Notifications are created inside other controllers (booking, payment, complaint) — not a separate service.

### Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/notifications` | Any | My notifications |
| PUT | `/api/notifications/:id/read` | Any | Mark as read |
| PUT | `/api/notifications/read-all` | Any | Mark all as read |

---

## Database

Tables used: `notifications`

| Column | Notes |
|---|---|
| type | e.g. `booking_created`, `driver_assigned`, `complaint_replied` |
| is_read | default false |
