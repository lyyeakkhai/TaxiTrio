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
| method | VARCHAR(50) | cash, aba, khqr, wing, card, wallet, corporate |
| status | ENUM | unpaid, pending_verification, authorized, verified, captured, invoice_pending, rejected, refunded |
| transaction_id | VARCHAR(100) | nullable |
| proof_image | VARCHAR(500) | Cloudinary secure_url, nullable |
| verified_by | UUID FK → users | nullable, admin |
| verified_at | TIMESTAMP | nullable |
| created_at | TIMESTAMP | |

## Status Flow

```
unpaid → pending_verification → verified → captured
                              ↘ rejected
```

## Side Effects on Verify
When admin verifies payment:
1. `payment.status` → `verified`
2. `payment.verified_by` and `verified_at` set
3. Notification created for customer: `payment_verified`
