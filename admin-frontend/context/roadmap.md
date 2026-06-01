# Admin Frontend Roadmap

Architecture: Feature Slice Pattern (see `architecture.md`).
Standards: `code-standards.md` | UI: `ui-context.md` | Rules: `ai-workflow-rules.md`

Complete phases in order — each phase depends on the previous.

---

## Phase 1 — Foundation

**Goal:** Runnable admin app with Clerk auth enforcing `role === "admin"`, shared infrastructure, design system, and all feature slice skeletons.

**Backend dependency:** None — foundation is frontend-only setup.

### 1.1 Install Dependencies

- [ ] `npm install axios zod lucide-react`
- [ ] `npx shadcn@latest init` — configure with dark theme, CSS variables matching `ui-context.md`
- [ ] Add shadcn components: `button card badge dialog input label select textarea toast skeleton table dropdown-menu`

### 1.2 Shared Infrastructure

- [ ] `lib/api.ts` — Axios instance; inject `Authorization: Bearer <clerk_session_token>` via `auth().getToken()` on every request; base URL from `NEXT_PUBLIC_API_URL` (default `http://localhost:5000/api`)
- [ ] `types/index.ts` — shared TypeScript types used across features: `Booking`, `Driver`, `Taxi`, `Payment`, `Complaint`, `Review`, `User`, `RoutePackage`, `TourPackage`, `AssistanceItem`

### 1.3 Design System Wiring

- [ ] `app/globals.css` — map `ui-context.md` CSS variables to shadcn/ui CSS variable names so all shadcn components inherit the dark-first palette (charcoal `#121212`, surface `#1a1a2e`, yellow accent `#f5e642`, cyan `#00e5ff`)
- [ ] `components/StatusBadge.tsx` — booking status badge using colors from `ui-context.md` (pending=yellow, assigned=blue, accepted=indigo, driver_arrived=purple, in_progress=orange, completed=green, cancelled=gray, rejected=red)
- [ ] `components/PageHeader.tsx` — page title + optional subtitle + optional action slot (for "Create" buttons)
- [ ] `components/EmptyState.tsx` — icon + message for empty tables/lists
- [ ] `components/ConfirmDialog.tsx` — reusable confirmation dialog wrapping shadcn `Dialog`; accepts `title`, `description`, `onConfirm`

### 1.4 Admin Layout

- [ ] `app/(admin)/layout.tsx` — sidebar nav with links to all 9 sections + `UserButton`; use `next/link` (not `<a>`); active link highlighted; sidebar uses `--bg-surface` background
- [ ] `app/sign-in/page.tsx` — Clerk `SignIn` component; already exists, verify it renders correctly

### 1.5 Feature Slice Skeletons

For each feature below, create the folder with an empty `actions.ts`, `hooks.ts`, `types.ts`, `schema.ts`, and `components/` directory. These are already partially scaffolded — add missing files:

- [ ] `features/manage-users/` — add `hooks.ts`, `types.ts`, `schema.ts`, `components/`
- [ ] `features/manage-drivers/` — add `hooks.ts`, `types.ts`, `schema.ts`, `components/`
- [ ] `features/manage-taxis/` — add `hooks.ts`, `types.ts`, `schema.ts`, `components/`
- [ ] `features/manage-bookings/` — add `hooks.ts`, `types.ts`, `schema.ts`, `components/`
- [ ] `features/manage-payments/` — add `hooks.ts`, `types.ts`, `schema.ts`, `components/`
- [ ] `features/manage-routes/` — add `hooks.ts`, `types.ts`, `schema.ts`, `components/`
- [ ] `features/manage-tours/` — add `hooks.ts`, `types.ts`, `schema.ts`, `components/`
- [ ] `features/manage-complaints/` — add `hooks.ts`, `types.ts`, `schema.ts`, `components/`
- [ ] `features/analytics/` — add `hooks.ts`, `types.ts`, `components/`

### 1.6 Dashboard Page Stubs

- [ ] Create stub `page.tsx` for every route under `app/(admin)/dashboard/`: `users/`, `drivers/`, `taxis/`, `bookings/`, `payments/`, `routes/`, `tours/`, `complaints/`, `analytics/` — each returns a `<PageHeader>` placeholder

---

## Phase 2 — Booking Management

**Goal:** Admin can view all bookings, filter by status/driver/date, assign a driver to a pending booking, and cancel any booking.

