// NouveauCap Mobile Theme

export const colors = {
  primary: '#4F46E5',
  primaryLight: '#818CF8',
  primaryDark: '#3730A3',

  secondary: '#10B981',
  secondaryLight: '#34D399',
  secondaryDark: '#059669',

  accent: '#F59E0B',
  accentLight: '#FBBF24',
  accentDark: '#D97706',

  danger: '#EF4444',
  dangerLight: '#F87171',
  dangerDark: '#DC2626',

  warning: '#F59E0B',
  success: '#10B981',
  info: '#3B82F6',

  // Backgrounds
  background: '#F9FAFB',
  backgroundDark: '#111827',
  surface: '#FFFFFF',
  surfaceDark: '#1F2937',

  // Text
  text: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textDark: '#F9FAFB',
  textSecondaryDark: '#9CA3AF',

  // Borders
  border: '#E5E7EB',
  borderDark: '#374151',

  // Module colors
  immigration: '#4F46E5',
  employment: '#8B5CF6',
  housing: '#EC4899',
  health: '#10B981',
  finance: '#F59E0B',
  community: '#06B6D4',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
