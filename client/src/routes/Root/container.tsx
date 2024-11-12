import { FunctionComponent, useState } from 'react';
import { DEFAULT_THEME, Context, DEFAULT_CONFIG } from '../../utils';
import { RootComponent } from './component';

export const Root: FunctionComponent = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [genConfig, setGenConfig] = useState(DEFAULT_CONFIG);

  return (
    <Context.Provider
      value={{
        theme: { value: theme, setTheme },
        genConfig: { value: genConfig, setConfig: setGenConfig },
      }}
    >
      <RootComponent />
    </Context.Provider>
  );
};
