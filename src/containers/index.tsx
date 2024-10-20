import PublicLayout from '@/containers/Layouts/PublicLayout';
import StudentLayout from '@/containers/Layouts/StudentLayout';
import LoginPage from '@/containers/LoginPage';
import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

const HomePage = React.lazy(() => import('@/containers/HomePage'));
const NotFoundPage = React.lazy(() => import('@/containers/StartupContainers/NotFoundPage'));
const ProfilePage = React.lazy(() => import('@/containers/Profile'));
const CoursesPage = React.lazy(() => import('@/containers/CoursesPage'));
const CourseDetailPage = React.lazy(() => import('@/containers/CoursesPage/CourseDetailPage'));

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
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'courses',
        element: <CoursesPage />,
      },
      {
        path: 'course/:id',
        element: <CourseDetailPage />,
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
