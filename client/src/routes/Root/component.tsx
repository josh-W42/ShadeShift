import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { Notifications, TopNavBar, UserDrawer } from '../../components';

export const RootComponent: FunctionComponent = () => {
  return (
    <div>
      <UserDrawer>
        <Outlet />
      </UserDrawer>
      <Notifications />
    </div>
  );
};
