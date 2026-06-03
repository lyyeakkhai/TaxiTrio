# Validation Criteria: Phase 6

## Success Metrics
The phase is considered complete when the production build succeeds without errors, and the UI remains intact on small screens.

## Acceptance Criteria
- **Build**: `npm run build` passes with zero errors (including TS errors).
- **Responsive**: All pages render without horizontal overflow on mobile viewports (375px).
- **i18n**: Switching languages updates the UI correctly with the generated translations.
- **Theme**: Toggling between light and dark modes works flawlessly without hardcoded hex colors breaking the design.
- **Error Boundaries**: Triggering a runtime error renders the custom `error.tsx` fallback UI.
