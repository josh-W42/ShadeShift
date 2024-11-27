import { FunctionComponent, useEffect, useState } from 'react';
import {
  Context,
  DEFAULT_CONFIG,
  ColorFormats,
  NotificationMessage,
  User,
  DEFAULT_THEME_OPTIONS,
  BASE_SERVER_URL,
} from '../../utils';
import { RootComponent } from './component';
import Color from 'color';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const pokeServer = async () => {
    try {
      const root = BASE_SERVER_URL.split('/api')[0];
      const response = await fetch(root);

      if (!response.ok) {
        throw new Error('Server Poke Failed');
      }

      setPack([
        ...pack,
        {
          message: 'Connected',
          severity: 'info',
          key: new Date().getTime(),
        },
      ]);
    } catch (error) {
      console.error(error);
      setPack([
        ...pack,
        {
          message: 'Unable to Connect to Server',
          severity: 'error',
          key: new Date().getTime(),
        },
      ]);
    }
  };

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/generate');
    }

    pokeServer();
  }, []);

  return (
    <Context.Provider
      value={{
        theme: { value: theme, setTheme: setThemeOptions },
        genConfig: { value: genConfig, setConfig: setGenConfig },
        signUpModal: { isOpen: signUpModal, setOpen: setSignUpModal },
        loginModal: { isOpen: loginModal, setOpen: setLoginModal },
        user: { value: user, setValue: setUser },
        userDrawerOpen: { isOpen: userDrawerOpen, setOpen: setUserDrawerOpen },
        viewModal: { isOpen: viewModal, setOpen: setViewModal },
        palette: { current: currentPalette, setPalette: setCurrentPalette },
        secondaryInfo: { format, setFormat },
        notifications: { notifications: pack, setNotifications: setPack },
      }}
    >
      <ThemeProvider theme={theme}>
        <RootComponent />
      </ThemeProvider>
    </Context.Provider>
  );
};
