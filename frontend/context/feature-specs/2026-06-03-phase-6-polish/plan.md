# Implementation Plan: Phase 6 (Polish & Production Readiness)

## 1. i18n Completion
- [x] Add `LocaleSwitcher` component to both customer and driver layout navbars.
- [x] Generate automatic translations for `km.json`, `zh.json`, `ja.json`, `ko.json`, and `fr.json` using `en.json` as the base so the switcher is fully testable.
- [x] Ensure all user-facing strings in the app use `useTranslations()`.

## 2. Theme Toggle
- [x] Install `next-themes` and create `components/ThemeToggle.tsx`.
- [x] Update `app/providers.tsx` to wrap the app with `ThemeProvider`.
- [x] Add `ThemeToggle` to both layout navbars.

## 3. Error Handling (Next.js & Sentry)
- [x] Create `app/error.tsx` (global error boundary) and `app/not-found.tsx` (404 page).
- [x] Create `app/[locale]/customer/error.tsx` and `app/[locale]/driver/error.tsx`.
- [x] Install `@sentry/nextjs` and configure with placeholder keys for local development.

## 4. Responsive QA
- [x] Audit pages at mobile (375px), tablet (768px), desktop (1280px) breakpoints.
- [x] Fix any layout overflows or unreadable text.
- [x] Verify touch targets are at least 44px on mobile.

## 5. Build Verification
- [x] Run `npm run build` to ensure zero errors and zero TypeScript errors.
- [x] Run `npm run lint` for a clean pass.
- [x] Update `context/progress-tracker.md` to reflect Phase 6 as complete.
