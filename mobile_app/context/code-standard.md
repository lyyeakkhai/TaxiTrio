# Code Standard

## Architecture & Directory Structure
Adhere to a Feature-Sliced Design / Domain-Driven structure:
- `src/app/`: Expo Router screens and layouts.
- `src/components/`: Reusable, generic UI components (buttons, inputs, cards).
- `src/features/`: Domain-specific modules (e.g., `booking`, `auth`, `driver`). Each feature contains its own `api`, `components`, `hooks`, and `types`.
- `src/hooks/`: Global custom hooks.
- `src/store/`: Zustand global stores.
- `src/lib/`: Third-party library configurations (Axios, Clerk).
- `src/i18n/`: Translation files and setup.
- `src/types/`: Global TypeScript definitions.
- `src/theme/`: Design tokens and tailwind config.

## React Native & Expo Best Practices
- Use functional components with hooks. Keep components small, modular, and composable.
- Prefer Expo SDK APIs over bare React Native community packages when available to ensure compatibility.
- Use `Platform.select` for platform-specific tweaks only when necessary.

## TypeScript
- Define explicit interfaces/types for all Component props, API requests, and responses.
- Avoid `any` at all costs. Use `unknown` if the type is truly dynamic, and narrow it down.
- Use Zod schemas to validate API responses at runtime and infer TypeScript types from them.

## State Management
- **Server State:** Use `TanStack Query` for all API calls. Handle loading, error, and empty states gracefully.
- **Client State:** Use `Zustand` for global UI state. Keep stores granular.
- **Local State:** Use `useState`/`useReducer` for component-level state.

## Styling (NativeWind/Tailwind)
- Use NativeWind for utility-first styling.
- Extract complex or repeated styles into reusable UI components rather than bloating JSX with huge class strings.
- Respect safe area insets using `useSafeAreaInsets`.

## Performance Optimization
- Memoize heavy computations with `useMemo` and stable callbacks with `useCallback`.
- Use `React.memo` for list items and heavy components to prevent unnecessary re-renders.
- Use `FlashList` or `FlatList` with `getItemLayout` for long lists.
- Offload heavy animations to the UI thread using `React Native Reanimated`.
- Optimize images using `expo-image` with appropriate resizing and caching.

## Error Handling & Logging
- Wrap app root and specific features in Error Boundaries.
- Show user-friendly error messages (toast notifications or fallback UI).
- Log technical details/errors using a centralized logger (e.g., Sentry for prod).

## Security
- Never store API keys or secrets in mobile source code.
- Use `expo-secure-store` for authentication tokens.
- Ensure all API communications are over HTTPS.
