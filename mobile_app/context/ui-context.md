# UI Context

## Theme Model
TaxiTrio uses a premium **Dark Gold** luxury theme to instill trust, professionalism, and exclusivity. 
- **Style:** Deep dark backgrounds paired with vibrant Gold accents. 
- **Effects:** Glassmorphism (translucent surfaces with blur and subtle light borders) provides depth and modern appeal.

## Core Palette
- **Brand Colors:**
  - Primary (Gold): `#D4AF37` (Used for primary buttons, active icons, highlights)
  - Primary Muted: `#8A7323` (Used for disabled states, secondary borders)
- **Backgrounds (Neutrals):**
  - Deep Background: `#0B0A08` (App background)
  - Surface: `#14120F` (Bottom sheets, modals)
  - Card Surface: `#1E1C18` (Cards, list items)
  - Subtle Border: `rgba(255, 255, 255, 0.1)` (Dividers, card outlines)
- **Typography:**
  - Text Primary: `#F7F5F0` (Headings, primary body text)
  - Text Secondary: `#A39E93` (Subtitles, placeholders, captions)
- **Semantic Colors:**
  - Success: `#16A34A` (Completed bookings, online status)
  - Warning: `#D97706` (Pending, alerts)
  - Danger: `#DC2626` (Errors, cancellations, offline status)
  - Info: `#2563EB` (Informational banners)

## Typography Scale
- **Headings:** Bold, clean sans-serif. 
  - H1: 32px
  - H2: 24px
  - H3: 20px
- **Body:**
  - Body Large: 18px
  - Body Regular: 16px
  - Body Small: 14px (Secondary info)
  - Caption: 12px

## Component Guidelines
- **Buttons:**
  - Primary: Gold background, Deep Background text, slight border radius (8px or 12px).
  - Secondary: Transparent background, Gold border, Gold text.
  - Ghost: Transparent, Text Primary.
- **Cards:**
  - Background: Card Surface (`#1E1C18`).
  - Border: 1px solid Subtle Border.
  - Border Radius: 16px.
  - Padding: 16px inside.
- **Inputs:**
  - Background: Surface (`#14120F`).
  - Border: Subtle Border (focus changes to Gold).
  - Text: Primary Text.

## Implementation via NativeWind
- Expose these colors in `tailwind.config.js`.
- Use classes like `bg-bgDeep`, `text-goldPrimary`, `border-white/10`.
- Maintain strict WCAG contrast ratios, particularly for Gold text on Dark backgrounds.
