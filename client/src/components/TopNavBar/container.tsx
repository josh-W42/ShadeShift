import { FunctionComponent, useContext } from 'react';
import { TopNavBarComponent } from './component';
import { ThemeContext } from '../../utils';

export const TopNavBar: FunctionComponent = () => {
  const { theme } = useContext(ThemeContext);

  return <TopNavBarComponent theme={theme} />;
};
