import Color from 'color';

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
  lighter: Color('#1BBA8A').l(98).chroma(10).hex(),
  darker: Color('#1BBA8A').l(10).chroma(20).hex(),
};
