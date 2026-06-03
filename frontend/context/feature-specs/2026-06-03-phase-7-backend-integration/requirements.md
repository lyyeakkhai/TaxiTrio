# Requirements: Phase 7 Backend API Integration

## Context
The frontend uses various API calls to the backend. Previously, these were hardcoded strings. We need a centralized mapping so that it's easy to change the base URL or path, and so that we have a single source of truth for our API integrations mapping to the `docs/features/` API specs.

## Requirements
- Create a centralized file (`lib/api-endpoints.ts`) containing a mapping of all frontend routes to backend endpoints.
- Extract endpoints from `docs/features/*/api.yaml` and add them to the mapping.
- Replace all hardcoded string URLs in React Query hooks across the `features/` directory with the centralized constants.
- Provide methods for extracting parameters and injecting them into the URLs (e.g. `DETAIL: (id: string) => /api/bookings/${id}`).
