import { createContext } from 'react';

export interface Theme {
  primary: string;
  secondary: string;
  tertiary: string;
}

export const DEFAULT_THEME: Theme = {
  primary: '#1BBA8A',
  secondary: '#7EA1FF',
  tertiary: '#F18865',
};

export const ThemeContext = createContext(DEFAULT_THEME);
