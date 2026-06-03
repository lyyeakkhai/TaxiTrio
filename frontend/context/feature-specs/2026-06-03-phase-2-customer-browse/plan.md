# Phase 2: Customer Browse Features Plan

## 1. Taxi Browser (`features/taxi-browser/`)
- **Types**: Define `Taxi` type matching backend response.
- **Schema**: Create Zod schema to parse/validate the `GET /api/taxis` response.
- **Hooks**: Implement `useTaxis()` TanStack Query hook.
- **Components**: 
  - `TaxiCard.tsx`: Display vehicle photo, model, capacity, driver name, rating, and language badges.
  - `TaxiGrid.tsx`: Responsive grid containing `TaxiCard`s, with loading skeleton and empty state handling.
- **Page**: Wire up `app/(customer)/taxis/page.tsx` using `<PageHeader>` and `<TaxiGrid>`.

## 2. Route Packages (`features/route-packages/`)
- **Types & Schema**: Define `RoutePackage` type and Zod validation schema.
- **Hooks**: Implement `useRoutes()` and `useRoute(id)`.
- **Components**:
  - `RouteCard.tsx`: Summary for list view with "Book" CTA.
  - `RouteDetail.tsx`: Full detail view with included services and "Book This Route" button.
- **Pages**:
  - `app/(customer)/routes/page.tsx` (Grid of route cards)
  - `app/(customer)/routes/[id]/page.tsx` (Detail view)

## 3. Tour Packages (`features/tour-packages/`)
- **Types & Schema**: Define `TourPackage` type and Zod validation schema.
- **Hooks**: Implement `useTours()` and `useTour(id)`.
- **Components**:
  - `TourCard.tsx`: Summary for list view with "Book" CTA.
  - `TourDetail.tsx`: Full detail view with itinerary and "Book This Tour" button.
- **Pages**:
  - `app/(customer)/tours/page.tsx` (Grid of tour cards)
  - `app/(customer)/tours/[id]/page.tsx` (Detail view)

## 4. Customer Dashboard (`features/auth/`)
- **Types & Hooks**: Define `User` type. Implement `useMe()` to call `GET /api/auth/me` and auto-create the user if necessary.
- **Page**: Build `app/(customer)/dashboard/page.tsx` with a personalized welcome card and quick links to Browse pages.
