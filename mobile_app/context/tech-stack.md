# Tech Stack

## Framework & Runtime
- **React Native** via **Expo SDK 56** (React Native 0.85.3, React 19.2.3)
- **TypeScript** ~6.0.3 (Strict mode enabled)

## Navigation & UI
- **Expo Router** ~56.2.8 (File-based routing, deep linking)
- **Expo UI / React Native UI** (Native design system)
- **NativeWind / TailwindCSS** (For styling)
- **Reanimated 3** & **Gesture Handler** (For fluid animations and gestures)
- **Safe Area Context** (Handling notches and safe areas)

## Auth & State Management
- **Clerk** `@clerk/expo` ^3.3.0 (Authentication, Role-based auth via `publicMetadata.role` for 'tourist' vs 'driver')
- **Zustand** (Global client state management for UI/App state)
- **TanStack Query (React Query)** (Server state management, caching, optimistic updates)
- **Axios** (REST API client to Express.js backend)

## Forms & Validation
- **React Hook Form** (Form state management)
- **Zod** (Schema validation for forms and API responses)

## Maps & Location
- **React Native Maps** (Displaying routes and tracking)
- **Expo Location** (User location, driver tracking)

## Media & Storage
- **Expo Image** (Performant image rendering and caching)
- **Expo Secure Store** (Storing sensitive data like auth tokens)
- **Expo File System** (Local file caching)
- **Cloudinary** (Backend-managed; mobile uploads via API signed endpoints)

## Internationalization (i18n)
- **i18next** + **react-i18next** (Client-side translations)
- **expo-localization** (Locale detection)
- Supported locales: `en`, `km`, `zh`, `ja`, `ko`, `fr`

## Tooling & QA
- **ESLint** & **Prettier** (Code formatting and linting)
- **Husky** & **lint-staged** (Pre-commit hooks)
- **Expo Dev Client** (Custom native code development)
- **GitHub Actions** (CI/CD pipeline for EAS builds)

## Backend Integration
- **Express.js REST API** (TypeScript)
- **Supabase** (PostgreSQL) — accessed via backend only.
