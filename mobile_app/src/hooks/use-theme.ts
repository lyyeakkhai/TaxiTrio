/**
 * TaxiTrio — Liquid Gold Glass theme hook.
 * Always returns the dark gold palette regardless of system color scheme.
 */

import { Colors } from '@/constants/theme';

export function useTheme() {
  // Liquid Gold Glass is a dark-only design system
  return Colors.dark;
}
