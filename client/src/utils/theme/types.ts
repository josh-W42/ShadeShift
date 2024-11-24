import { createTheme, ThemeOptions } from '@mui/material/styles';

export const DEFAULT_THEME_OPTIONS: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#1F117B',
    },
    secondary: {
      main: '#5B1C67',
    },
  },
};

export const DEFAULT_THEME = createTheme(DEFAULT_THEME_OPTIONS);
