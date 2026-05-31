# Notifications — Requirements

## Roles
- Customer: receive and read notifications
- Driver: receive booking assignment notifications

## Business Rules
- Notifications are created automatically inside other controllers — not a separate service
- No admin-facing notification endpoints

## Trigger Events

| Event | Recipient |
|---|---|
| Booking created | Customer |
| Driver assigned | Customer |
| Booking accepted | Customer |
| Payment verified | Customer |
| Trip completed | Customer |
| Complaint replied | Customer |
| New booking assigned | Driver |

## User Stories
- As a user, I can view my unread notifications
- As a user, I can mark individual or all notifications as read
