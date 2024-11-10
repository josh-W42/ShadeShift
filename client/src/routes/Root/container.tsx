import { FunctionComponent, useState } from 'react';
import { DEFAULT_THEME, ThemeContext } from '../../utils';
import { RootComponent } from './component';

export const Root: FunctionComponent = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <RootComponent />
    </ThemeContext.Provider>
  );
};
