import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/Root/component.tsx';
import { PalettePage } from './routes/Palette/container.tsx';
import { NotFound } from './components/index.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/:sequence',
    element: <PalettePage />,
    errorElement: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
