# UI Context

## Theme

Dark-first. Default background is deep charcoal/near-black (`#121212`). Light mode is supported via Tailwind's `dark:` variant but dark is the primary experience. No hardcoded hex values in components — use CSS custom property tokens only.

## Colors

| Role | CSS Variable | Value |
| --- | --- | --- |
| Page background | `--bg-base` | `#121212` |
| Surface / card | `--bg-surface` | `#1a1a2e` |
| Primary text | `--text-primary` | `#f0f0f0` |
| Muted text | `--text-muted` | `#888899` |
| Accent (electric yellow) | `--accent-primary` | `#f5e642` |
| Accent alt (cyan) | `--accent-secondary` | `#00e5ff` |
| Border | `--border-default` | `#2a2a3a` |
| Error | `--state-error` | `#ff4d4f` |
| Success | `--state-success` | `#52c41a` |

Map these to shadcn/ui CSS variables in `globals.css` so all shadcn components inherit the palette automatically.

## Typography

| Role | Font | Variable |
| --- | --- | --- |
| UI text | Geist Sans | `--font-geist-sans` |
| Code/mono | Geist Mono | `--font-geist-mono` |

## Component Library

shadcn/ui on top of Tailwind CSS. Components live in `components/ui/`. Use the shadcn CLI to add new components — do not write from scratch.

## Layout Patterns

- **Dashboard**: sidebar nav + main content area
- **Modals**: centered overlay with backdrop blur (`Dialog` from shadcn/ui)
- **Navbar**: top bar with role-based navigation links and Clerk `UserButton`

## Icons

Lucide React. Stroke-based icons only.
- Inline: `h-4 w-4`
- Buttons: `h-5 w-5`

## Booking Status Badge Colors

| Status | Color |
| --- | --- |
| pending | yellow |
| assigned | blue |
| accepted | indigo |
| driver_arrived | purple |
| in_progress | orange |
| completed | green |
| cancelled | gray |
| rejected | red |
