/**
 * NOUVEAUCAP DESIGN SYSTEM
 * =======================
 * 
 * Une identité visuelle moderne, professionnelle et accessible
 * pour les nouveaux immigrants au Canada.
 * 
 * Principes de design:
 * - Confiance: couleurs stables, formes arrondies
 * - Accessibilité: contrastes WCAG 2.1 AA, tailles lisibles
 * - Inclusion: support multilingue, RTL ready
 * - Simplicité: interface épurée, navigation intuitive
 */

// ==================== COULEURS ====================
export const colors = {
  // Palette principale - inspirée du Canada (érable, feuillage, ciel)
  primary: {
    50: '#faf5ff',   // Lavande très clair
    100: '#f3e8ff',  // Lavande clair
    200: '#e9d5ff',  // Violet pâle
    300: '#d8b4fe',  // Violet clair
    400: '#c084fc',  // Violet
    500: '#a855f7',  // Violet principal (érable)
    600: '#9333ea',  // Violet foncé
    700: '#7c3aed',  // Violet profond
    800: '#6b21a8',  // Violet très foncé
    900: '#581c87',  // Violet noir
  },
  
  // Couleur secondaire - Bleu canadien (ciel, lacs)
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Bleu principal
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Accent - Vert érable/feuillage
  accent: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Vert principal
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Neutres - Gris chaleureux
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  
  // Sémantiques
  semantic: {
    success: '#10b981',    // Vert émeraude
    warning: '#f59e0b',    // Ambre
    error: '#ef4444',      // Rouge
    info: '#3b82f6',       // Bleu info
  },
  
  // Statuts d'immigration
  status: {
    permanentResident: '#22c55e',    // Vert - stabilité
    foreignStudent: '#3b82f6',       // Bleu - apprentissage
    openWorkPermit: '#a855f7',       // Violet - flexibilité
    closedWorkPermit: '#f59e0b',     // Ambre - restriction
  },
  
  // Provinciaux (couleurs officielles)
  provinces: {
    QC: '#003da5',  // Bleu Québec
    ON: '#cc0000',  // Rouge Ontario
    BC: '#0047ab',  // Bleu BC
    AB: '#004225',  // Vert Alberta
    MB: '#da291c',  // Rouge Manitoba
    SK: '#006341',  // Vert Saskatchewan
    NS: '#003082',  // Bleu Nouvelle-Écosse
    NB: '#da291c',  // Rouge NB
    PE: '#c41e3a',  // Rouge ÎPE
    NL: '#006341',  // Vert Terre-Neuve
  }
} as const

// ==================== TYPOGRAPHIE ====================
export const typography = {
  // Familles de polices
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
    ].join(', '),
    mono: [
      'JetBrains Mono',
      'Fira Code',
      'Consolas',
      'Monaco',
      'monospace',
    ].join(', '),
  },
  
  // Échelle typographique (basée sur 16px)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  
  // Poids de police
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Hauteurs de ligne
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Espacement des lettres
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const

// ==================== ESPACEMENT ====================
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const

// ==================== BORDER RADIUS ====================
export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
} as const

// ==================== OMBRES ====================
export const shadows = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
  
  // Ombres colorées spéciales
  primary: '0 4px 14px 0 rgba(168, 85, 247, 0.39)',
  secondary: '0 4px 14px 0 rgba(14, 165, 233, 0.39)',
  accent: '0 4px 14px 0 rgba(34, 197, 94, 0.39)',
} as const

