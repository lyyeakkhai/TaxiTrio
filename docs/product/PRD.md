# TaxiTrio — Product Requirements Document

**Version 4** | Smart Tourist Transportation and Tour Booking Platform

---

## 1. Project Purpose

TaxiTrio is designed to help **international travelers in Cambodia** book safe, reliable, and transparent transportation services.

Based on HCI research, the target user is an independent tourist or business traveler who needs reliable transportation between cities, clear pricing, trusted drivers, and simple communication through familiar tools like WhatsApp.

The system is not just a taxi booking app. It is a **tourist-focused transportation and tour booking platform**.

---

## 2. HCI Problem Connection

### Main User Pain Points

| HCI Pain Point | System Solution |
|---|---|
| Hidden fees | Fixed route prices and fare breakdown |
| Scam drivers | Verified drivers and reviews |
| Unclear vehicle quality | Taxi gallery with vehicle photos |
| Booking uncertainty | Booking status tracking |
| Language barriers | Driver language information |
| Manual WhatsApp booking delay | WhatsApp booking shortcut |
| Tourist travel anxiety | Travel guide and support center |
| Long-distance route uncertainty | Intercity route packages |
| Tour planning difficulty | Tour package booking |

The platform directly answers the POV statement: travelers need a simple way to book reliable intercity rides with upfront pricing because they fear hidden scams and low trust.

---

## 3. Main User Roles

### 1. Customer / Tourist

**Main goal:** Book safe transportation or tour packages with clear prices.

**Features:**
- Register / Login
- Browse taxis
- Browse intercity route packages
- Browse tour packages
- Book taxi
- Book route package
- Book tour package
- Choose payment method
- Track booking status
- View booking history
- Rate driver
- Submit complaint
- Chat through WhatsApp
- View travel assistance
- Manage profile

### 2. Driver

**Main goal:** Receive assigned trips, manage ride status, and track earnings.

**Features:**
- Register / Login
- Profile management
- Online / Offline toggle
- View assigned bookings
- Accept / Reject booking
- Driver arrived status
- Start trip
- Complete trip
- View earnings
- View ratings
- View assigned route/tour details

### 3. Admin

**Main goal:** Manage the whole transportation business.

**Features:**
- Manage users
- Manage drivers
- Verify drivers
- Manage taxis
- Manage intercity routes
- Manage tour packages
- Assign drivers
- Monitor bookings
- Manage payments
- Reply to complaints
- View analytics
- Manage WhatsApp inquiries

---

## 4. Core Features by Module

### A. Authentication Module

**Purpose:** Secure access for different users.

**Features:**
- Customer register/login
- Driver register/login
- Admin login
- Role-based dashboard
- Logout

**Backend requirements:**
- JWT authentication
- Password hashing
- Role-based route protection

---

### B. Taxi Browsing Module

**Purpose:** Let tourists see the vehicle before booking.

**Features:**

| Field | Description |
|---|---|
| Taxi image | Photo of the vehicle |
| Car model | Make and model |
| Plate number | License plate |
| Car type | Vehicle category |
| Passenger capacity | Max passengers |
| Driver rating | Aggregated star rating |
| Driver language | Languages spoken |
| Availability status | Online/offline |

**HCI connection:** Persona wants to know vehicle quality before booking, especially for long trips.

---

### C. Intercity Route Package Module

**Purpose:** Make long-distance travel easier.

**Example routes:**
- Phnom Penh → Siem Reap
- Phnom Penh → Kampot
- Phnom Penh → Sihanoukville
- Siem Reap → Battambang
- Airport → Hotel

**Features:**

| Field | Description |
|---|---|
| Route name | Name of the route |
| Origin | Departure city/location |
| Destination | Arrival city/location |
| Estimated duration | Travel time |
| Fixed price | Transparent pricing |
| Included services | What's covered |
| Recommended vehicle | Suggested vehicle type |
| Route image | Visual of the route |
| Book route | CTA to book |

**HCI connection:** Target user needs predictable intercity transportation between major Cambodian destinations.

---

### D. Tour Package Module

**Purpose:** Allow tourists to book transportation-based tour experiences.

**Example packages:**
- Angkor Sunrise Tour
- Phnom Penh City Tour
- Kampot Day Trip
- Airport Pickup Package
- Sihanoukville Beach Transfer

**Features:**

| Field | Description |
|---|---|
| Tour name | Name of the tour |
| Tour description | Details about the tour |
| Duration | Length of tour |
| Location | Where the tour takes place |
| Included services | What's covered |
| Vehicle type | Type of vehicle used |
| Price | Cost of the tour |
| Tour image | Visual of the tour |
| Book tour | CTA to book |

**HCI connection:** Journey map includes temple tours and sunrise pickup experiences.

---

### E. Booking Module

**Purpose:** Manage the full booking lifecycle.

