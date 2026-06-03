# Phase 7: Backend API Integration

## 1. Centralized API Endpoints Map
- [x] Create `lib/api-endpoints.ts` to store all backend API URL constants.
- [x] Extract backend endpoints from `docs/features/*/api.yaml`.
- [x] Inject `API_ENDPOINTS` into all frontend hook files instead of hardcoding strings.

## 2. API Schema Verification
- [ ] Verify that the Zod schemas in the frontend match the OpenAPI schemas defined in `docs/features/`.
- [ ] Update frontend types to accommodate any discrepancies found in the backend YAML definitions.

## 3. End-to-End Type Safety
- [ ] Ensure all `api.get()` and `api.post()` calls have correct TypeScript typings or Zod parsing.
