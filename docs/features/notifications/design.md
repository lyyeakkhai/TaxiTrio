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

### Creation Pattern

Created inside the relevant controller — not a separate service:

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
