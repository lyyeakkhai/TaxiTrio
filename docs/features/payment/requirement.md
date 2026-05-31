# Payment — Requirements

## Roles
- Customer: initiate payment via Clerk checkout, view own payment status
- Admin: view all payments

## Business Rules
- Payments are processed through Clerk Billing (Stripe-backed)
- Payment record is created automatically when booking is created
- Fee and net_amount are calculated at booking creation time
- Payment status is updated via Clerk billing webhooks

## User Stories
- As a customer, I can pay for my booking via Clerk checkout
- As a customer, I can check my payment status
- As an admin, I can view all payments and filter by status
