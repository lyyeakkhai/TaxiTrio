# Phase 2: Customer Browse Features Requirements

## Feature Details & Data Models

### 1. Customer Dashboard
- **Welcome Card**: Displays user name and profile information (fetched via `GET /api/auth/me`).
- **User Data Fields**: `clerk_id`, `name`, `email`, `phone`, `profile_photo` (Cloudinary URL).
- **Quick Links**: Navigation to Taxis, Routes, and Tours.
- **Business Rules**: Only accessible if Clerk `publicMetadata.role` is `customer`.

### 2. Taxi Browser
- **Browse View**: Displays a grid/list of active taxis. Customers only see taxis where `is_active = true`.
- **Taxi Data Fields**: `id`, `model`, `plate_number`, `type` (Sedan, SUV, Van, Minibus), `passenger_capacity`, `luggage_capacity`, `comfort_category` (Standard, Premium, VIP), `photo` (Cloudinary URL).
- **Driver Info**: Joined driver details include `name`, `rating`, `languages`, `verification_status`, and `is_available`.
- **Actions**: View details, proceed to book (passes `?type=taxi&id=...`).

### 3. Route Packages
- **Browse View**: Displays intercity route packages. Customers only see packages where `is_active = true`.
- **Detail View**: Shows full route information.
- **Route Data Fields**: `name` (e.g., Phnom Penh → Siem Reap), `origin`, `destination`, `duration_hours`, `price`, `included_services`, `recommended_vehicle`, `image` (Cloudinary URL).
- **Business Rules**: Prices are fixed by admin (no negotiation/surge pricing).

### 4. Tour Packages
- **Browse View**: Displays active tour packages. Customers only see packages where `is_active = true`.
- **Detail View**: Shows full tour itinerary and information.
- **Tour Data Fields**: `name`, `description`, `duration_hours`, `location`, `included_services`, `vehicle_type`, `price`, `image` (Cloudinary URL).
- **Business Rules**: Prices are fixed. Soft-deleted (`is_active = false`) packages are hidden from customers.

## Decisions & Constraints
- **Routing**: All views are under `app/(customer)/...` and protected by role-based middleware ensuring `role === 'customer'`.
- **State Management**: Use `TanStack Query` for caching and server state synchronization (`useTaxis`, `useRoutes`, `useTours`, `useMe`).
- **Validation**: Strict typing and validation of API responses using `Zod` schemas. Ensure Cloudinary `secure_url` format for all images.
- **UI/UX**: Must follow the project's dark-first theme (deep charcoal + electric accents) utilizing `shadcn/ui` components.
- **Navigation**: "Book" actions will navigate the user to the booking form via query parameters (e.g., `/bookings/new?type=taxi&id=...`), which will be handled in Phase 3.

## Context
These features directly map to Phase 2 of `context/roadmap.md` and satisfy the "Browse" core user flow from `context/project-overview.md`. They implement the customer-facing read operations defined in `docs/features/`.
