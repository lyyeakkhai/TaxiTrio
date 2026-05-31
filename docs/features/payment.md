# Feature: Payment

> Roles: Customer (upload proof) · Admin (verify / reject)

---

## Overview

Payment is manual-verification based. Customer uploads proof of payment; admin reviews and marks verified or rejected.

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

**Customer pages:** `pages/customer/PaymentUpload.jsx`, `pages/customer/PaymentStatus.jsx`  
**Admin pages:** `pages/admin/Payments.jsx`, `pages/admin/PaymentDetail.jsx`

---

## Backend

**Route file:** `routes/payments.js`, `routes/admin.js`  
**Controller:** `controllers/paymentController.js`

### Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/payments/:booking_id/upload-proof` | Customer | Upload proof image (multipart/form-data) |
| GET | `/api/payments/:booking_id` | Customer | View payment status |
| GET | `/api/admin/payments` | Admin | All payments |
| GET | `/api/admin/payments/:id` | Admin | Detail + proof image URL |
| PUT | `/api/admin/payments/:id/verify` | Admin | Verify payment |
| PUT | `/api/admin/payments/:id/reject` | Admin | Reject payment |

---

## Database

Tables used: `payments`

| Column | Notes |
|---|---|
| proof_image | File path stored; served at `/uploads/<filename>` |
| verified_by | Admin user id |
| fee / net_amount | Calculated on booking creation |