**Backend dependency:** `GET /api/admin/bookings`, `GET /api/admin/bookings/:id`, `PUT /api/admin/bookings/:id/assign`, `PUT /api/admin/bookings/:id/cancel` — see `docs/features/booking/api.yaml`.

### 2.1 Types & Schema (`features/manage-bookings/`)

- [ ] `features/manage-bookings/types.ts` — `Booking` type: `{ id, customer_id, driver_id, taxi_id, route_package_id, tour_package_id, booking_type: 'taxi'|'route'|'tour', travel_date, travel_time, passenger_count, payment_method, special_notes, status, created_at }`; `BookingDetail` extends `Booking` with `status_history: { status, changed_by, changed_at }[]`
- [ ] `features/manage-bookings/schema.ts` — Zod schema for `AssignDriverInput`: `{ driver_id: z.string().uuid() }`

### 2.2 Actions & Hooks

- [ ] `features/manage-bookings/actions.ts` — update existing stub:
  - `getBookings(filters?: { status?, driver_id?, date? })` → `GET /api/admin/bookings`
  - `getBooking(id)` → `GET /api/admin/bookings/:id`
  - `assignDriver(bookingId, driverId)` → `PUT /api/admin/bookings/:id/assign` with `{ driver_id }`
  - `cancelBooking(id)` → `PUT /api/admin/bookings/:id/cancel`
- [ ] `features/manage-bookings/hooks.ts` — `useBookings(filters?)` and `useBooking(id)` TanStack Query hooks wrapping the actions above

### 2.3 Components

- [ ] `features/manage-bookings/components/BookingsTable.tsx` — shadcn `Table`; columns: booking type, customer, driver (or "Unassigned"), travel date, status badge, actions; supports filter by status via `<Select>`
- [ ] `features/manage-bookings/components/AssignDriverDialog.tsx` — `Dialog` with driver `<Select>` (lists approved, available drivers from `GET /api/admin/drivers?verification_status=approved&is_available=true`); calls `assignDriver()`; shows toast on success
- [ ] `features/manage-bookings/components/BookingDetail.tsx` — full booking info + status history timeline + assign/cancel action buttons

### 2.4 Pages

- [ ] `app/(admin)/dashboard/bookings/page.tsx` — `<PageHeader title="Bookings">` + `<BookingsTable>`
- [ ] `app/(admin)/dashboard/bookings/[id]/page.tsx` — `<BookingDetail>`

---

## Phase 3 — Driver Management

**Goal:** Admin can list drivers, filter by verification status, approve/reject applications, update driver records, and delete drivers with no active bookings.

**Backend dependency:** `GET /api/admin/drivers`, `GET /api/admin/drivers/:id`, `PUT /api/admin/drivers/:id`, `DELETE /api/admin/drivers/:id`, `PUT /api/admin/drivers/:id/approve`, `PUT /api/admin/drivers/:id/reject` — see `docs/features/driver-management/api.yaml`.

### 3.1 Types & Schema

- [ ] `features/manage-drivers/types.ts` — `Driver` type: `{ id, user_id, taxi_id, name, phone, languages: string[], verification_status: 'pending'|'approved'|'rejected', rating, is_available, profile_photo, created_at }`
- [ ] `features/manage-drivers/schema.ts` — `DriverAdminUpdateSchema`: `{ name?, phone?, languages?, taxi_id? }`

### 3.2 Actions & Hooks

- [ ] `features/manage-drivers/actions.ts` — update existing stub:
  - `getDrivers(filters?: { verification_status?, is_available? })` → `GET /api/admin/drivers`
  - `getDriver(id)` → `GET /api/admin/drivers/:id`
  - `approveDriver(id)` → `PUT /api/admin/drivers/:id/approve`
  - `rejectDriver(id)` → `PUT /api/admin/drivers/:id/reject`
  - `updateDriver(id, data)` → `PUT /api/admin/drivers/:id`
  - `deleteDriver(id)` → `DELETE /api/admin/drivers/:id` (backend returns 400 if active bookings exist)
- [ ] `features/manage-drivers/hooks.ts` — `useDrivers(filters?)` and `useDriver(id)` TanStack Query hooks

### 3.3 Components

- [ ] `features/manage-drivers/components/DriversTable.tsx` — columns: name, languages, verification status badge, rating, availability, actions (Approve / Reject / View); filter by `verification_status` via `<Select>`
- [ ] `features/manage-drivers/components/DriverDetail.tsx` — profile photo, all fields, earnings summary, reviews list; Approve/Reject/Delete buttons
- [ ] `features/manage-drivers/components/DriverEditForm.tsx` — form for `name`, `phone`, `languages` (multi-select), `taxi_id` (select from active taxis); validates with `DriverAdminUpdateSchema`

