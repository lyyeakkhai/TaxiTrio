# TaxiTrio — User Frontend

## Overview

TaxiTrio is a Smart Tourist Transportation and Tour Booking Platform for international travelers in Cambodia. It lets tourists book verified drivers, intercity route packages, and tour experiences with transparent fixed pricing, secure payments, and travel assistance — addressing HCI-identified pain points like hidden fees, scam drivers, and language barriers.

## Goals

1. Let tourists book safe, verified transportation with upfront pricing
2. Provide intercity route packages and tour experiences in a single platform
3. Reduce travel anxiety through driver verification, WhatsApp support, and a tourist assistance center

## Core User Flow

1. Customer signs in via Clerk
2. Browses taxis, intercity routes, or tour packages
3. Creates a booking with travel date, passenger count, and payment method
4. Admin assigns a driver → driver accepts → driver arrives → trip starts → trip completes
5. Customer uploads payment proof → admin verifies
6. Customer rates the driver and optionally submits a complaint

## Features

### Customer
- Sign in via Clerk; redirected to customer dashboard by role
- Browse taxis (with driver info: name, rating, languages, availability)
- Browse intercity route packages and tour packages (active only)
- Book taxi, route, or tour — single booking form, `booking_type` enum
- Track booking status timeline: Pending → Assigned → Accepted → Driver Arrived → In Progress → Completed
- Upload payment proof (Cloudinary); view payment status
- Rate driver (1–5 stars + message) once per completed booking
- Submit complaint (categories: driver_behavior, vehicle_condition, pricing, service_quality, other)
- View complaint history and admin replies
- View tourist assistance content (emergency contacts, language tips, route info, WhatsApp support)
- Receive in-system notifications + email (booking_created, driver_assigned, payment_verified, trip_completed, complaint_replied)
- Contact support via WhatsApp deep-link (pre-filled message, no API)
- Multi-language UI: en, km, zh, ja, ko, fr (next-intl)

### Driver
- Sign in via Clerk; redirected to driver dashboard by role
- View and manage profile (name, phone, languages, photo via Cloudinary)
- Toggle online/offline availability
- View assigned bookings; accept or reject
- Update trip status: Driver Arrived → In Progress → Completed
- View earnings per trip and total
- View customer reviews and ratings
- Link Telegram account (one-time code, 10-min expiry) to receive booking notifications and accept/reject via Telegram inline buttons

### Notifications (user-facing)
- In-system notification inbox with unread count
- Mark individual or all notifications as read
- Email via Resend (fire-and-forget): booking confirmation, payment receipt

## Scope

### In Scope
- Customer and Driver roles only (Admin lives in `admin-frontend/`)
- Booking lifecycle: Pending → Assigned → Accepted → Driver Arrived → In Progress → Completed / Cancelled / Rejected
- Payment proof upload and status tracking
- WhatsApp deep-link (pre-filled URL, no WhatsApp Business API)
- Telegram link flow for drivers
- Multi-language support via next-intl
- Dark-first theme (deep charcoal + electric yellow/cyan accents)

### Out of Scope
- Admin operations (separate app: `admin-frontend/`)
- Real-time GPS tracking
- In-app chat (WhatsApp URL only)
- Surge pricing (fixed prices only)
- Native mobile apps

## Success Criteria

1. A customer can complete the full booking flow end to end
2. A driver can accept a booking and progress it to Completed
3. Payment proof upload and status tracking works
4. All routes are protected by role (customer / driver)
5. Telegram link flow works for drivers
