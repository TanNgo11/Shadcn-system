import PublicLayout from '@/containers/Layouts/PublicLayout';
import StudentLayout from '@/containers/Layouts/StudentLayout';
import LoginPage from '@/containers/LoginPage';
import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

const HomePage = React.lazy(() => import('@/containers/HomePage'));
const NotFoundPage = React.lazy(() => import('@/containers/StartupContainers/NotFoundPage'));

const appRoutes: RouteObject[] = [
  {
    element: <StudentLayout />,
    path: '/',
    children: [
      {
        index: true,
        path: 'home',
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: <PublicLayout />,
    path: '/',
    children: [
      {
        index: true,
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
];

const router = createBrowserRouter(appRoutes);
function MainNavigator() {
  return <RouterProvider router={router} />;
}

export default MainNavigator;
