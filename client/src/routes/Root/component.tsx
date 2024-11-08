import { FunctionComponent } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Root: FunctionComponent = () => {
  return (
    <div>
      <Link to={'generate'}>Generate</Link>
      <Outlet />
    </div>
  );
};
