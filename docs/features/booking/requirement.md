# Booking — Requirements

## Roles
- Customer: create, track, cancel own bookings
- Driver: accept/reject, manage trip status
- Admin: view all, assign driver, cancel any

## Business Rules
- One `bookings` table handles all types: `taxi`, `route`, `tour`
- Status transitions are enforced server-side — invalid transitions return 400
- Every status change is recorded in `booking_status_history`
- Admin assigns a driver → triggers Telegram notification to driver
- Customer can only cancel a booking in `pending` status

## Status Machine
```
PENDING → ASSIGNED → ACCEPTED → DRIVER_ARRIVED → IN_PROGRESS → COMPLETED
       ↘ CANCELLED              ↘ REJECTED
```

## User Stories
- As a customer, I can book a taxi, route, or tour package
- As a customer, I can track my booking status in real time
- As a customer, I can cancel a pending booking
- As a driver, I can accept or reject an assigned booking
- As a driver, I can update trip status (arrived, started, completed)
- As an admin, I can view all bookings and assign drivers
- As an admin, I can cancel any booking
