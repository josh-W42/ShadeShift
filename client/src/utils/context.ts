import { createContext } from 'react';
import { DEFAULT_THEME, Theme } from './theme';
import { DEFAULT_CONFIG, GenConfig } from './genConfig';
import { ColorFormats } from './colors';
import { NotificationMessage } from './notifications';

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

export const SecondaryInfoContext = createContext({
  format: ColorFormats.rgb,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFormat: (_c: ColorFormats) => {},
});

export const NotificationContext = createContext({
  notifications: [] as NotificationMessage[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNotifications: (_a: NotificationMessage[]) => {},
});
