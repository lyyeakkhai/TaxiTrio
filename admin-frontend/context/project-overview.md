# TaxiTrio — Admin Frontend

## Overview

The admin frontend is a separate Next.js app for TaxiTrio system administrators. It provides full operational control over the platform: managing users, drivers, taxis, bookings, payments, packages, complaints, and analytics. Only users with `role === "admin"` in Clerk can access it.

## Goals

1. Give admins full visibility and control over all platform operations
2. Enable driver verification, booking assignment, and payment verification workflows
3. Provide analytics to monitor business performance

## Core Admin Workflows

1. Admin signs in via Clerk → redirected to dashboard
2. Reviews pending driver applications → approves or rejects
3. Monitors incoming bookings → assigns available drivers
4. Reviews payment proof images → verifies or rejects payments
5. Replies to customer complaints → marks resolved
6. Creates/updates route packages, tour packages, and taxis
7. Views analytics: revenue, completed trips, top drivers, most booked routes

## Features

### User Management
- List all users (customers, drivers, admins)
- View user profiles

### Driver Management
- List all drivers with verification status, rating, languages
- Approve or reject driver applications
- View driver earnings and customer reviews
- Delete driver (only if no active bookings)

### Taxi Management
- Create, update, deactivate taxis
- Assign driver to taxi
- Upload taxi photos (Cloudinary)
- Plate number must be unique

### Booking Management
- View all bookings with status, customer, driver, type (taxi/route/tour)
- Assign driver to pending bookings
- Cancel bookings

### Payment Management
- View all payments filtered by status
- View payment proof image (Cloudinary URL)
- Verify or reject payment after reviewing proof
- Verify triggers notification to customer

### Route Package Management
- Create, update, deactivate intercity route packages
- Fields: origin, destination, duration, fixed price, included services, recommended vehicle, image

### Tour Package Management
- Create, update, deactivate tour packages
- Fields: name, description, duration, location, included services, vehicle type, price, image

### Complaint Management
- View all complaints with category and status
- Reply to complaints (triggers notification to customer)
- Mark complaints as resolved
- Categories: driver_behavior, vehicle_condition, pricing, service_quality, other

### Analytics Dashboard
- Total bookings, completed, cancelled
- Total revenue, pending payments
- Top drivers by completed trips
- Most booked routes and tour packages
- Average driver rating

## Scope

### In Scope
- Admin role only — enforced at middleware level
- Full CRUD for drivers, taxis, routes, tours
- Booking assignment and payment verification
- Complaint reply and resolution
- Analytics overview

### Out of Scope
- Customer or driver-facing features (those live in `frontend/`)
- Real-time GPS tracking
- Telegram bot management UI (bot runs server-side)

## Success Criteria

1. Admin can approve/reject a driver
2. Admin can assign a driver to a booking
3. Admin can verify or reject a payment after viewing proof
4. Admin can reply to a complaint and mark it resolved
5. Analytics dashboard shows key business metrics
