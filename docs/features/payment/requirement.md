# Payment — Requirements

## Roles
- Customer: upload proof, view own payment status
- Admin: view all, verify, reject

## Business Rules
- Payment proof is uploaded to Cloudinary — no local storage
- Admin manually reviews proof and marks verified or rejected
- Payment record is created automatically when booking is created
- Fee and net_amount are calculated at booking creation time

## User Stories
- As a customer, I can upload payment proof for my booking
- As a customer, I can check my payment status
- As an admin, I can view all payments and filter by status
- As an admin, I can verify or reject a payment after reviewing the proof image
