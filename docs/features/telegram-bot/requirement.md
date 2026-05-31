# Telegram Bot — Requirements

## Roles
- Driver: receive booking notifications, accept/reject via Telegram
- Backend: send messages, handle callbacks

## Business Rules
- Driver must link their Telegram account before receiving notifications
- Link code expires after 10 minutes and is single-use
- Accept/Reject via Telegram updates booking status same as the app
- No Telegram API integration for customers — WhatsApp only

## User Stories
- As a driver, I can link my Telegram account using a one-time code from the app
- As a driver, I receive a Telegram message when a booking is assigned to me
- As a driver, I can accept or reject a booking directly from Telegram