**Booking status flow:**
```
Pending → Assigned → Accepted → Driver Arrived → In Progress → Completed
                                                              ↘ Cancelled / Rejected
```

**Features:**
- Create booking
- Assign driver
- Accept booking
- Cancel booking
- Reject booking
- Start trip
- Complete trip
- Booking history
- Status history

---

### F. Payment Module

**Purpose:** Make payment transparent and trackable.

**Supported payment methods:**
- Cash
- ABA Pay
- KHQR
- Wing Pay
- Credit/Debit Card
- In-App Wallet
- Corporate Account

**Payment statuses:**
- Unpaid
- Pending Verification
- Authorized
- Verified
- Captured
- Invoice Pending
- Rejected
- Refunded

**Admin payment features:**
- View payment proof
- Verify payment
- Reject payment
- View transaction ID
- View payment fee
- View net amount

**HCI connection:** Solves the fear of hidden fees and unclear payment handoffs.

---

### G. WhatsApp Integration Module

**Purpose:** Support familiar communication for tourists.

**Features:**
- Book via WhatsApp
- Contact support via WhatsApp
- Auto-filled booking message
- WhatsApp inquiry list for admin

**Example auto-generated message:**
```
Hello, I want to book:
Route: Phnom Penh → Siem Reap
Vehicle: SUV
Date: 12 June 2026
Passengers: 2
```

**HCI connection:** Research says users prefer simple WhatsApp communication instead of downloading another app.

---

### H. Tourist Assistance Module

**Purpose:** Reduce travel anxiety.

**Features:**
- Route travel tips
- Estimated travel time
- Rest stop information
- Emergency contact
- Driver language
- Tourist police contact
- Pickup instruction
- Destination guide

This makes the system more tourist-centered, not just transport-centered.

---

### I. Review and Complaint Module

**Purpose:** Build trust and service quality.

**Features:**
- Rate driver
- Write feedback message
- Submit complaint
- Admin reply to complaint
- Customer views admin reply
- Complaint status tracking

**Complaint categories:**
- Driver Behavior
- Vehicle Condition
- Pricing Issues
- Service Quality
- Other Concerns

---

### J. Admin Analytics Module

**Purpose:** Help the business monitor performance.

**Analytics metrics:**
- Total bookings
- Completed bookings
- Cancelled bookings
- Total revenue
- Pending payments
- Top drivers
- Most booked routes
- Most booked tour packages
- Average driver rating

---

## 5. Detailed Feature Specifications

### 2.1 Authentication & Account Management

**Features:**
- Customer Registration
- Customer Login
- Logout
- Profile Management
- Profile Photo
- Edit Personal Information

**Customer Profile fields:**
- Profile Picture
- Full Name
- Email Address
- Phone Number
- Personal Information

**Purpose:** Personalized booking experience, account management, customer identification.

---

### 2.2 Intercity Route Package Browsing

Customers can browse predefined transportation routes.

**Example routes:**
- Phnom Penh → Siem Reap
- Phnom Penh → Kampot
- Phnom Penh → Sihanoukville
- Airport → Hotel Transfer

**Route information displayed:**
- Origin
- Destination
- Travel Duration
- Price
- Vehicle Recommendation
- Included Services
- Best Departure Time
- Rest Stops

**Purpose:** Reduce uncertainty, transparent travel planning.

---

### 2.3 Tour Package Browsing

Customers can browse available tours.

**Example tours:**
- Angkor Sunrise Tour
- Phnom Penh City Tour
- Kampot Day Trip

**Tour details:**
- Tour Name
- Tour Category
- Location
- Duration
- Price
- Included Services
- Tour Itinerary

**Purpose:** Tour planning, travel convenience.

---

### 2.4 Vehicle Gallery

Customers can browse available vehicles before booking.

**Vehicle information:**
- Vehicle Photo
- Vehicle Model
- Vehicle Type
- License Plate
- Passenger Capacity
- Luggage Capacity
- Comfort Category
- Availability Status

**Driver information shown:**
- Driver Name
- Driver Rating
- Languages Spoken
- Verification Status

**Purpose:** Increase trust, allow informed vehicle selection.

---

### 2.5 Booking System

Customers can book:
- Intercity Routes
- Tour Packages
- Transportation Services

**Booking information required:**
- Travel Date
- Travel Time
- Passenger Count
- Preferred Vehicle
- Payment Method
- Special Travel Notes

**Booking workflow:**
```
Create Booking → Pending → Driver Assigned → Accepted → Driver Arrived → Trip Started → Trip Completed
```

**Purpose:** Complete digital booking process.

---

### 2.6 Booking Tracking

Customers can monitor:
- Current Status
- Assigned Driver
- Vehicle Information
- Payment Status
- Booking Timeline

**Timeline statuses:**
- Pending
- Assigned
- Accepted
- Driver Arrived
- In Progress
- Completed

