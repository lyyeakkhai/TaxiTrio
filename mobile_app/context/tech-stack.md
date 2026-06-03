# Tech Stack

## Framework & Runtime
- **React Native** via **Expo SDK 56** (React Native 0.85.3, React 19.2.3)
- **TypeScript** ~6.0.3

## Navigation & UI
- **Expo Router** ~56.2.8 (file-based routing)
- **Expo UI** ~56.0.15 (native design system)
- **React Native Web** ~0.21.0
- **Gesture Handler** ~2.31.1
- **Safe Area Context** ~5.7.0
- **Screens** 4.25.2

## Auth & Backend Communication
- **Clerk** `@clerk/expo` ^3.3.0 (role-based auth via `publicMetadata.role`)
- **Axios** (recommended for REST API calls to Express.js backend)

## Media & Storage
- **Expo Image** ~56.0.9
- **Expo Secure Store** ~56.0.4 (tokens)
- **Expo File System / Asset System** for local caching
- **Cloudinary** (backend-managed; mobile uploads via API signed endpoints)

## Internationalization
- `expo-localization` for locale detection
- `i18next` + `react-i18next` (client-side translations)
- Supported locales: `en`, `km`, `zh`, `ja`, `ko`, `fr`

## Tooling
- **ESLint** via Expo preset
- **Prettier**
- **Expo Go / Dev Client** for development
- **GitHub Actions** for CI

## Backend Integration
- **Express.js REST API** (TypeScript) hosted separately
- **Supabase** (PostgreSQL) — accessed via backend only; never direct from mobile
- **Cloudinary** — image URLs returned by backend
