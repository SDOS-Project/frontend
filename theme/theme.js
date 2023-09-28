import { createTheme } from '@mui/material/styles';
import themeConstants from './themeConstants';

const theme = createTheme({
  palette: {
    primary: themeConstants.primary,
    background: themeConstants.background,
    text: {
      primary: themeConstants.fg.main,
      secondary: themeConstants.fg.dark,
    },
    error: themeConstants.error,
  },
  breakpoints: {
    values: themeConstants.breakpoints,
  },
  typography: {
    h1: {
      fontFamily: themeConstants.font.heading,
    },
    h2: {
      fontFamily: themeConstants.font.heading,
    },
    h3: {
      fontFamily: themeConstants.font.heading,
    },
    h4: {
      fontFamily: themeConstants.font.heading,
    },
    h5: {
      fontFamily: themeConstants.font.heading,
    },
    h6: {
      fontFamily: themeConstants.font.heading,
    },
    button: {
      textTransform: 'none',
    },
    fontFamily: themeConstants.font.body,
  },
});

export { theme };
