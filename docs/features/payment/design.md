# Payment — Design

## Data Model

Table: `payments`

| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| booking_id | UUID FK → bookings | |
| amount | DECIMAL(10,2) | |
| fee | DECIMAL(10,2) | |
| net_amount | DECIMAL(10,2) | |
| status | ENUM | unpaid, pending, paid, failed, refunded |
| clerk_subscription_id | VARCHAR(200) | Clerk subscription/payment reference, nullable |
| created_at | TIMESTAMP | |

## Status Flow

```
unpaid → pending → paid
               ↘ failed
paid → refunded
```

## Webhook Events (Clerk Billing)

| Event | Action |
|---|---|
| `subscription.created` | set status → `pending` |
| `subscriptionItem.active` | set status → `paid` |
| `subscriptionItem.canceled` | set status → `refunded` |
| `subscriptionItem.pastDue` | set status → `failed` |
