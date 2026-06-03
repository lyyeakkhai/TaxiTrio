/**
 * TaxiTrio — Liquid Gold Glass Design System
 * Applies across iOS, Android, and Web.
 */

import '@/global.css';
import { Platform } from 'react-native';

/* ════════════════════════════════════════════════════════════════
   COLORS
════════════════════════════════════════════════════════════════ */
export const Colors = {
  /* ── surfaces ─────────────────────────────────────────────── */
  background:              '#141311',
  backgroundDim:           '#0f0e0c',
  surface:                 '#1d1b19',
  surfaceContainer:        '#211f1d',
  surfaceContainerHigh:    '#2b2a27',
  surfaceContainerHighest: '#363432',
  surfaceBright:           '#3b3936',

  /* ── text ─────────────────────────────────────────────────── */
  text:          '#e7e2dd',
  textSecondary: '#A39E93',
  textMuted:     '#99907c',
  textOnGold:    '#0B0A08',

  /* ── gold ─────────────────────────────────────────────────── */
  gold:          '#f2ca50',
  goldMetallic:  '#D4AF37',
  goldMuted:     '#8A7323',
  goldBright:    '#F9D976',
  goldDark:      '#B8860B',

  /* ── utility ──────────────────────────────────────────────── */
  outline:       '#99907c',
  outlineVariant:'#4d4635',
  success:       '#2E8B57',
  warning:       '#FF8C00',
  error:         '#8B0000',

  /* ── legacy aliases (keep ThemedView/ThemedText working) ── */
  light: {
    text:                '#e7e2dd',
    background:          '#141311',
    backgroundElement:   '#211f1d',
    backgroundSelected:  '#2b2a27',
    textSecondary:       '#A39E93',
  },
  dark: {
    text:                '#e7e2dd',
    background:          '#141311',
    backgroundElement:   '#211f1d',
    backgroundSelected:  '#2b2a27',
    textSecondary:       '#A39E93',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/* ════════════════════════════════════════════════════════════════
   GOLD GRADIENT  (use with expo-linear-gradient or StyleSheet)
════════════════════════════════════════════════════════════════ */
export const GoldGradient = {
  colors: ['#F9D976', '#E9B649', '#B8860B'] as const,
  start:  { x: 0, y: 0 },
  end:    { x: 1, y: 1 },
};

/* ════════════════════════════════════════════════════════════════
   GLASS STYLES  (spread into StyleSheet objects)
════════════════════════════════════════════════════════════════ */
export const GlassStyle = {
  /** Light glass — cards, modals */
  light: {
    backgroundColor: 'rgba(30, 28, 24, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.18)',
  },
  /** Heavy glass — navbars, sticky headers */
  heavy: {
    backgroundColor: 'rgba(11, 10, 8, 0.80)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.1)',
  },
  /** Gold-tinted card glass */
  card: {
    backgroundColor: 'rgba(30, 28, 24, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.18)',
    borderRadius: 24,
  },
} as const;

/* ════════════════════════════════════════════════════════════════
   TYPOGRAPHY
════════════════════════════════════════════════════════════════ */
export const Fonts = Platform.select({
  ios: {
    display: 'Georgia',   // closest system serif to Playfair on iOS
    sans:    'System',
    mono:    'Menlo',
  },
  android: {
    display: 'serif',
    sans:    'sans-serif',
    mono:    'monospace',
  },
  default: {
    display: 'Georgia',
    sans:    'System',
    mono:    'Menlo',
  },
  web: {
    display: 'var(--font-display)',   // Playfair Display via global.css
    sans:    'var(--font-body)',      // Outfit
    mono:    'var(--font-mono)',
  },
})!;

export const Typography = {
  displayLg: {
    fontFamily:    Fonts.display,
    fontSize:      Platform.select({ web: 56, default: 40 }),
    fontWeight:    '600' as const,
    lineHeight:    Platform.select({ web: 62, default: 44 }),
    letterSpacing: -0.8,
    color:         Colors.text,
  },
  displayMd: {
    fontFamily:    Fonts.display,
    fontSize:      Platform.select({ web: 36, default: 28 }),
    fontWeight:    '600' as const,
    lineHeight:    Platform.select({ web: 43, default: 34 }),
    letterSpacing: -0.5,
    color:         Colors.text,
  },
  displaySm: {
    fontFamily:    Fonts.display,
    fontSize:      Platform.select({ web: 24, default: 20 }),
    fontWeight:    '500' as const,
    lineHeight:    Platform.select({ web: 31, default: 26 }),
    color:         Colors.text,
  },
  bodyLg: {
    fontFamily: Fonts.sans,
    fontSize:   18,
    fontWeight: '400' as const,
    lineHeight: 28,
    color:      Colors.textSecondary,
  },
  bodyMd: {
    fontFamily: Fonts.sans,
    fontSize:   16,
    fontWeight: '400' as const,
    lineHeight: 24,
    color:      Colors.textSecondary,
  },
  labelSm: {
    fontFamily:    Fonts.sans,
    fontSize:      12,
    fontWeight:    '600' as const,
    lineHeight:    16,
    letterSpacing: 1.0,
    textTransform: 'uppercase' as const,
    color:         Colors.goldMuted,
  },
} as const;

/* ════════════════════════════════════════════════════════════════
   SPACING
════════════════════════════════════════════════════════════════ */
export const Spacing = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
  section: 80,
} as const;

/* ════════════════════════════════════════════════════════════════
   RADIUS
════════════════════════════════════════════════════════════════ */
export const Radius = {
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  full: 9999,
} as const;

/* ════════════════════════════════════════════════════════════════
   SHADOWS
════════════════════════════════════════════════════════════════ */
export const Shadows = {
  card: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.45,
      shadowRadius: 24,
    },
    android: { elevation: 12 },
    default: {},
  }),
  goldGlow: Platform.select({
    ios: {
      shadowColor: '#D4AF37',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
    default: {},
  }),
} as const;

/* ════════════════════════════════════════════════════════════════
   LAYOUT
════════════════════════════════════════════════════════════════ */
export const BottomTabInset   = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth  = 800;
export const ContainerMargin  = 24;
