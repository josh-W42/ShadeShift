import { FunctionComponent, useState } from 'react';
import {
  DEFAULT_THEME,
  Context,
  DEFAULT_CONFIG,
  ColorFormats,
  SecondaryInfoContext,
  NotificationContext,
  NotificationMessage,
} from '../../utils';
import { RootComponent } from './component';

export const Root: FunctionComponent = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [genConfig, setGenConfig] = useState(DEFAULT_CONFIG);
  const [format, setFormat] = useState(ColorFormats.rgb);
  const [pack, setPack] = useState<NotificationMessage[]>([]);

  return (
    <Context.Provider
      value={{
        theme: { value: theme, setTheme },
        genConfig: { value: genConfig, setConfig: setGenConfig },
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
          <RootComponent />
        </NotificationContext.Provider>
      </SecondaryInfoContext.Provider>
    </Context.Provider>
  );
};
