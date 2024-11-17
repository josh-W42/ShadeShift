import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { Notifications } from '../../components';

export const RootComponent: FunctionComponent = () => {
  return (
    <div>
      <Outlet />
      <Notifications />
    </div>
  );
};
