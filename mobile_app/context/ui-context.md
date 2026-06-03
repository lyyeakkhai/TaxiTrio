# UI Context

## Theme Model
- Light theme defaults.
- Dark theme inverts surface and text roles while keeping the same token names.
- Theme preference is stored locally and respected in safe areas and system bars.

## Core Palette
- Brand
  - Primary: #0EA5E9
  - Primary hover: #0284C7
  - Primary soft: #E0F2FE
- Semantic
  - Success: #16A34A
  - Warning: #D97706
  - Danger: #DC2626
  - Info: #2563EB
- Neutrals
  - Background: #F8FAFC
  - Surface: #FFFFFF
  - Border: #E2E8F0
  - Muted text: #64748B
  - Body text: #0F172A

## Dark Theme Mapping
- Background: #0B1220
- Surface: #111827
- Border: #1F2937
- Muted text: #94A3B8
- Body text: #F8FAFC

## Accent Usage
- Use primary for CTAs, active navigation, and selected states.
- Use semantic colors for status chips, alerts, and payment states.
- Use neutrals for text hierarchy, dividers, and empty states.

## Tokens to Expose
- Background: `bg.primary`, `bg.secondary`, `bg.tertiary`
- Text: `text.primary`, `text.secondary`, `text.disabled`
- Border: `border.default`, `border.focus`
- Status: `status.success`, `status.warning`, `status.danger`, `status.info`

## Implementation Notes
- Keep theme values in a single source of truth, not hardcoded in components.
- Use these tokens for all customer and driver surfaces; the admin dashboard is separate.
- Ensure WCAG contrast is met for primary text and interactive controls.