### 3.4 Pages

- [ ] `app/(admin)/dashboard/drivers/page.tsx` — `<PageHeader title="Drivers">` + `<DriversTable>`
- [ ] `app/(admin)/dashboard/drivers/[id]/page.tsx` — `<DriverDetail>` + `<DriverEditForm>` in a dialog

---

## Phase 4 — Taxi Management

**Goal:** Admin can create, update, deactivate, and delete taxis; upload taxi photos to Cloudinary via backend; assign a driver to a taxi.

**Backend dependency:** `GET /api/admin/taxis`, `POST /api/admin/taxis`, `GET /api/admin/taxis/:id`, `PUT /api/admin/taxis/:id`, `DELETE /api/admin/taxis/:id`, `PATCH /api/admin/taxis/:id/toggle` — see `docs/features/taxis/api.yaml`.

### 4.1 Types & Schema

- [ ] `features/manage-taxis/types.ts` — `Taxi` type: `{ id, model, plate_number, type: 'Sedan'|'SUV'|'Van'|'Minibus', passenger_capacity, luggage_capacity, comfort_category: 'Standard'|'Premium'|'VIP', photo, driver_id, is_active, created_at }`
- [ ] `features/manage-taxis/schema.ts` — `TaxiInputSchema`: all required fields; `plate_number` must be non-empty string

### 4.2 Actions & Hooks

- [ ] `features/manage-taxis/actions.ts` — update existing stub:
  - `getTaxis(filters?: { is_active? })` → `GET /api/admin/taxis`
  - `getTaxi(id)` → `GET /api/admin/taxis/:id`
  - `createTaxi(formData: FormData)` → `POST /api/admin/taxis` (multipart — photo is binary)
  - `updateTaxi(id, formData: FormData)` → `PUT /api/admin/taxis/:id` (multipart)
  - `deleteTaxi(id)` → `DELETE /api/admin/taxis/:id`
  - `toggleTaxi(id)` → `PATCH /api/admin/taxis/:id/toggle`
- [ ] `features/manage-taxis/hooks.ts` — `useTaxis(filters?)` and `useTaxi(id)` TanStack Query hooks

### 4.3 Components

- [ ] `features/manage-taxis/components/TaxisTable.tsx` — columns: photo thumbnail, model, plate, type, capacity, comfort, driver assigned, active status, actions (Edit / Toggle / Delete)
- [ ] `features/manage-taxis/components/TaxiForm.tsx` — form for all `TaxiInputSchema` fields + photo file input + driver select (approved drivers); submits as `FormData`; used for both create and edit

### 4.4 Pages

- [ ] `app/(admin)/dashboard/taxis/page.tsx` — `<PageHeader title="Taxis" action={<CreateTaxiButton>}>` + `<TaxisTable>`
- [ ] `app/(admin)/dashboard/taxis/new/page.tsx` — `<TaxiForm>` for creation
- [ ] `app/(admin)/dashboard/taxis/[id]/edit/page.tsx` — `<TaxiForm>` pre-filled for editing

---

## Phase 5 — Payment Management

**Goal:** Admin can view all payments filtered by status/date, view payment proof image, and see payment details. Payment status is managed via Clerk billing webhooks (no manual verify/reject in this version per `docs/features/payment/requirement.md`).

**Backend dependency:** `GET /api/admin/payments`, `GET /api/admin/payments/:id` — see `docs/features/payment/api.yaml`.

### 5.1 Types & Schema

- [ ] `features/manage-payments/types.ts` — `Payment` type: `{ id, booking_id, amount, fee, net_amount, status: 'unpaid'|'pending'|'paid'|'failed'|'refunded', clerk_subscription_id, created_at }`

### 5.2 Actions & Hooks

- [ ] `features/manage-payments/actions.ts` — update existing stub:
  - `getPayments(filters?: { status?, date? })` → `GET /api/admin/payments`
  - `getPayment(id)` → `GET /api/admin/payments/:id`
- [ ] `features/manage-payments/hooks.ts` — `usePayments(filters?)` and `usePayment(id)` TanStack Query hooks

### 5.3 Components

- [ ] `features/manage-payments/components/PaymentsTable.tsx` — columns: booking ID, amount, fee, net amount, method, status badge, date; filter by status via `<Select>`
- [ ] `features/manage-payments/components/PaymentDetail.tsx` — all payment fields; booking reference link

