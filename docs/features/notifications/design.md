# Notifications — Design

## In-System Notifications

Table: `notifications`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| user_id | UUID FK → users | |
| type | VARCHAR(50) | see trigger events |
| message | TEXT | |
| is_read | BOOLEAN | default false |
| created_at | TIMESTAMP | |

## Backend Implementation

Module: `src/modules/notifications/`

| Layer | File | Responsibility |
|---|---|---|
| Use Case | `use-cases/list-notifications.usecase.ts` | Returns notifications for `req.user.id` |
| Use Case | `use-cases/mark-read.usecase.ts` | Sets `is_read = true` for one notification |
| Use Case | `use-cases/mark-all-read.usecase.ts` | Sets `is_read = true` for all user notifications |
| Controller | `notification.controller.ts` | HTTP methods |
| Routes | `notification.routes.ts` | Notification endpoints |

Notifications are created inside the relevant use case (not a separate service). Email sends are fire-and-forget inside the use case, wrapped in try/catch so failure never blocks the response.

### Creation Pattern (inside use cases)

```ts
// Inside assign-booking.usecase.ts
await this.prisma.notification.create({
  data: { user_id: booking.customer_id, type: 'driver_assigned', message: `...` }
})
```

---

## Email Notifications (Resend)

### Library
```bash
npm install resend
```

### Config (`lib/resend.ts`)
```ts
import { Resend } from 'resend'
export const resend = new Resend(process.env.RESEND_API_KEY)
```

### Send Pattern

Fire-and-forget — wrapped in try/catch so email failure never blocks the response:

```ts
// Inside bookingController.ts after create
resend.emails.send({
  from: 'TaxiTrio <bookings@taxitrio.com>',
  to: customer.email,
  subject: 'Booking Confirmed',
  html: bookingConfirmationTemplate(booking)
}).catch(err => logger.error({ err }, 'Email send failed'))
```

### Email Templates

| Event | Subject | Content |
|---|---|---|
| `booking_created` | Booking Confirmed | Booking ID, route/tour, date, time, payment method |
| `payment_verified` | Payment Receipt | Booking ID, amount, net amount, verified date |

Templates live in `src/lib/email-templates/`.

---

## Environment Variables

```env
RESEND_API_KEY="re_..."
EMAIL_FROM="TaxiTrio <bookings@taxitrio.com>"
```
