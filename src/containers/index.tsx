import PublicLayout from '@/containers/Layouts/PublicLayout';
import StudentLayout from './Layouts/StudenLayout';
import LoginPage from '@/containers/LoginPage';
import RoleBasedRoute from '@/hooks/RoleBasedRoute';
import { Role } from '@/zustand/auth/types';
import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminLayout from './Layouts/AdminLayout';
import TeacherLayout from './Layouts/TeacherLayout';
import CreateEditTeacher from './Admin/CreateEditTeacher';

const HomePage = React.lazy(() => import('@/containers/HomePage'));
const NotFoundPage = React.lazy(() => import('@/containers/StartupContainers/NotFoundPage'));
const StudentProfilePage = React.lazy(() => import('@/containers/Student/Profile'));
const TeacherProfilePage = React.lazy(() => import('@/containers/Teacher/Profile'));
const AdminProfilePage = React.lazy(() => import('@/containers/Admin/Profile'));
const CoursesPage = React.lazy(() => import('@/containers/CoursesPage'));
const CourseDetailPage = React.lazy(() => import('@/containers/CoursesPage/CourseDetailPage'));
const StudentManagementPage = React.lazy(() => import('@/containers/Admin/StudentManagement'));
const CreateEditStudentPage = React.lazy(() => import('@/containers/Admin/CreateEditStudent'));
const TeacherManagementPage = React.lazy(() => import('@/containers/Admin/TeacherManagement'));
const CreateEditTeacherPage = React.lazy(() => import('@/containers/Admin/CreateEditTeacher'));
// const CreateEditTeacherPage = React.lazy(() => import('@/containers/Admin/CreateEditTeacher'));
const AdminManagementPage = React.lazy(() => import('@/containers/Admin/AdminManagement'));

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
        element: <StudentProfilePage />,
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
      {
        path: 'teachers-management',
        element: <TeacherManagementPage />,
      },
      {
        path: 'admins-management',
        element: <AdminManagementPage />,
      },
      {
        path: 'students/:id',
        element: <CreateEditStudentPage />,
      },
      {
        path: 'teachers/:id',
        element: <CreateEditTeacherPage />,
      },
      {
        path: 'profile',
        element: <AdminProfilePage />,
      },
    ],
  },
  {
    element: (
      <RoleBasedRoute requiredRole={Role.TEACHER}>
        <TeacherLayout />
      </RoleBasedRoute>
    ),
    path: '/teacher',
    children: [
      {
        path: 'profile',
        element: <TeacherProfilePage />,
      },
    ],
  },
];

const router = createBrowserRouter(appRoutes);
function MainNavigator() {
  return <RouterProvider router={router} />;
}

export default MainNavigator;
