import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    spacing: {
      '0': '0',
      '1': '0.5rem',   // 8px
      '2': '1rem',     // 16px
      '3': '1.5rem',   // 24px
      '4': '2rem',     // 32px
      '5': '2.5rem',   // 40px
      '6': '3rem',     // 48px
      '7': '3.5rem',   // 56px
      '8': '4rem',     // 64px
      '9': '4.5rem',   // 72px
      '10': '5rem',    // 80px
    },
    
    extend: {
      // Typography
      fontFamily: {
        heading: ['DM Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      
      fontSize: {
        // Body sizes
        'body-tiny': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],     // 12px/16px
        'body-small': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }], // 14px/20px
        'body-base': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],       // 16px/24px
        'body-large': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }], // 18px/28px
        
        // Heading sizes
        'heading-h4': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600', letterSpacing: '0' }],      // 20px/28px
        'heading-h3': ['1.5rem', { lineHeight: '2rem', fontWeight: '600', letterSpacing: '0' }],          // 24px/32px
        'heading-h2': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '700', letterSpacing: '-0.01em' }], // 36px/44px
        'heading-h1': ['3rem', { lineHeight: '3.5rem', fontWeight: '700', letterSpacing: '-0.02em' }],     // 48px/56px
      },
      
      // Colors
      colors: {
        brand: {
          primary: '#C36F3D',
          'primary-dark': '#7B4224',
          'primary-light': '#D88A5F',
        },
        neutral: {
          900: '#282521',
          800: '#3D3935',
          700: '#8D7A67',
          600: '#A89684',
          500: '#C3B5A4',
          400: '#DAD3BE',
          300: '#E7E2D4',
          200: '#F0ECE1',
          100: '#F5F0E6',
          50: '#FAFAF8',
        },
        semantic: {
          success: '#6B8A7A',
          'success-bg': '#E8F0ED',
          warning: '#AB7758',
          'warning-bg': '#F5EDE8',
          error: '#AB5842',
          'error-bg': '#F5E8E5',
          info: '#5A7B8A',
          'info-bg': '#E8EEF0',
        },
      },
      
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        lg: '0.75rem',
      },
      
      boxShadow: {
        sm: '0 1px 2px 0 rgba(40, 37, 33, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(40, 37, 33, 0.1), 0 1px 2px -1px rgba(40, 37, 33, 0.1)',
        md: '0 4px 6px -1px rgba(40, 37, 33, 0.1), 0 2px 4px -2px rgba(40, 37, 33, 0.1)',
        lg: '0 10px 15px -3px rgba(40, 37, 33, 0.1), 0 4px 6px -4px rgba(40, 37, 33, 0.1)',
      },
      
      // Transitions (consistent timing)
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '200ms',
        slow: '300ms',
      },
      
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;