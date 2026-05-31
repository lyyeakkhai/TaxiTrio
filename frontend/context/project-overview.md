# TaxiTrio

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
5. Customer rates the driver and optionally submits a complaint

## Features

### Customer
- Browse taxis, intercity route packages, tour packages
- Book and track bookings (status timeline)
- Pay via Cash, ABA, KHQR, Wing, Card, Wallet, or Corporate
- Rate driver, submit complaint, contact support via WhatsApp
- View tourist assistance center (emergency contacts, route tips, language info)

### Driver
- Accept/reject assigned bookings, update trip status
- View earnings, ratings, and assigned route/tour details
- Toggle online/offline availability

### Admin
- Manage users, drivers (verify/reject), taxis, routes, tours
- Assign drivers to bookings, verify/reject payments
- Reply to complaints, view analytics dashboard

## Scope

### In Scope
- Three-role system: Customer, Driver, Admin
- Booking lifecycle: Pending → Assigned → Accepted → Driver Arrived → In Progress → Completed / Cancelled / Rejected
- Payment proof upload and admin verification
- WhatsApp deep-link integration (no API — pre-filled URL)
- Multi-language support (en, km, zh, ja, ko, fr) via next-intl
- Dark/light theme toggle

### Out of Scope
- Real-time GPS tracking
- In-app chat (WhatsApp URL only)
- Surge pricing (fixed prices only)
- Native mobile apps

## Success Criteria

1. A customer can complete the full booking flow end to end
2. An admin can assign a driver and verify a payment
3. A driver can accept a booking and progress it to Completed
4. All routes are protected by role (customer/driver/admin)
