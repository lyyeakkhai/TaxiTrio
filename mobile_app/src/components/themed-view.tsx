import { View, type ViewProps } from 'react-native';
import { Colors, GlassStyle, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  /** Maps to a key of Colors.dark for background. */
  type?: ThemeColor;
  /** Applies a glass surface style. Overrides `type`. */
  glass?: 'light' | 'heavy' | 'card';
};

export function ThemedView({ style, type, glass, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  const bgStyle = glass
    ? GlassStyle[glass]
    : { backgroundColor: theme[type ?? 'background'] };

  return <View style={[bgStyle, style]} {...otherProps} />;
}
