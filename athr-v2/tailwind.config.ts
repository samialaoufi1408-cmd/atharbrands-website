import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF7A',
          bright: '#E6C998',
          deep: '#B8945E',
        },
        ivory: '#F2EFE6',
        charcoal: {
          DEFAULT: '#0F1113',
          2: '#15181b',
          3: '#1c2024',
        },
        taupe: '#7A6955',
        olive: '#555B50',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        ar: ['Tajawal', 'Jost', 'sans-serif'],
      },
      transitionTimingFunction: {
        athr: 'cubic-bezier(.22,.61,.36,1)',
      },
      maxWidth: {
        site: '1320px',
      },
      borderRadius: {
        DEFAULT: '0',
        none: '0',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

export default config;
