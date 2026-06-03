# Requirements & Scope: Phase 6

## Context
Phase 6 focuses on polish and production readiness. It ensures the application is robust, handles errors gracefully, supports multiple languages and themes, and works well across all device sizes.

## Scope
- **i18n**: Fully functional translations for km, zh, ja, ko, fr.
- **Theming**: Dark/light mode support using CSS variables.
- **Error Handling**: React error boundaries across all route segments, plus Sentry SDK setup.
- **Responsive**: Full mobile layout audit.
- **Build Quality**: Zero TypeScript or linting errors during a production build.

## Decisions
- **Translations**: We will generate automatic translations for the placeholder locale files to allow testing the switcher end-to-end.
- **Sentry**: We will install the `@sentry/nextjs` SDK and configure it with mock/placeholder keys for local development to avoid blocking on credentials.
