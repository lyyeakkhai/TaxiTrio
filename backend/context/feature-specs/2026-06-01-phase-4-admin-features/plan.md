# Phase 4 — Admin Features: Implementation Plan

## Group 1 — Admin Users & Drivers

1. `src/modules/users/use-cases/list-users.usecase.ts` — list all users, optional `role` filter
2. `src/modules/users/use-cases/get-user.usecase.ts` — fetch user by id, throw 404 if missing
3. `src/modules/users/use-cases/index.ts` — add new exports
4. `src/modules/users/user.controller.ts` — add `listAll`, `getOne` methods
5. `src/modules/users/user.routes.ts` — add `GET /api/admin/users`, `GET /api/admin/users/:id` (admin guard)
6. `src/modules/drivers/use-cases/list-drivers.usecase.ts` — list all drivers, optional `verification_status` / `is_available` filters
7. `src/modules/drivers/use-cases/get-driver.usecase.ts` — fetch driver by id, throw 404
8. `src/modules/drivers/use-cases/update-driver-admin.usecase.ts` — admin update (name, phone, languages, taxi_id)
9. `src/modules/drivers/use-cases/delete-driver.usecase.ts` — block if active bookings; hard delete otherwise
10. `src/modules/drivers/use-cases/approve-driver.usecase.ts` — set `verification_status = approved`, throw 400 if not pending
11. `src/modules/drivers/use-cases/reject-driver.usecase.ts` — set `verification_status = rejected`, throw 400 if not pending
12. `src/modules/drivers/use-cases/index.ts` — add new exports
13. `src/modules/drivers/driver.controller.ts` — add admin methods
14. `src/modules/drivers/driver.routes.ts` — add admin routes with `requireRole('admin')`
15. `tests/admin-users-drivers.test.ts` — unit tests for all 6 use cases

## Group 2 — Taxis CRUD

16. `src/modules/taxis/taxi.schema.ts` — `CreateTaxiSchema`, `UpdateTaxiSchema`
17. `src/modules/taxis/use-cases/create-taxi.usecase.ts` — validate unique plate, upload photo → Cloudinary, create record
18. `src/modules/taxis/use-cases/update-taxi.usecase.ts` — optional photo re-upload, update fields
19. `src/modules/taxis/use-cases/delete-taxi.usecase.ts` — soft delete if bookings exist; hard delete otherwise
20. `src/modules/taxis/use-cases/toggle-taxi.usecase.ts` — flip `is_active`
21. `src/modules/taxis/use-cases/index.ts` — add new exports
22. `src/modules/taxis/taxi.controller.ts` — add admin CRUD methods
23. `src/modules/taxis/taxi.routes.ts` — add admin routes
24. `tests/admin-taxis.test.ts` — unit tests for all 4 use cases

## Group 3 — Routes & Tours CRUD

25. `src/modules/routes/route.schema.ts` — `CreateRouteSchema`, `UpdateRouteSchema`
26. `src/modules/routes/use-cases/create-route.usecase.ts`
27. `src/modules/routes/use-cases/update-route.usecase.ts`
28. `src/modules/routes/use-cases/delete-route.usecase.ts` — block if active bookings
29. `src/modules/routes/use-cases/toggle-route.usecase.ts`
30. `src/modules/routes/use-cases/index.ts` — add new exports
31. `src/modules/routes/route.controller.ts` — add admin methods
32. `src/modules/routes/route.routes.ts` — add admin routes
33. `src/modules/tours/tour.schema.ts` — `CreateTourSchema`, `UpdateTourSchema`
34. `src/modules/tours/use-cases/create-tour.usecase.ts`
35. `src/modules/tours/use-cases/update-tour.usecase.ts`
36. `src/modules/tours/use-cases/delete-tour.usecase.ts`
37. `src/modules/tours/use-cases/toggle-tour.usecase.ts`
38. `src/modules/tours/use-cases/index.ts` — add new exports
39. `src/modules/tours/tour.controller.ts` — add admin methods
40. `src/modules/tours/tour.routes.ts` — add admin routes
41. `tests/admin-routes-tours.test.ts` — unit tests for create/update/delete/toggle on both

## Group 4 — Bookings + Driver Assignment

42. `src/modules/bookings/use-cases/list-bookings-admin.usecase.ts` — all bookings, optional filters
43. `src/modules/bookings/use-cases/assign-booking.usecase.ts` — validate driver approved + available, transition `pending → assigned`, call `notifyDriver()`, create notification record
44. `src/modules/bookings/use-cases/cancel-booking-admin.usecase.ts` — cancel any non-terminal booking
45. `src/modules/bookings/use-cases/index.ts` — add new exports
46. `src/modules/bookings/booking.controller.ts` — add admin methods
47. `src/modules/bookings/booking.routes.ts` — add admin routes
48. `tests/admin-bookings.test.ts` — unit tests for list, assign, cancel

## Group 5 — Payments (read-only admin)

49. `src/modules/payments/use-cases/list-payments-admin.usecase.ts` — all payments, optional `status` / `booking_id` filter
50. `src/modules/payments/use-cases/get-payment-admin.usecase.ts` — payment detail by id
51. `src/modules/payments/use-cases/index.ts` — add new exports
52. `src/modules/payments/payment.controller.ts` — add admin list/get methods
53. `src/modules/payments/payment.routes.ts` — add admin routes
54. `tests/admin-payments.test.ts` — unit tests for list and get

## Group 6 — Complaints & Assistance

55. `src/modules/complaints/use-cases/list-complaints-admin.usecase.ts`
56. `src/modules/complaints/use-cases/get-complaint.usecase.ts`
57. `src/modules/complaints/use-cases/reply-complaint.usecase.ts` — set `admin_reply`, status → `replied`, create notification
58. `src/modules/complaints/use-cases/resolve-complaint.usecase.ts` — status → `resolved`
59. `src/modules/complaints/use-cases/index.ts` — add new exports
60. `src/modules/complaints/complaint.controller.ts` — add admin methods
61. `src/modules/complaints/complaint.routes.ts` — add admin routes
62. `src/modules/assistance/assistance.schema.ts` — `CreateAssistanceSchema`, `UpdateAssistanceSchema`
63. `src/modules/assistance/use-cases/create-assistance.usecase.ts`
64. `src/modules/assistance/use-cases/update-assistance.usecase.ts`
65. `src/modules/assistance/use-cases/delete-assistance.usecase.ts`
66. `src/modules/assistance/use-cases/toggle-assistance.usecase.ts`
67. `src/modules/assistance/use-cases/index.ts` — add new exports
68. `src/modules/assistance/assistance.controller.ts` — add admin methods
69. `src/modules/assistance/assistance.routes.ts` — add admin routes
70. `tests/admin-complaints-assistance.test.ts` — unit tests for all use cases

## Group 7 — Dashboard Stats

71. `src/modules/admin/use-cases/get-dashboard-stats.usecase.ts` — single Prisma query for revenue, completed trips, pending bookings, open complaints, pending drivers
72. `src/modules/admin/admin.controller.ts`
73. `src/modules/admin/admin.routes.ts` — `GET /api/admin/dashboard`
74. `src/modules/admin/index.ts`
75. `src/app.ts` — register admin router
76. `tests/admin-dashboard.test.ts` — unit test for stats use case