// ==================== ANIMATIONS ====================
export const animations = {
  // Durées
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  
  // Courbes d'accélération
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Transitions prédéfinies
  transition: {
    fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

// ==================== BREAKPOINTS (Mobile-first) ====================
export const breakpoints = {
  sm: '640px',   // Téléphones larges
  md: '768px',   // Tablettes
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px', // Grands écrans
} as const

// ==================== Z-INDEX ====================
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const

// ==================== COMPOSANTS PRÉDÉFINIS ====================
export const componentStyles = {
  // Boutons
  button: {
    base: 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    sizes: {
      xs: 'text-xs px-2.5 py-1.5 rounded-md',
      sm: 'text-sm px-3 py-2 rounded-lg',
      md: 'text-sm px-4 py-2.5 rounded-lg',
      lg: 'text-base px-5 py-3 rounded-xl',
      xl: 'text-lg px-6 py-3.5 rounded-xl',
    },
    variants: {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-md hover:shadow-lg',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500',
      outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
      success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    },
  },
  
  // Cards
  card: {
    base: 'bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden',
    hover: 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
    variants: {
      default: '',
      elevated: 'shadow-md',
      bordered: 'border-2',
      gradient: 'bg-gradient-to-br from-white to-gray-50',
    },
  },
  
  // Inputs
  input: {
    base: 'w-full px-4 py-3 text-base border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    states: {
      default: 'bg-white',
      error: 'border-red-500 focus:ring-red-500',
      success: 'border-green-500 focus:ring-green-500',
      disabled: 'bg-gray-100 cursor-not-allowed',
    },
  },
  
  // Badges
  badge: {
    base: 'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full',
    variants: {
      default: 'bg-gray-100 text-gray-700',
      primary: 'bg-primary-100 text-primary-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-amber-100 text-amber-700',
      danger: 'bg-red-100 text-red-700',
      info: 'bg-blue-100 text-blue-700',
    },
  },
  
  // Navigation
  nav: {
    item: 'flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200',
    itemActive: 'flex items-center gap-3 px-4 py-3 text-primary-600 bg-primary-50 rounded-xl font-medium',
  },
} as const

// ==================== CLASSES TAILWIND UTILITAIRES ====================
export const twClasses = {
  // Container responsive
  container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Sections
  section: 'py-12 sm:py-16 lg:py-20',
  sectionHeader: 'text-center max-w-3xl mx-auto mb-12',
  
  // Grilles
  grid: {
    cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
    stats: 'grid grid-cols-2 sm:grid-cols-4 gap-4',
    features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  },
  
  // Flex utilitaires
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
    column: 'flex flex-col',
    columnCenter: 'flex flex-col items-center',
  },
  
  // Text utilitaires
  text: {
    heading1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
    heading2: 'text-2xl sm:text-3xl font-bold tracking-tight',
    heading3: 'text-xl sm:text-2xl font-semibold',
    heading4: 'text-lg sm:text-xl font-semibold',
    body: 'text-base text-gray-600 leading-relaxed',
    bodySmall: 'text-sm text-gray-500',
    caption: 'text-xs text-gray-400',
    label: 'text-sm font-medium text-gray-700',
  },
  
  // Effets
  effects: {
    glass: 'bg-white/80 backdrop-blur-lg',
    gradient: 'bg-gradient-to-r from-primary-500 to-secondary-500',
    gradientText: 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent',
    shadowHover: 'transition-shadow duration-300 hover:shadow-xl',
  },
  
  // Animations
  animate: {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideIn: 'animate-slide-in',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
  },
} as const

// ==================== ACCESSIBILITÉ ====================
export const a11y = {
  // Screen reader only
  srOnly: 'sr-only absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
  
  // Focus visible
  focusVisible: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  
  // Contraste minimum WCAG AA
  minContrast: {
    normalText: 4.5,  // Ratio minimum pour texte normal
    largeText: 3,     // Ratio minimum pour texte large (18px+ bold ou 24px+)
  },
  
  // Tailles minimales tactiles (mobile)
  minTouchTarget: {
    size: '44px',    // Minimum Apple/Google
    spacing: '8px',  // Espacement minimum entre cibles
  },
} as const

// Export type pour utilisation TypeScript
export type ColorScale = typeof colors.primary
export type Spacing = typeof spacing
export type BorderRadius = typeof borderRadius
export type Typography = typeof typography
