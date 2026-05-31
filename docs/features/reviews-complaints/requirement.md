# Reviews & Complaints — Requirements

## Roles
- Customer: submit review (once per completed booking), submit complaint, view own complaints
- Driver: view own reviews
- Admin: view all reviews, delete reviews, view/reply/resolve/delete complaints

## Business Rules
- One review per completed booking (UNIQUE constraint on booking_id)
- Driver rating is recalculated as AVG after each new review
- Complaint status: open → replied → resolved
- Admin reply triggers a notification to the customer

## User Stories
- As a customer, I can rate and review a driver after a completed trip
- As a customer, I can submit a complaint about a booking
- As a customer, I can view my complaints and admin replies
- As a driver, I can view all reviews I have received
- As an admin, I can view all reviews and remove inappropriate ones
- As an admin, I can reply to and resolve complaints
