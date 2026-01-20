/**
 * SPACING SYSTEM - 8pt Grid
 * All spacing values must use these tokens
 */
export const spacing = {
  0: '0',
  1: '0.5rem',   // 8px
  2: '1rem',     // 16px
  3: '1.5rem',   // 24px
  4: '2rem',     // 32px
  5: '2.5rem',   // 40px
  6: '3rem',     // 48px
  7: '3.5rem',   // 56px
  8: '4rem',     // 64px
  9: '4.5rem',   // 72px
  10: '5rem',    // 80px
} as const;

/**
 * TYPOGRAPHY SYSTEM
 * Heading: DM Sans (Google Font)
 * Body: Inter (Google Font)
 */
export const typography = {
  heading: {
    h1: {
      fontSize: '3rem',      // 48px
      lineHeight: '3.5rem',  // 56px
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem',   // 36px
      lineHeight: '2.75rem', // 44px
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',    // 24px
      lineHeight: '2rem',    // 32px
      fontWeight: 600,
      letterSpacing: '0',
    },
    h4: {
      fontSize: '1.25rem',   // 20px
      lineHeight: '1.75rem', // 28px
      fontWeight: 600,
      letterSpacing: '0',
    },
  },
  body: {
    large: {
      fontSize: '1.125rem',  // 18px
      lineHeight: '1.75rem', // 28px
      fontWeight: 400,
    },
    base: {
      fontSize: '1rem',      // 16px
      lineHeight: '1.5rem',  // 24px
      fontWeight: 400,
    },
    small: {
      fontSize: '0.875rem',  // 14px
      lineHeight: '1.25rem', // 20px
      fontWeight: 400,
    },
    tiny: {
      fontSize: '0.75rem',   // 12px
      lineHeight: '1rem',    // 16px
      fontWeight: 400,
    },
  },
} as const;

/**
 * COLOR SYSTEM
 * Nigerian earth-tones with semantic meaning
 */
export const colors = {
  // Brand colors
  brand: {
    primary: '#C36F3D',      // Terracotta - Primary actions
    'primary-dark': '#7B4224', // Deep Terracotta - Hover states
    'primary-light': '#D88A5F', // Light Terracotta - Backgrounds
  },
  
  // Neutral colors
  neutral: {
    900: '#282521',  // Charcoal Earth - Primary text
    800: '#3D3935',  // Dark text
    700: '#8D7A67',  // Clay Brown - Secondary text
    600: '#A89684',  // Medium clay
    500: '#C3B5A4',  // Light clay
    400: '#DAD3BE',  // Light Earth Beige - Borders
    300: '#E7E2D4',  // Very light beige
    200: '#F0ECE1',  // Near white
    100: '#F5F0E6',  // Warm Off-White - Cards
    50: '#FAFAF8',   // Almost white
  },
  
  // Semantic colors
  semantic: {
    success: '#6B8A7A',      // Sage green
    'success-bg': '#E8F0ED',  // Light sage
    warning: '#AB7758',      // Light terracotta
    'warning-bg': '#F5EDE8',  // Light warning bg
    error: '#AB5842',        // Error red-brown
    'error-bg': '#F5E8E5',    // Light error bg
    info: '#5A7B8A',         // Info blue-grey
    'info-bg': '#E8EEF0',     // Light info bg
  },
} as const;

/**
 * COMPONENT TOKENS
 * Shared properties for all components
 */
export const components = {
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px - Default for all components
    lg: '0.75rem',   // 12px - Cards only
  },
  
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(40, 37, 33, 0.05)',
    base: '0 1px 3px 0 rgba(40, 37, 33, 0.1), 0 1px 2px -1px rgba(40, 37, 33, 0.1)',
    md: '0 4px 6px -1px rgba(40, 37, 33, 0.1), 0 2px 4px -2px rgba(40, 37, 33, 0.1)',
    lg: '0 10px 15px -3px rgba(40, 37, 33, 0.1), 0 4px 6px -4px rgba(40, 37, 33, 0.1)',
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;