**Purpose:** Real-time transparency, booking confidence.

---

### 2.7 Payment System

**Supported payment methods:**
- Cash
- ABA Pay
- KHQR
- Wing Pay
- Credit/Debit Card
- In-App Wallet
- Corporate Account

**Payment features:**
- Payment Summary
- Payment Fee Calculation
- Transaction Tracking
- Payment Verification
- Payment Status Monitoring

**Payment statuses:**
- Unpaid
- Pending Verification
- Authorized
- Verified
- Captured
- Invoice Pending
- Rejected

**Purpose:** Secure and transparent payment process.

---

### 2.8 Rating & Review System

After trip completion, customers can:
- Rate Driver
- Submit Review
- Provide Feedback

**Rating information:**
- Star Rating
- Review Message
- Customer Feedback

**Purpose:** Improve service quality, build customer trust.

---

### 2.9 Complaint System

Customers can submit complaints regarding:
- Driver Behavior
- Vehicle Condition
- Pricing Issues
- Service Quality
- Other Concerns

**Features:**
- Complaint Submission
- Complaint Status Tracking
- Admin Responses
- Complaint History

**Purpose:** Customer support, issue resolution.

---

### 2.10 WhatsApp Support Integration

Customers can communicate directly through WhatsApp.

**Available actions:**
- Booking Inquiry
- Customer Support
- Travel Assistance

**Auto-generated message includes:**
- Booking Number
- Trip Information
- Travel Date
- Customer Inquiry

**Purpose:** Familiar communication channel, fast customer support.

---

### 2.11 Tourist Assistance Center

Provides travel-related assistance.

**Assistance categories:**

| Category | Details |
|---|---|
| Emergency Support | Dispatch Contact, Tourist Police, Emergency Contacts, Hospitals |
| Language Support | Driver Languages, Communication Guidance, Travel Notes |
| Route Assistance | Travel Duration, Rest Stops, Departure Recommendations, Route Information |
| Support Contact | WhatsApp Support, Travel Assistance |

**Purpose:** Reduce tourist travel anxiety, improve travel experience.

---

## 6. Driver Features

### 3.1 Driver Authentication
- Driver Login
- Driver Logout
- Secure Dashboard Access

### 3.2 Driver Profile Management

Drivers can update:
- Profile Photo
- Name
- Email
- Phone Number
- Languages (Khmer, English, Chinese, Japanese, Korean, French)

**Purpose:** Support international travelers.

### 3.3 Driver Verification Status

Driver profile displays:
- Verification Status
- Rating Score
- Languages
- Availability Status

**Purpose:** Increase customer confidence.

### 3.4 Trip Management

Drivers can:
- Accept Booking
- Reject Booking
- Mark Driver Arrived
- Start Trip
- Complete Trip

**Trip status flow:**
```
Pending → Accepted → Driver Arrived → In Progress → Completed
```

**Purpose:** Trip execution management.

### 3.5 Earnings Dashboard

Drivers can monitor:
- Completed Trips
- Total Earnings
- Average Rating
- Revenue Information

**Purpose:** Financial visibility.

### 3.6 Review Visibility

Drivers can view:
- Customer Reviews
- Ratings
- Feedback Messages

**Purpose:** Performance improvement.

---

## 7. Administrator Features

### 4.1 Admin Authentication
- Secure Admin Login
- Administrator Dashboard

### 4.2 Admin Profile Management

Administrator can manage:
- Profile Information
- Contact Details
- Profile Image

### 4.3 Dashboard Overview

**Metrics:**
- Revenue
- Completed Trips
- Pending Bookings
- Open Complaints

**Purpose:** Business monitoring.

### 4.4 Booking Management

Administrators can:
- View Bookings
- Monitor Booking Status
- Assign Drivers
- Track Progress

**Purpose:** Operational control.

### 4.5 Driver Management

Administrators can:
- Approve Drivers
- Reject Drivers
- View Driver Information
- Monitor Driver Ratings

**Purpose:** Quality assurance.

### 4.6 Route Package Management

Administrators can manage:
- Intercity Routes
- Route Pricing
- Route Information
- Travel Details

**Purpose:** Transportation service management.

### 4.7 Tour Package Management

Administrators can manage:
- Tour Packages
- Tour Pricing
- Tour Details
- Tour Availability

**Purpose:** Tourism service management.

### 4.8 Payment Management

Administrators can:
- Review Transactions
- Verify Payments
- Reject Payments
- Track Status

**Payment information:**
- Transaction ID
- Payment Method
- Payment Amount
- Verification Type
- Verification Date

**Purpose:** Financial control.

### 4.9 Complaint Management

Administrators can:
- Review Complaints
- Reply to Customers
- Resolve Issues
- Track Complaint Status

**Purpose:** Customer satisfaction.

