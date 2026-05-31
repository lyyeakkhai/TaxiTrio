# Notifications — Requirements

## Roles
- Customer: receive in-system notifications + email
- Driver: receive in-system notifications + Telegram (already handled in telegram-bot feature)

## Channels

| Channel | Used for |
|---|---|
| In-system | Real-time status updates while user is in the app |
| Resend (email) | Booking confirmation and receipts — works when app is closed |
| Telegram | Driver booking assignment only — see `../telegram-bot/` |

## Business Rules
- In-system notifications are created automatically inside controllers — not a separate service
- Resend email is sent on `booking_created` and `payment_verified` only
- No admin-facing notification endpoints
- Email is fire-and-forget — failure does not block the API response

## Trigger Events

| Event | Recipient | In-system | Email |
|---|---|---|---|
| Booking created | Customer | ✅ | ✅ confirmation |
| Driver assigned | Customer | ✅ | — |
| Booking accepted | Customer | ✅ | — |
| Payment verified | Customer | ✅ | ✅ receipt |
| Trip completed | Customer | ✅ | — |
| Complaint replied | Customer | ✅ | — |
| New booking assigned | Driver | ✅ | — (Telegram handles this) |

## User Stories
- As a customer, I can view my unread in-system notifications
- As a customer, I receive a booking confirmation email when I book
- As a customer, I receive a payment receipt email when my payment is verified
- As a user, I can mark individual or all notifications as read
