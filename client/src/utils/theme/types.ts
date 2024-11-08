import Color from 'color';
import { createContext } from 'react';

export interface Theme {
  primary: string;
  secondary: string;
  tertiary: string;
  lighter: string;
  darker: string;
}

export const DEFAULT_THEME: Theme = {
  primary: '#1BBA8A',
  secondary: '#7EA1FF',
  tertiary: '#F18865',
  lighter: Color({ hex: '#1BBA8A', luminosity: 98, chroma: 10 }).hex(),
  darker: Color({ hex: '#1BBA8A', luminosity: 10, chroma: 20 }).hex(),
};

export const ThemeContext = createContext(DEFAULT_THEME);