---

## 8. Platform-Wide Features

### Notification System

System-generated notifications for:
- Booking Created
- Driver Assigned
- Booking Accepted
- Payment Verified
- Trip Completed
- Complaint Replied

### Dark / Light Theme

Users can switch between:
- Light Mode
- Dark Mode

### Responsive Design

Supports:
- Desktop
- Tablet
- Mobile

### Role-Based Access Control

| Role | Access |
|---|---|
| Customer | Booking Features, Tour Features, Travel Assistance |
| Driver | Trip Management, Earnings, Reviews |
| Admin | System Management, Monitoring, Analytics |

---

## 9. Recommended Database Schema

### User and Role Tables
- `users`
- `drivers`
- `admins`

### Vehicle Tables
- `taxis`
- `driver_documents`
- `driver_status`

### Booking Tables
- `bookings`
- `booking_status_history`
- `route_packages`
- `tour_packages`
- `tour_bookings`

### Payment Tables
- `payments`
- `payment_transactions`
- `refunds`

### Support Tables
- `reviews`
- `complaints`
- `notifications`
- `whatsapp_inquiries`
- `tourist_assistance`

### Business Tables
- `driver_earnings`
- `analytics_logs`

---

## 10. Full-Stack Architecture

### Frontend

**Recommended stack:**
- React
- Tailwind CSS
- Axios
- React Router

**Frontend pages:**
- Home Page
- Login/Register
- Customer Dashboard
- Taxi Browser
- Route Packages
- Tour Packages
- Booking Page
- Payment Page
- Booking History
- Driver Dashboard
- Admin Dashboard
- Profile Page
- Travel Assistance Page

### Backend

**Recommended stack:**
- Node.js
- Express.js
- JWT Authentication
- Bcrypt
- REST API

**Backend responsibilities:**
- Handle login/register
- Protect routes by role
- Process bookings
- Update booking status
- Manage payments
- Manage admin operations
- Store reviews and complaints
- Generate analytics

### Database

**Recommended:** PostgreSQL

**Why PostgreSQL:**
- Good for relational data
- Strong foreign key support
- Good for booking/payment systems
- Works well with Node.js

---

## 11. API Structure

### Authentication APIs
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Customer APIs
```
GET  /api/taxis
GET  /api/routes
GET  /api/tours
POST /api/bookings
GET  /api/bookings/my
POST /api/reviews
POST /api/complaints
```

### Driver APIs
```
GET  /api/driver/bookings
PUT  /api/driver/status
PUT  /api/bookings/:id/accept
PUT  /api/bookings/:id/arrived
PUT  /api/bookings/:id/start
PUT  /api/bookings/:id/complete
GET  /api/driver/earnings
```

### Admin APIs
```
GET  /api/admin/users
GET  /api/admin/drivers
PUT  /api/admin/drivers/:id/verify
POST /api/admin/taxis
POST /api/admin/routes
POST /api/admin/tours
PUT  /api/admin/bookings/:id/assign-driver
GET  /api/admin/payments
PUT  /api/admin/payments/:id/verify
PUT  /api/admin/payments/:id/reject
GET  /api/admin/analytics
```

---

## 12. System Flow

### Customer Booking Flow
```
Customer login
↓
Browse route / taxi / tour
↓
Select package
↓
View price breakdown
↓
Confirm booking
↓
Choose payment method
↓
Booking status = Pending
↓
Admin assigns driver
↓
Driver accepts
↓
Driver arrives
↓
Trip starts
↓
Trip completed
↓
Customer rates driver
```

---

## 13. Why This Project Stands Out

This project is different from a normal taxi booking system because it focuses on:
- Tourists
- Intercity travel
- Tour packages
- Fixed transparent pricing
- Verified drivers
- WhatsApp support
- Travel assistance
- Premium vehicle selection

That makes it closer to a **tourism mobility platform** than a simple Grab clone.

---

## 14. Final Project Positioning

> This project is a Smart Tourist Transportation and Tour Booking Platform (TaxiTrio) designed to help travelers in Cambodia book verified drivers, premium vehicles, intercity route packages, and tour experiences with transparent pricing, secure payment options, and travel assistance features.
>
> The system addresses user pain points identified through HCI research, including fear of scams, hidden fees, unreliable drivers, language barriers, and difficulty planning safe transportation in unfamiliar locations.

### Core Value Proposition

This platform combines:

- Transportation Booking
- Intercity Travel Planning
- Tour Package Booking
- Travel Assistance
- Driver Verification
- Transparent Payments
- WhatsApp Support

into a single ecosystem specifically designed for tourists and travelers visiting Cambodia.

This directly addresses HCI research findings regarding:
- Trust and safety
- Hidden pricing concerns
- Transportation uncertainty
- Communication barriers
- Travel planning difficulties
- Need for convenient support channels
