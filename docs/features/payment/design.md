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
| method | VARCHAR(50) | |
| status | ENUM | unpaid, pending_verification, authorized, verified, captured, invoice_pending, rejected, refunded |
| transaction_id | VARCHAR(100) | nullable |
| proof_image | VARCHAR(255) | nullable — Cloudinary secure_url, uploaded by customer |
| verified_by | UUID FK → users | nullable — admin who verified |
| verified_at | TIMESTAMP | nullable |
| created_at | TIMESTAMP | |

## Status Flow

```
unpaid → pending_verification (customer uploads proof)
       → verified (admin approves)
       → rejected (admin rejects)
```

Payment verification is **manual** — admin reviews the Cloudinary proof image and approves or rejects.

## Backend Implementation

Module: `src/modules/payments/`

| Layer | File | Responsibility |
|---|---|---|
| Use Case | `use-cases/upload-proof.usecase.ts` | multer in-memory → Cloudinary upload → store `secure_url`, status → `pending_verification` |
| Use Case | `use-cases/get-payment.usecase.ts` | Returns payment record including proof image URL |
| Use Case | `use-cases/verify-payment.usecase.ts` | Admin: sets `verified`, `verified_by`, `verified_at`; triggers `payment_verified` notification + email |
| Use Case | `use-cases/reject-payment.usecase.ts` | Admin: sets `rejected` |
| Controller | `payment.controller.ts` | HTTP methods |
| Routes | `payment.routes.ts` | Payment endpoints |
