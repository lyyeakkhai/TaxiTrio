# Admin Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the TaxiTrio admin dashboard (`admin-frontend/`) — a Next.js 16 app for admins to manage bookings, drivers, taxis, payments, routes, tours, complaints, users, and analytics.

**Architecture:** Feature slice pattern — each feature owns its `actions.ts`, `hooks.ts`, `types.ts`, `schema.ts`, and `components/`. Pages under `app/(admin)/dashboard/` import from features and contain no business logic. All API calls go through `lib/api.ts` (Axios + Clerk token injection).

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Clerk (admin-only auth), Axios, TanStack Query, Zod, Lucide React.

---

See full roadmap at `admin-frontend/context/roadmap.md` — this plan file is the superpowers execution record.

Phases:
1. Foundation — deps, design system, shared components, feature skeletons
2. Booking Management — view all, assign driver, cancel
3. Driver Management — approve/reject, CRUD, delete guard
4. Taxi Management — CRUD, photo upload, driver assignment
5. Payment Management — view all, filter by status
6. Route & Tour Package Management — CRUD with image upload
7. Complaint Management — reply (triggers notification), resolve
8. User Management — read-only list and profiles
9. Analytics Dashboard — stat cards, top drivers, most booked
10. Polish — error boundaries, Sentry, responsive QA, build verification
