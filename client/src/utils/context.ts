import { createContext } from 'react';
import { DEFAULT_THEME, Theme } from './theme';
import { DEFAULT_CONFIG, GenConfig } from './genConfig';

export const Context = createContext({
  theme: {
    value: DEFAULT_THEME,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTheme: (_t: Theme) => {},
  },
  genConfig: {
    value: DEFAULT_CONFIG,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setConfig: (_c: GenConfig) => {},
  },
});