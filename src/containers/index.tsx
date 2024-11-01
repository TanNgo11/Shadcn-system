import PublicLayout from '@/containers/Layouts/PublicLayout';
import StudentLayout from '@/containers/Layouts/StudentLayout';
import LoginPage from '@/containers/LoginPage';
import RoleBasedRoute from '@/hooks/RoleBasedRoute';
import { Role } from '@/zustand/auth/types';
import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminLayout from './Layouts/AdminLayout';
import TeacherLayout from './Layouts/TeacherLayout';  
const HomePage = React.lazy(() => import('@/containers/HomePage'));
const NotFoundPage = React.lazy(() => import('@/containers/StartupContainers/NotFoundPage'));
const ProfilePage = React.lazy(() => import('@/containers/Profile'));
const CoursesPage = React.lazy(() => import('@/containers/CoursesPage'));
const CourseDetailPage = React.lazy(() => import('@/containers/CoursesPage/CourseDetailPage'));
const StudentManagementPage = React.lazy(() => import('@/containers/Admin/StudentManagement'));

const appRoutes: RouteObject[] = [
  {
    element: (
      <RoleBasedRoute requiredRole={Role.STUDENT}>
        <StudentLayout />
      </RoleBasedRoute>
    ),
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
  {
    element: (
      <RoleBasedRoute requiredRole={Role.ADMIN}>
        <AdminLayout />
      </RoleBasedRoute>
    ),
    path: '/admin',
    children: [
      {
        index: true,
        path: 'students-management',
        element: <StudentManagementPage />,
      },
    ],
  },
  {
    element: (
      <RoleBasedRoute requiredRole={Role.TEACHER}>
        <TeacherLayout />
      </RoleBasedRoute>
    ),
    path: '/',
    children: [
      {
        index: true,
        path: 'teacher',
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
