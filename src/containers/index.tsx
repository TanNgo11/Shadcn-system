import PublicLayout from '@/containers/Layouts/PublicLayout';
import LoginPage from '@/containers/LoginPage';
import RoleBasedRoute from '@/hooks/RoleBasedRoute';
import { Role } from '@/zustand/auth/types';
import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminLayout from './Layouts/AdminLayout';
import StudentLayout from './Layouts/StudenLayout';
import TeacherLayout from './Layouts/TeacherLayout';
import CourseManagement from './Admin/Education/CourseManagement';

const HomePage = React.lazy(() => import('@/containers/Student/HomePage'));
const AdminDashboardPage = React.lazy(() => import('@/containers/Admin/Dashboard'));
const NotFoundPage = React.lazy(() => import('@/containers/StartupContainers/NotFoundPage'));
const StudentProfilePage = React.lazy(() => import('@/containers/Student/Profile'));
const TeacherProfilePage = React.lazy(() => import('@/containers/Teacher/Profile'));
const AdminProfilePage = React.lazy(() => import('@/containers/Admin/Profile'));
const CoursesPage = React.lazy(() => import('@/containers/CoursesPage'));
const CourseDetailPage = React.lazy(() => import('@/containers/CoursesPage/CourseDetailPage'));
const StudentManagementPage = React.lazy(() => import('@/containers/Admin/UserManagement/StudentManagement'));
const AcademicYearManagementPage = React.lazy(
  () => import('@/containers/Admin/Education/AcademicYearManagement'),
);
const CreateEditAcademicYearPage = React.lazy(
  () => import('@/containers/Admin/Education/AcademicYearManagement/CreateEditViewAcademicYear'),
);
const CreateEditBaseCourse = React.lazy(
  () => import('@/containers/Admin/CourseManagement/CreateEditViewCourses'),
);
const CreateEditStudentPage = React.lazy(
  () => import('@/containers/Admin/UserManagement/StudentManagement/CreateEditViewStudent'),
);

const CreateEditTeacherPage = React.lazy(
  () => import('@/containers/Admin/UserManagement/TeacherManagement/CreateEditViewTeacher'),
);
const CreateEditAdminPage = React.lazy(
  () => import('@/containers/Admin/UserManagement/AdminManagement/CreateEditViewAdmin'),
);
const DepartmentManagementPage = React.lazy(
  () => import('@/containers/Admin/University/DepartmentManagement'),
);
const TeacherManagementPage = React.lazy(() => import('@/containers/Admin/UserManagement/TeacherManagement'));
const AdminManagementPage = React.lazy(() => import('@/containers/Admin/UserManagement/AdminManagement'));
const CoursesInDepartmentPage = React.lazy(
  () => import('@/containers/Admin/University/DepartmentManagement/ViewCoursesDepartment'),
);
const CourseManagementPage = React.lazy(() => import('@/containers/Admin/Education/CourseManagement'));

const appRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    path: '/',
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: (
      <RoleBasedRoute requiredRole={Role.STUDENT}>
        <StudentLayout />
      </RoleBasedRoute>
    ),
    path: '/student',
    children: [
      {
        index: true,
        path: 'dashboard',
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
        path: 'dashboard',
        element: <AdminDashboardPage />,
      },
      {
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
        path: 'academic-years-management',
        element: <AcademicYearManagementPage />,
      },
      {
        path: 'academic-years-management/create',
        element: <CreateEditAcademicYearPage />,
      },
      {
        path: 'academic-years-management/:id',
        element: <CreateEditAcademicYearPage />,
      },
      {
        path: 'departments-management',
        element: <DepartmentManagementPage />,
      },

      {
        path: 'students/create',
        element: <CreateEditStudentPage />,
      },
      {
        path: 'students/:id',
        element: <CreateEditStudentPage />,
      },
      {
        path: 'teachers/create',
        element: <CreateEditTeacherPage />,
      },
      {
        path: 'teachers/:id',
        element: <CreateEditTeacherPage />,
      },
      {
        path: 'admins/create',
        element: <CreateEditAdminPage />,
      },
      {
        path: 'admins/:id',
        element: <CreateEditAdminPage />,
      },
      {
        path: 'departments-management/:id/courses',
        element: <CoursesInDepartmentPage />,
      },
      {
        path: 'courses-management',
        element: <CourseManagementPage />,
      },
      {
        path: 'courses-management/create',
        element: <CreateEditBaseCourse />,
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
