import { FunctionComponent, useState } from 'react';
import {
  DEFAULT_THEME,
  Context,
  DEFAULT_CONFIG,
  ColorFormats,
  SecondaryInfoContext,
  NotificationContext,
  NotificationMessage,
  PaletteContext,
  User,
} from '../../utils';
import { RootComponent } from './component';
import Color from 'color';

export const Root: FunctionComponent = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [genConfig, setGenConfig] = useState(DEFAULT_CONFIG);
  const [format, setFormat] = useState(ColorFormats.rgb);
  const [pack, setPack] = useState<NotificationMessage[]>([]);
  const [currentPalette, setCurrentPalette] = useState<Color[]>([]);
  const [viewModal, setViewModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        theme: { value: theme, setTheme },
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
            <RootComponent />
          </PaletteContext.Provider>
        </NotificationContext.Provider>
      </SecondaryInfoContext.Provider>
    </Context.Provider>
  );
};
