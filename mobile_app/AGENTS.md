# TaxiTrio Mobile App - Agent Instructions

Welcome, AI Agent! You are working on the mobile app for **TaxiTrio**, a Smart Tourist Transportation and Tour Booking Platform designed for international travelers in Cambodia.

## Project Context
TaxiTrio solves HCI problems for tourists: hidden fees, scam drivers, and booking uncertainty. The platform allows tourists to book reliable intercity rides, taxis, and tour packages with upfront pricing.

## Target Audience for Mobile App
The mobile app serves two main user roles:
1. **Customer / Tourist**: Browse taxis/routes/tours, book rides, track booking status, view travel assistance, make payments, and communicate via WhatsApp.
2. **Driver**: Manage profile, toggle online/offline, view assigned bookings, update trip status (Arrived, Start, Complete), and track earnings.

*(Note: Admin features are handled in a separate Next.js web dashboard).*

## Technical Stack & Constraints
- **Framework**: React Native with **Expo**.
- **IMPORTANT RULE**: **Expo HAS CHANGED.** Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.
- **Authentication**: Clerk (using Clerk Expo/React Native SDK).
- **Backend API**: The mobile app communicates with an existing Express.js REST API.
- **UI/UX**: Focus on a tourist-centered, trustworthy, and modern design. 
- **i18n**: The app must support multiple languages (Khmer, English, Chinese, Japanese, Korean, French) to cater to international tourists.

## Core Modules to Implement
- **Auth Module**: Customer/Driver login via Clerk (role-based metadata `publicMetadata.role`).
- **Browsing**: Taxis, Intercity Route Packages, Tour Packages.
- **Booking Flow**: Create, view, and track bookings (Pending → Assigned → Accepted → Driver Arrived → In Progress → Completed).
- **Payment**: Integration with supported payment methods (Cash, ABA Pay, KHQR, etc.) and uploading proof to Cloudinary.
- **Tourist Assistance & Support**: Route travel tips, emergency contacts, driver language info.
- **WhatsApp Integration**: Deep linking to WhatsApp with pre-filled booking details for support and inquiries.
- **Reviews & Complaints**: Post-trip ratings and feedback submission.

Please refer to the source documents (`docs/product/PRD.md` and `docs/product/ARCHITECTURE.md`) for detailed specifications and API behaviors before making major architectural decisions.
