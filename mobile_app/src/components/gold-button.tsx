/**
 * GoldButton — Liquid Gold Glass primary button.
 * Uses a gold gradient background with dark text.
 */
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Radius, Fonts } from '@/constants/theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'gold' | 'glass';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export function GoldButton({ label, onPress, variant = 'gold', style, textStyle, disabled }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.82}
      style={[
        styles.base,
        variant === 'gold'  && styles.gold,
        variant === 'glass' && styles.glass,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.label, variant === 'glass' && styles.labelGlass, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius:   Radius.full,
    paddingVertical:  15,
    paddingHorizontal:28,
    alignItems:     'center',
    justifyContent: 'center',
  },
  gold: {
    // React Native doesn't support CSS gradients in StyleSheet —
    // use a solid gold base; wrap with LinearGradient for full gradient.
    backgroundColor: Colors.goldMetallic,
    shadowColor:     Colors.goldMetallic,
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.4,
    shadowRadius:    16,
    elevation:       8,
  },
  glass: {
    backgroundColor: 'rgba(30, 28, 24, 0.6)',
    borderWidth:     1,
    borderColor:     'rgba(212, 175, 55, 0.3)',
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    fontFamily:  Fonts.sans,
    fontSize:    16,
    fontWeight:  '700',
    letterSpacing: 0.3,
    color:       Colors.textOnGold,
  },
  labelGlass: {
    color: Colors.gold,
  },
});
