import { Platform, StyleSheet, Text, type TextProps } from 'react-native';
import { Fonts, Colors, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?:
    | 'default'
    | 'title'
    | 'subtitle'
    | 'small'
    | 'smallBold'
    | 'link'
    | 'linkPrimary'
    | 'code'
    | 'label'
    | 'gold';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  // 'gold' type gets a special gold color, others use theme
  const color =
    type === 'gold'
      ? Colors.gold
      : type === 'linkPrimary'
      ? Colors.goldMetallic
      : theme[themeColor ?? 'text'];

  return (
    <Text
      style={[
        { color },
        type === 'default'    && styles.default,
        type === 'title'      && styles.title,
        type === 'subtitle'   && styles.subtitle,
        type === 'small'      && styles.small,
        type === 'smallBold'  && styles.smallBold,
        type === 'link'       && styles.link,
        type === 'linkPrimary'&& styles.linkPrimary,
        type === 'code'       && styles.code,
        type === 'label'      && styles.label,
        type === 'gold'       && styles.gold,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: Fonts.sans,
    fontSize:   16,
    lineHeight: 25,
    fontWeight: '400',
  },
  title: {
    fontFamily:    Fonts.display,
    fontSize:      Platform.select({ web: 48, default: 36 }),
    fontWeight:    '600',
    lineHeight:    Platform.select({ web: 54, default: 40 }),
    letterSpacing: -0.8,
  },
  subtitle: {
    fontFamily:    Fonts.display,
    fontSize:      Platform.select({ web: 32, default: 24 }),
    lineHeight:    Platform.select({ web: 40, default: 30 }),
    fontWeight:    '600',
    letterSpacing: -0.4,
  },
  small: {
    fontFamily: Fonts.sans,
    fontSize:   14,
    lineHeight: 20,
    fontWeight: '400',
  },
  smallBold: {
    fontFamily: Fonts.sans,
    fontSize:   14,
    lineHeight: 20,
    fontWeight: '700',
  },
  link: {
    fontFamily:        Fonts.sans,
    fontSize:          15,
    lineHeight:        22,
    textDecorationLine:'underline',
  },
  linkPrimary: {
    fontFamily:        Fonts.sans,
    fontSize:          15,
    lineHeight:        22,
    fontWeight:        '600',
    textDecorationLine:'underline',
    color:             Colors.goldMetallic,
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: '700' }) ?? '500',
    fontSize:   13,
    lineHeight: 20,
  },
  label: {
    fontFamily:    Fonts.sans,
    fontSize:      11,
    fontWeight:    '700',
    lineHeight:    14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color:         Colors.goldMuted,
  },
  gold: {
    fontFamily: Fonts.display,
    fontSize:   Platform.select({ web: 36, default: 28 }),
    fontWeight: '700',
    lineHeight: Platform.select({ web: 42, default: 34 }),
    color:      Colors.gold,
  },
});
