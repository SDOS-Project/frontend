'use client';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from './theme';

function CustomThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
