import { FunctionComponent, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { DEFAULT_THEME, ThemeContext } from '../../utils';

export const Root: FunctionComponent = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <Link to={'generate'}>Generate</Link>
        <Outlet />
      </ThemeContext.Provider>
    </div>
  );
};
