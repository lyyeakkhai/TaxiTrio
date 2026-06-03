# Validation: Phase 7 Backend API Integration

1. Check that all API requests inside `features/*/hooks.ts` are using `API_ENDPOINTS` imported from `lib/api-endpoints.ts`.
2. Check that no `"\/api\/"` or `` \`/api/\` `` patterns are present in `frontend/features/`.
3. Check that the build completes successfully with `npm run build`.
4. Ensure `lib/api-endpoints.ts` contains the full set of endpoints documented in the backend specs (`docs/features/*/api.yaml`).
