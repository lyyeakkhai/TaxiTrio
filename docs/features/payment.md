# Feature: Payment

> Roles: Customer (upload proof) · Admin (full CRUD + verify/reject)

---

## Overview

Payment is manual-verification based. Customer uploads proof of payment; admin reviews and marks verified or rejected. Admin has full read access to all transactions.

---

## Payment Methods

`cash` · `aba` · `khqr` · `wing` · `card` · `wallet` · `corporate`

## Payment Statuses

```
unpaid → pending_verification → verified → captured
                              ↘ rejected
```

---

## Frontend

**User app:** `app/(customer)/bookings/[id]/payment/page.tsx`
**Admin dashboard:** `app/payments/page.tsx`, `app/payments/[id]/page.tsx`

---

## Backend

**Route file:** `routes/payments.ts`, `routes/admin.ts`
**Controller:** `controllers/paymentController.ts`

### Customer Endpoints (role: customer)

| Method | Path | Description |
|---|---|---|
| POST | `/api/payments/:booking_id/upload-proof` | Upload proof image to Cloudinary |
| GET | `/api/payments/:booking_id` | View own payment status |

### Admin Endpoints (role: admin)

| Method | Path | Description |
|---|---|---|
| GET | `/api/admin/payments` | All payments (filter by status, method, date) |
| GET | `/api/admin/payments/:id` | Detail + Cloudinary proof image URL |
| PUT | `/api/admin/payments/:id/verify` | Set status = verified, record verified_by + verified_at |
| PUT | `/api/admin/payments/:id/reject` | Set status = rejected |

---

## Database

Table: `payments`

| Column | Notes |
|---|---|
| proof_image | Cloudinary `secure_url` |
| verified_by | Admin user id |
| fee / net_amount | Calculated on booking creation |
