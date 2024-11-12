import { FunctionComponent, useContext } from 'react';
import { TopNavBarComponent } from './component';
import { Context } from '../../utils';

export const TopNavBar: FunctionComponent = () => {
  const { theme, genConfig } = useContext(Context);

  const genQuery = [...Object.entries(genConfig.value)]
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join('&');
  const genUrl = 'generate?' + genQuery;

  return <TopNavBarComponent theme={theme.value} genUrl={genUrl} />;
};
