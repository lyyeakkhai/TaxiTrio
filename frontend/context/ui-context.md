# UI Context

## Theme

Dark/light mode both supported. Users can toggle between them. Use Tailwind's `dark:` variant throughout — no hardcoded theme values.

## Colors

Use Tailwind semantic tokens and shadcn/ui CSS variables. No hardcoded hex values in components.

| Role | Tailwind / shadcn token |
| --- | --- |
| Page background | `bg-background` |
| Surface / card | `bg-card` |
| Primary text | `text-foreground` |
| Muted text | `text-muted-foreground` |
| Primary accent | `bg-primary` / `text-primary` |
| Border | `border-border` |
| Error / destructive | `text-destructive` |
| Success | `text-green-600 dark:text-green-400` |

## Typography

| Role | Font | Variable |
| --- | --- | --- |
| UI text | Geist Sans | `--font-geist-sans` |
| Code/mono | Geist Mono | `--font-geist-mono` |

## Component Library

shadcn/ui on top of Tailwind CSS. Components live in `components/ui/`. Use the shadcn CLI to add new components — do not write from scratch.

## Layout Patterns

- **Customer dashboard**: sidebar nav + main content area
- **Driver dashboard**: simple single-column with status cards
- **Admin dashboard**: sidebar nav + data tables + stat cards
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
