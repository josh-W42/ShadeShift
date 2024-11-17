import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { Notifications, TopNavBar } from '../../components';

export const RootComponent: FunctionComponent = () => {
  return (
    <div>
      <TopNavBar />
      <Outlet />
      <Notifications />
    </div>
  );
};
