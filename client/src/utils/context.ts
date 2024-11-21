import { createContext } from 'react';
import { DEFAULT_THEME, Theme } from './theme';
import { DEFAULT_CONFIG, GenConfig } from './genConfig';
import { ColorFormats } from './colors';
import { NotificationMessage } from './notifications';
import Color from 'color';
import { User } from './user';

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
  signUpModal: {
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setOpen: (_v: boolean) => {},
  },
  loginModal: {
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setOpen: (_o: boolean) => {},
  },
  user: {
    value: undefined as undefined | User,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue: (_v: User) => {},
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

export const PaletteContext = createContext<{
  palette: {
    current: Color[];
    setPalette: (_p: Color[]) => void;
  };
  viewModal: {
    isOpen: boolean;
    setOpen: (_b: boolean) => void;
  };
}>({
  palette: {
    current: [],
    setPalette: () => {},
  },
  viewModal: {
    isOpen: false,
    setOpen: () => {},
  },
});
