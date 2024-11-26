import { createTheme, ThemeOptions } from '@mui/material/styles';

export const DEFAULT_THEME_OPTIONS: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFBFC6',
      contrastText: '#000000',
    },
    secondary: {
      main: '#356CB5',
    },
  },
};

export const DEFAULT_THEME = createTheme(DEFAULT_THEME_OPTIONS);
