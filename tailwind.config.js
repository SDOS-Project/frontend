import { default as themeConstants } from './theme/themeConstants';
import { screens as _screens } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    fontFamily: {
      heading: themeConstants.font.heading,
      body: themeConstants.font.body,
      default: themeConstants.font.body,
    },
    colors: {
      gg: themeConstants.background.default,
      paper: themeConstants.background.paper,
      primary: themeConstants.primary,
      secondary: themeConstants.secondary,
      error: themeConstants.error,
      fg: themeConstants.fg.main,
      'fg-dark': themeConstants.fg.dark,
      'accent-100': '#EBF3FF',
      'accent-200': '#AFD1FD',
      'accent-300': '#78B1FC',
      'accent-400': '#4695FB',
      'accent-500': '#0F75FA',
      'accent-600': '#0460D7',
      'accent-700': '#0455BF',
      'accent-800': '#033E8C',
      'accent-900': '#02214B',
      'primary-50': '#E3F3F1',
      'primary-100': '#DFEBE6',
      'primary-200': '#84F0D6',
      'primary-300': '#4DEAD0',
      'primary-400': '#1BDABB',
      'primary-500': '#139F88',
      'primary-600': '#0C6354',
      'primary-700': '#0B574A',
      'primary-800': '#09473D',
      'primary-900': '#083830',
      'gray-100': '#F8F8F8',
      'gray-200': '#CDCBCB',
      'gray-300': '#B4B1B1',
      'gray-400': '#827D7D',
      'gray-500': '#686464',
      'gray-600': '#565353',
      'gray-700': '#343232',
      'background-100': '#F3F2EF',
      action: '#EE4444',
      danger: '#EE4444',
    },
    screens: {
      ..._screens,
      ...themeConstants.breakpoints,
      ha: { raw: '(hover: hover)' },
    },
  },
};
export const plugins = [];
