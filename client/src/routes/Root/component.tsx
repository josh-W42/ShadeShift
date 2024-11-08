import { FunctionComponent, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DEFAULT_THEME, ThemeContext } from '../../utils';
import { TopNavBar } from '../../components';

export const Root: FunctionComponent = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <TopNavBar />
        <Outlet />
      </ThemeContext.Provider>
    </div>
  );
};
