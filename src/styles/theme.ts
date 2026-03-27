const colors = {
  // Primary palette (aligned to Kept Protocol brand tones)
  primary: {
    50: '#f3fbf9',
    100: '#e6f7f3',
    200: '#cfeeeb',
    300: '#9fe7dd',
    400: '#66dfcf',
    500: '#6fd2c0',
    600: '#47bfa8',
    700: '#2f927d',
    800: '#235e4f',
    900: '#15382b',
  },
  // Dark theme tokens
  background: {
    dark: '#0A0A0A',
    card: '#111111',
    darker: '#050505',
  },
  // Light theme tokens
  light: {
    background: '#FFFFFF',
    card: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#0F172A',
    subtle: '#6B7280',
  },
  accent: {
    // Kept Protocol brand colors
    primary: '#6fd2c0', // main brand color
    accent: '#1cd6c6', // accent color
    glow: 'rgba(28,214,198,0.15)',
    highlight: '#34e7d0',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A3A3A3',
    disabled: '#525252',
  },
  border: {
     light: 'rgba(255, 255, 255, 0.08)',
     brand: 'rgba(28,214,198,0.18)',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    700: '#15803d',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    700: '#b91c1c',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    700: '#b45309',
  },
};

const typography = {
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const theme = {
  colors,
  typography,
  spacing,
  breakpoints,
} as const;