### 5.4 Pages

- [ ] `app/(admin)/dashboard/payments/page.tsx` — `<PageHeader title="Payments">` + `<PaymentsTable>`
- [ ] `app/(admin)/dashboard/payments/[id]/page.tsx` — `<PaymentDetail>`

---

## Phase 6 — Route & Tour Package Management

**Goal:** Admin can create, update, deactivate, and delete intercity route packages and tour packages.

**Backend dependency:** `GET /api/admin/routes`, `POST /api/admin/routes`, `PUT /api/admin/routes/:id`, `DELETE /api/admin/routes/:id`, `GET /api/admin/tours`, `POST /api/admin/tours`, `PUT /api/admin/tours/:id`, `DELETE /api/admin/tours/:id` — see `docs/features/route-tour-packages/api.yaml`.

### 6.1 Route Packages (`features/manage-routes/`)

- [ ] `features/manage-routes/types.ts` — `RoutePackage` type: `{ id, name, origin, destination, duration_hours, price, included_services, recommended_vehicle, image, is_active, created_at }`
- [ ] `features/manage-routes/schema.ts` — `RoutePackageSchema`: all required fields; `price` must be positive number
- [ ] `features/manage-routes/actions.ts` — update existing stub:
  - `getRoutes()` → `GET /api/admin/routes`
  - `createRoute(formData: FormData)` → `POST /api/admin/routes` (multipart — image is binary)
  - `updateRoute(id, formData: FormData)` → `PUT /api/admin/routes/:id`
  - `deleteRoute(id)` → `DELETE /api/admin/routes/:id`
  - `toggleRoute(id)` → `PATCH /api/admin/routes/:id/toggle`
- [ ] `features/manage-routes/hooks.ts` — `useRoutes()` TanStack Query hook
- [ ] `features/manage-routes/components/RoutesTable.tsx` — columns: name, origin→destination, duration, price, active status, actions
- [ ] `features/manage-routes/components/RouteForm.tsx` — form for all fields + image upload; used for create and edit
- [ ] `app/(admin)/dashboard/routes/page.tsx` — `<PageHeader title="Routes" action={<CreateRouteButton>}>` + `<RoutesTable>`
- [ ] `app/(admin)/dashboard/routes/new/page.tsx` — `<RouteForm>` for creation
- [ ] `app/(admin)/dashboard/routes/[id]/edit/page.tsx` — `<RouteForm>` pre-filled

### 6.2 Tour Packages (`features/manage-tours/`)

- [ ] `features/manage-tours/types.ts` — `TourPackage` type: `{ id, name, description, duration_hours, location, included_services, vehicle_type, price, image, is_active, created_at }`
- [ ] `features/manage-tours/schema.ts` — `TourPackageSchema`: all required fields; `price` must be positive number
- [ ] `features/manage-tours/actions.ts` — update existing stub:
  - `getTours()` → `GET /api/admin/tours`
  - `createTour(formData: FormData)` → `POST /api/admin/tours` (multipart)
  - `updateTour(id, formData: FormData)` → `PUT /api/admin/tours/:id`
  - `deleteTour(id)` → `DELETE /api/admin/tours/:id`
  - `toggleTour(id)` → `PATCH /api/admin/tours/:id/toggle`
- [ ] `features/manage-tours/hooks.ts` — `useTours()` TanStack Query hook
- [ ] `features/manage-tours/components/ToursTable.tsx` — columns: name, location, duration, price, vehicle type, active status, actions
- [ ] `features/manage-tours/components/TourForm.tsx` — form for all fields + image upload; used for create and edit
- [ ] `app/(admin)/dashboard/tours/page.tsx` — `<PageHeader title="Tours" action={<CreateTourButton>}>` + `<ToursTable>`
- [ ] `app/(admin)/dashboard/tours/new/page.tsx` — `<TourForm>` for creation
- [ ] `app/(admin)/dashboard/tours/[id]/edit/page.tsx` — `<TourForm>` pre-filled

---

## Phase 7 — Complaint Management

**Goal:** Admin can view all complaints filtered by status/category, reply to open complaints (triggers in-system notification to customer), and mark complaints as resolved.

**Backend dependency:** `GET /api/admin/complaints`, `GET /api/admin/complaints/:id`, `PUT /api/admin/complaints/:id/reply`, `PUT /api/admin/complaints/:id/resolve`, `DELETE /api/admin/complaints/:id` — see `docs/features/reviews-complaints/api.yaml`.

