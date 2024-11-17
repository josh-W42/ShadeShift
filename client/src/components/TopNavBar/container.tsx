import { useContext } from 'react';
import { TopNavBarComponent } from './component';
import { Context, getGenURL } from '../../utils';

export const TopNavBar = () => {
  const { genConfig } = useContext(Context);
  const genUrl = getGenURL(genConfig.value);

  return <TopNavBarComponent genUrl={genUrl} />;
};
