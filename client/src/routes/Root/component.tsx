import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavBar } from '../../components';

export const RootComponent: FunctionComponent = () => {
  return (
    <div>
      <TopNavBar />
      <Outlet />
    </div>
  );
};
