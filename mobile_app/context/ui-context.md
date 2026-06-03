# UI Context

## Theme Model
- The app uses a single unified **Dark Gold** luxury theme.
- Focuses on deep dark backgrounds (`#0B0A08`) paired with vibrant Gold (`#D4AF37`) accents for a premium feel.
- Glassmorphism effects (translucent surfaces with light borders) are heavily utilized to provide depth.

## Core Palette
- Brand
  - Primary (Gold): `#D4AF37`
  - Primary Muted: `#8A7323`
- Neutrals / Backgrounds
  - Deep Background: `#0B0A08`
  - Surface: `#14120F`
  - Card Surface: `#1E1C18`
  - Border (Subtle): `rgba(255, 255, 255, 0.1)`
- Typography
  - Text Primary: `#F7F5F0`
  - Text Secondary: `#A39E93`
- Semantic
  - Success: `#16A34A`
  - Warning: `#D97706`
  - Danger: `#DC2626`
  - Info: `#2563EB`

## Tokens to Expose (CSS Variables / Tailwind)
- Background: `--bg-deep`, `--bg-surface`, `--bg-card`
- Text: `--text-primary`, `--text-secondary`
- Brand: `--gold-primary`, `--gold-muted`

## Implementation Notes
- Theme values are configured in `tailwind.config.js` and `global.css`.
- Use the configured Tailwind classes (`bg-bgDeep`, `text-goldPrimary`, etc.) instead of hardcoding hex values in components where possible.
- Ensure WCAG contrast is met for primary text on dark backgrounds.
