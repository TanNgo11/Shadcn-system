import StudentLayout from '@/containers/Layouts/StudentLayout';
import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

const HomePage = React.lazy(() => import('@/containers/HomePage'));

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
    ],
  },
];

const router = createBrowserRouter(appRoutes);
function MainNavigator() {
  return <RouterProvider router={router} />;
}

export default MainNavigator;
