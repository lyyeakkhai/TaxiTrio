# Code Standard

## React Native & Expo
- Use functional components with hooks; keep components small and composable.
- Prefer Expo SDK APIs over bare React Native when available.
- Follow file-based routing conventions from Expo Router.

## TypeScript
- Explicit types for props, API responses, and domain models.
- Avoid `any`; use Zod for runtime validation.
- Keep shared types near their domain (feature-first structure).

## State & Data
- React Query or equivalent for server state.
- Zustand or context for local UI state.
- Separate API layer (`src/api/`) from UI components.

## Styling
- Use StyleSheet or design tokens; avoid inline styles for complex components.
- Support light and dark themes via tokens and conditional palettes.
- Respect safe area insets; support dynamic type where possible.

## I18n
- All user-facing strings in translation files.
- Use locale-aware formatting for dates, currency, and numbers.

## File Structure (Recommended)
- `src/` with `app/` (Expo Router), `components/`, `screens/`, `features/`, `api/`, `hooks/`, `lib/`, `i18n/`, `assets/`, `types/`.
- One feature folder per domain (booking, payment, assistance, etc.).

## Code Quality
- Keep functions under ~50 lines when practical.
- Single responsibility per file; extract tools and helpers.
- Write readable code over clever abstractions.
- Prefer composition over inheritance.

## Error Handling & Logging
- Surface meaningful errors to users; log technical details.
- Handle loading, empty, and error states for every list.

## Security
- Never store secrets in mobile code.
- Use `expo-secure-store` for tokens; validate session with backend.
- Use HTTPS for all API requests.

## Performance
- Avoid unnecessary re-renders and heavy work on the JS thread.
- Use optimized image components and list virtualization where needed.
