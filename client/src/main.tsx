import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/Root';
import { PalettePage } from './routes/Palette/container.tsx';
import { NotFound } from './components/index.ts';
import './App.css';
import { ImagePage } from './routes/Image/container.tsx';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDpqmkdmKMpuQcsM08Ch-9NeCZOdG72Y0I',
  authDomain: 'shadeshift-e05d4.firebaseapp.com',
  projectId: 'shadeshift-e05d4',
  storageBucket: 'shadeshift-e05d4.firebasestorage.app',
  messagingSenderId: '1093066787554',
  appId: '1:1093066787554:web:f2d8427e482dc3161c6cbb',
  measurementId: 'G-CVV82TH1EH',
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

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
