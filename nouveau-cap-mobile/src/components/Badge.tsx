import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, borderRadius, typography, spacing } from '../utils/theme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
}) => {
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: `${colors.primary}20` };
      case 'secondary':
        return { backgroundColor: `${colors.secondary}20` };
      case 'success':
        return { backgroundColor: `${colors.success}20` };
      case 'warning':
        return { backgroundColor: `${colors.warning}20` };
      case 'danger':
        return { backgroundColor: `${colors.danger}20` };
      case 'info':
        return { backgroundColor: `${colors.info}20` };
      default:
        return { backgroundColor: colors.border };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'danger':
        return colors.danger;
      case 'info':
        return colors.info;
      default:
        return colors.textSecondary;
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return { paddingHorizontal: spacing.sm, paddingVertical: 2 };
      case 'lg':
        return { paddingHorizontal: spacing.md, paddingVertical: spacing.xs };
      default:
        return { paddingHorizontal: spacing.sm, paddingVertical: 4 };
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case 'sm':
        return { fontSize: 10 };
      case 'lg':
        return { fontSize: 14 };
      default:
        return { fontSize: 12 };
    }
  };

  return (
    <View style={[styles.badge, getVariantStyles(), getSizeStyles(), style]}>
      <Text
        style={[
          styles.text,
          { color: getTextColor() },
          getTextSize(),
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});