### 7.1 Types & Schema

- [ ] `features/manage-complaints/types.ts` — `Complaint` type: `{ id, booking_id, customer_id, category: 'driver_behavior'|'vehicle_condition'|'pricing'|'service_quality'|'other', description, status: 'open'|'replied'|'resolved', admin_reply, replied_at, created_at }`
- [ ] `features/manage-complaints/schema.ts` — `ReplySchema`: `{ admin_reply: z.string().min(1) }`

### 7.2 Actions & Hooks

- [ ] `features/manage-complaints/actions.ts` — update existing stub:
  - `getComplaints(filters?: { status?, category? })` → `GET /api/admin/complaints`
  - `getComplaint(id)` → `GET /api/admin/complaints/:id`
  - `replyToComplaint(id, admin_reply)` → `PUT /api/admin/complaints/:id/reply` — sets status to `replied`, triggers notification to customer
  - `resolveComplaint(id)` → `PUT /api/admin/complaints/:id/resolve` — sets status to `resolved`
  - `deleteComplaint(id)` → `DELETE /api/admin/complaints/:id`
- [ ] `features/manage-complaints/hooks.ts` — `useComplaints(filters?)` and `useComplaint(id)` TanStack Query hooks

### 7.3 Components

- [ ] `features/manage-complaints/components/ComplaintsTable.tsx` — columns: category badge, customer, booking ID, status badge, created date, actions (View / Resolve / Delete); filter by status and category
- [ ] `features/manage-complaints/components/ComplaintDetail.tsx` — full complaint info + reply form (textarea + submit); resolve button; shows existing `admin_reply` if present
- [ ] `features/manage-complaints/components/ReplyForm.tsx` — textarea for `admin_reply`; validates with `ReplySchema`; submit calls `replyToComplaint()`; shows toast on success

### 7.4 Pages

- [ ] `app/(admin)/dashboard/complaints/page.tsx` — `<PageHeader title="Complaints">` + `<ComplaintsTable>`
- [ ] `app/(admin)/dashboard/complaints/[id]/page.tsx` — `<ComplaintDetail>`

---

## Phase 8 — User Management

**Goal:** Admin can view all users and their profiles. Read-only — no create/delete from admin UI (users are created via Clerk sign-up).

**Backend dependency:** `GET /api/admin/users`, `GET /api/admin/users/:id` — see `docs/features/authentication/api.yaml`.

### 8.1 Types & Actions

- [ ] `features/manage-users/types.ts` — `User` type: `{ id, clerk_id, name, email, phone, profile_photo, role: 'customer'|'driver'|'admin', created_at }`
- [ ] `features/manage-users/actions.ts` — update existing stub:
  - `getUsers()` → `GET /api/admin/users`
  - `getUser(id)` → `GET /api/admin/users/:id`
- [ ] `features/manage-users/hooks.ts` — `useUsers()` and `useUser(id)` TanStack Query hooks

### 8.2 Components & Pages

- [ ] `features/manage-users/components/UsersTable.tsx` — columns: name, email, phone, role badge, joined date
- [ ] `features/manage-users/components/UserDetail.tsx` — profile photo, all fields, role badge
- [ ] `app/(admin)/dashboard/users/page.tsx` — `<PageHeader title="Users">` + `<UsersTable>`
- [ ] `app/(admin)/dashboard/users/[id]/page.tsx` — `<UserDetail>`

---

## Phase 9 — Analytics Dashboard

**Goal:** Admin sees key business metrics: total/completed/cancelled bookings, total revenue, pending payments, top drivers, most booked routes and tours, average driver rating.

**Backend dependency:** `GET /api/admin/analytics` — see `docs/product/PRD.md` section 4.3.

### 9.1 Types & Actions

- [ ] `features/analytics/types.ts` — `Analytics` type: `{ total_bookings, completed_bookings, cancelled_bookings, total_revenue, pending_payments, top_drivers: { driver_id, name, completed_trips }[], most_booked_routes: { route_id, name, count }[], most_booked_tours: { tour_id, name, count }[], average_driver_rating }`
- [ ] `features/analytics/actions.ts` — update existing stub: `getAnalytics()` → `GET /api/admin/analytics`
- [ ] `features/analytics/hooks.ts` — `useAnalytics()` TanStack Query hook; `staleTime: 5 * 60_000` (5 min)

### 9.2 Components

