import { FunctionComponent, useState } from 'react';
import {
  Context,
  DEFAULT_CONFIG,
  ColorFormats,
  SecondaryInfoContext,
  NotificationContext,
  NotificationMessage,
  PaletteContext,
  User,
  DEFAULT_THEME_OPTIONS,
} from '../../utils';
import { RootComponent } from './component';
import Color from 'color';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export const Root: FunctionComponent = () => {
  const [themeOptions, setThemeOptions] = useState(DEFAULT_THEME_OPTIONS);
  const [genConfig, setGenConfig] = useState(DEFAULT_CONFIG);
  const [format, setFormat] = useState(ColorFormats.rgb);
  const [pack, setPack] = useState<NotificationMessage[]>([]);
  const [currentPalette, setCurrentPalette] = useState<Color[]>([]);
  const [viewModal, setViewModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);

  const theme = createTheme(themeOptions);

  return (
    <Context.Provider
      value={{
        theme: { value: theme, setTheme: setThemeOptions },
        genConfig: { value: genConfig, setConfig: setGenConfig },
        signUpModal: { isOpen: signUpModal, setOpen: setSignUpModal },
        loginModal: { isOpen: loginModal, setOpen: setLoginModal },
        user: {
          value: user,
          setValue: setUser,
        },
        userDrawerOpen: { isOpen: userDrawerOpen, setOpen: setUserDrawerOpen },
      }}
    >
      <SecondaryInfoContext.Provider
        value={{
          format,
          setFormat,
        }}
      >
        <NotificationContext.Provider
          value={{
            notifications: pack,
            setNotifications: setPack,
          }}
        >
          <PaletteContext.Provider
            value={{
              palette: {
                current: currentPalette,
                setPalette: setCurrentPalette,
              },
              viewModal: {
                isOpen: viewModal,
                setOpen: setViewModal,
              },
            }}
          >
            <ThemeProvider theme={theme}>
              <RootComponent />
            </ThemeProvider>
          </PaletteContext.Provider>
        </NotificationContext.Provider>
      </SecondaryInfoContext.Provider>
    </Context.Provider>
  );
};
