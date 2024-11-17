import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/Root';
import { PalettePage } from './routes/Palette/container.tsx';
import { NotFound } from './components/index.ts';
import './App.css';
import { ImagePage } from './routes/Image/container.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/image',
        element: <ImagePage />,
        errorElement: <NotFound />,
      },
      {
        path: '/:sequence',
        element: <PalettePage />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