- [ ] `features/analytics/components/StatCard.tsx` — single metric card: label + value + optional icon; uses `--bg-surface` background
- [ ] `features/analytics/components/TopDriversTable.tsx` — ranked list: driver name, completed trips
- [ ] `features/analytics/components/MostBookedTable.tsx` — reusable for routes and tours: name, booking count

### 9.3 Pages

- [ ] `app/(admin)/dashboard/page.tsx` — update stub: 4 `StatCard` components (total bookings, revenue, pending payments, open complaints) + `TopDriversTable` + two `MostBookedTable` (routes, tours) + average rating card

---

## Phase 10 — Polish & Production Readiness

**Goal:** Error boundaries, build verification, responsive QA, Sentry integration.

**Backend dependency:** None.

### 10.1 Error Handling

- [ ] `app/error.tsx` — global error boundary page
- [ ] `app/(admin)/error.tsx` — admin-scoped error boundary
- [ ] `app/not-found.tsx` — 404 page

### 10.2 Sentry

- [ ] `npm install @sentry/nextjs`
- [ ] `sentry.client.config.ts` and `sentry.server.config.ts` — DSN from `NEXT_PUBLIC_SENTRY_DSN` env var
- [ ] Wrap `app/layout.tsx` with Sentry error boundary

### 10.3 Responsive QA

- [ ] Audit all pages at mobile (375px), tablet (768px), desktop (1280px)
- [ ] Sidebar collapses to icon-only or hamburger on mobile
- [ ] Tables scroll horizontally on small screens — no overflow clipping

### 10.4 Build Verification

- [ ] `npm run build` passes with zero errors and zero TypeScript errors
- [ ] `npm run lint` passes clean
- [ ] Update `context/progress-tracker.md` to reflect all completed phases

---

## Backend Readiness Map

Do not start a frontend phase until the corresponding backend endpoints are available.

| Admin Frontend Phase | Required Backend Endpoints | Backend Module |
|---|---|---|
| Phase 1 — Foundation | None | — |
| Phase 2 — Bookings | `GET/PUT /api/admin/bookings*` | backend/modules/bookings |
| Phase 3 — Drivers | `GET/PUT/DELETE /api/admin/drivers*` | backend/modules/drivers |
| Phase 4 — Taxis | `GET/POST/PUT/DELETE/PATCH /api/admin/taxis*` | backend/modules/taxis |
| Phase 5 — Payments | `GET /api/admin/payments*` | backend/modules/payments |
| Phase 6 — Routes & Tours | `GET/POST/PUT/DELETE /api/admin/routes*`, `GET/POST/PUT/DELETE /api/admin/tours*` | backend/modules/routes, tours |
| Phase 7 — Complaints | `GET/PUT/DELETE /api/admin/complaints*` | backend/modules/complaints |
| Phase 8 — Users | `GET /api/admin/users*` | backend/modules/users |
| Phase 9 — Analytics | `GET /api/admin/analytics` | backend/modules/analytics |
| Phase 10 — Polish | None | — |

---

## Backend Modules Still Needed

The following backend modules are **not yet implemented** (as of 2026-06-01) and must be built before the corresponding admin frontend phase can be completed:

| Module | Endpoints | Admin Phase |
|---|---|---|
| bookings | `GET/PUT /api/admin/bookings*` | Phase 2 |
| drivers | `GET/PUT/DELETE /api/admin/drivers*` | Phase 3 |
| taxis (admin CRUD) | `POST/PUT/DELETE/PATCH /api/admin/taxis*` | Phase 4 |
| payments | `GET /api/admin/payments*` | Phase 5 |
| routes (admin CRUD) | `POST/PUT/DELETE /api/admin/routes*` | Phase 6 |
| tours (admin CRUD) | `POST/PUT/DELETE /api/admin/tours*` | Phase 6 |
| complaints | `GET/PUT/DELETE /api/admin/complaints*` | Phase 7 |
| users (admin list) | `GET /api/admin/users*` | Phase 8 |
| analytics | `GET /api/admin/analytics` | Phase 9 |

Already implemented in backend: `GET /api/taxis`, `GET /api/routes`, `GET /api/routes/:id`, `GET /api/tours`, `GET /api/tours/:id`, `GET /api/assistance`, `POST /api/users`, `GET /api/users/me`.

---

## Legend

| Symbol | Meaning |
|---|---|
| 🔴 | Not started |
| 🟡 | In progress |
| 🟢 | Complete |
