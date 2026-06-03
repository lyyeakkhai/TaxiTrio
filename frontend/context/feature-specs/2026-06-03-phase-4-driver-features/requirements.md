# Phase 4: Driver Features - Requirements

## Scope
This phase focuses on the driver-facing application layout and features, allowing drivers to manage their availability, handle trip life cycles, track their earnings, read customer reviews, and link their Telegram account for bot notifications.

## Data Models
- **Driver**: `id`, `user_id`, `license_number`, `languages`, `verification_status`, `rating`, `is_available`, `telegram_chat_id`.
- **Earning**: `id`, `driver_id`, `booking_id`, `amount`, `created_at`.
- **Review**: `id`, `booking_id`, `rating`, `message`, `customer_name`, `created_at`.
- **Telegram Link Code**: `code`, `expires_at`.

## Core Features
1. **Driver Dashboard**: Overview of profile, availability toggle, and quick stats.
2. **Driver Trips**: List of assigned bookings and a detail page with context-aware action buttons based on the booking status (`pending`, `assigned`, `accepted`, `driver_arrived`, `in_progress`, `completed`).
3. **Earnings & Reviews**: Read-only lists showing the driver's historical performance and income.
4. **Telegram Linking**: A flow to generate a 6-digit one-time code (valid for 10 minutes) that the driver can message to the Telegram bot to link their account.

## Decisions & Constraints
- Role-based routing: Driver pages live under `app/[locale]/driver/...`. The layout for drivers is separate from customers.
- Driver verification: Only drivers with `verification_status = approved` can be assigned trips (enforced by the backend).
- Context-Aware Trip Actions: The trip detail page will only show the *next valid action* (e.g., if status is `assigned`, show Accept/Reject; if `accepted`, show Mark Arrived).
