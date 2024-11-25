import { createTheme, ThemeOptions } from '@mui/material/styles';

export const DEFAULT_THEME_OPTIONS: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFBFC6',
      light: '',
      dark: '',
      contrastText: 'FFFFFF',
    },
    secondary: {
      main: '#356CB5',
    },
  },
};

export const DEFAULT_THEME = createTheme(DEFAULT_THEME_OPTIONS);
