import PublicLayout from '@/containers/Layouts/PublicLayout';
import LoginPage from '@/containers/LoginPage';
import RoleBasedRoute from '@/hooks/RoleBasedRoute';
import { Role } from '@/zustand/auth/types';
import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import CreateEditBlog from './Admin/Blog/CreateEditBLog';
import RegistrationManagement from './Admin/Education/RegistrationManagement';
import AdminLayout from './Layouts/AdminLayout';
import AuthLayout from './Layouts/AuthLayout';
import { PATHS } from './Layouts/Components/_AdminSidebarProps';
import StudentLayout from './Layouts/StudentLayout';
import TeacherLayout from './Layouts/TeacherLayout';

const PreviewBlog = React.lazy(() => import('@/containers/Admin/Blog/PreviewBlog'));
const BlogList = React.lazy(() => import('@/containers/Admin/Blog'));
const HomePage = React.lazy(() => import('@/containers/Student/HomePage'));
const AdminDashboardPage = React.lazy(() => import('@/containers/Admin/Dashboard'));
const NotFoundPage = React.lazy(() => import('@/containers/StartupContainers/NotFoundPage'));
const StudentProfilePage = React.lazy(() => import('@/containers/Student/Profile'));
const TeacherProfilePage = React.lazy(() => import('@/containers/Teacher/Profile'));
const AdminProfilePage = React.lazy(() => import('@/containers/Admin/Profile'));
//const CourseDetailPage = React.lazy(() => import('@/containers/CoursesPage/CourseDetailPage'));
const TeacherCourseDetailPage = React.lazy(
  () => import('@/containers/Teacher/Courses/CourseDetail'),
);
const StudentCourseDetailPage = React.lazy(
  () => import('@/containers/Student/Courses/CourseDetail'),
);
const StudentSchedulePage = React.lazy(() => import('@/containers/Student/Schedule'));
const StudentManagementPage = React.lazy(
  () => import('@/containers/Admin/UserManagement/StudentManagement'),
);
const AcademicYearManagementPage = React.lazy(
  () => import('@/containers/Admin/Education/AcademicYearManagement'),
);
const CreateEditAcademicYearPage = React.lazy(
  () => import('@/containers/Admin/Education/AcademicYearManagement/CreateEditViewAcademicYear'),
);
const CreateEditBaseCourse = React.lazy(
  () => import('@/containers/Admin/Education/CourseManagement/CreateEditViewCourses'),
);

const TimeTablePage = React.lazy(() => import('@/containers/Admin/Education/TimeTableManagement'));

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
const BuildingManagementPage = React.lazy(
  () => import('@/containers/Admin/University/BuildingManagement'),
);
const CreateEditBuildingPage = React.lazy(
  () => import('@/containers/Admin/University/BuildingManagement/CreateEditViewBuilding'),
);
const ViewRoomsBuildingPage = React.lazy(
  () => import('@/containers/Admin/University/BuildingManagement/ViewRoomsBuilding'),
);
const TeacherManagementPage = React.lazy(
  () => import('@/containers/Admin/UserManagement/TeacherManagement'),
);
const AdminManagementPage = React.lazy(
  () => import('@/containers/Admin/UserManagement/AdminManagement'),
);
const CoursesInDepartmentPage = React.lazy(
  () => import('@/containers/Admin/University/DepartmentManagement/ViewCoursesDepartment'),
);

const CourseManagementPage = React.lazy(
  () => import('@/containers/Admin/Education/CourseManagement'),
);
const ChatPage = React.lazy(() => import('@/containers/Chat'));

const SemesterManagementPage = React.lazy(
  () => import('@/containers/Admin/Education/SemesterManagement'),
);
const OpenCoursePage = React.lazy(
  () => import('@/containers/Admin/Education/CourseManagement/OpenCourse'),
);

const TimeSlotTeacherSemesterManagerPage = React.lazy(
  () =>
    import(
      '@/containers/Admin/Education/TimeTableManagement/components/TimeSlotTable/TimeSlotTable'
    ),
);

const StudentRegisterCoursePage = React.lazy(() => import('@/containers/Student/RegisterCourse'));
const ViewCourses = React.lazy(() => import('@/containers/Student/ViewCourses'));
const GoogleAuthenticatePage = React.lazy(() => import('@/containers/GoogleAuthenticate'));
const TeacherListCoursesPage = React.lazy(() => import('@/containers/Teacher/Courses/ListCourses'));
const TeacherCalendarView = React.lazy(() => import('@/containers/Teacher/calendar/index'));

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
        path: 'authenticate',
        element: <GoogleAuthenticatePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: (
      <RoleBasedRoute requiredRole={[Role.STUDENT]}>
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
        path: 'profile/:userId',
        element: <StudentProfilePage />,
      },
      // {
      //   path: 'courses',
      //   element: <CoursesPage />,
      // },
      // {
      //   path: 'course/:id',
      //   element: <CourseDetailPage />,
      // },
      {
        path: 'register-course',
        element: <StudentRegisterCoursePage />,
      },
      {
        path: 'current-courses',
        element: <ViewCourses />,
      },
      {
        path: 'courses/:courseId',
        element: <StudentCourseDetailPage />,
      },
      {
        path: 'schedule',
        element: <StudentSchedulePage />,
      },
    ],
  },
  {
    element: (
      <RoleBasedRoute requiredRole={[Role.ADMIN]}>
        <AdminLayout />
      </RoleBasedRoute>
    ),
    path: '/admin',
    children: [
      // Admin routes
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
        path: 'buildings-management',
        element: <BuildingManagementPage />,
      },
      {
        path: 'buildings/create',
        element: <CreateEditBuildingPage />,
      },
      {
        path: 'buildings/:id',
        element: <CreateEditBuildingPage />,
      },
      {
        path: 'buildings/:id/rooms',
        element: <ViewRoomsBuildingPage />,
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
        path: 'registration-management',
        element: <RegistrationManagement />,
      },
      {
        path: 'semester-management/:id',
        element: <SemesterManagementPage />,
      },
      {
        path: 'open-course/:id',
        element: <OpenCoursePage />,
      },
      {
        path: PATHS.TIME_TABLE_MANAGEMENT,
        element: <TimeTablePage />,
      },

      {
        path: PATHS.TIME_SLOT_TEACHER_SEMESTER_MANAGER,
        element: <TimeSlotTeacherSemesterManagerPage />,
      },

      {
        path: 'profile/:userId',
        element: <AdminProfilePage />,
      },
      {
        path: PATHS.BLOG,
        element: <BlogList />,
      },
      {
        path: PATHS.ADD_BLOG,
        element: <CreateEditBlog />,
      },
      {
        path: PATHS.EDIT_BLOG,
        element: <CreateEditBlog />,
      },
      {
        path: PATHS.PREVIEW_BLOG,
        element: <PreviewBlog />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: (
      <RoleBasedRoute requiredRole={[Role.TEACHER]}>
        <TeacherLayout />
      </RoleBasedRoute>
    ),
    path: '/teacher',
    children: [
      {
        index: true,
        path: 'profile/:userId',
        element: <TeacherProfilePage />,
      },
      {
        path: 'courses',
        element: <TeacherListCoursesPage />,
      },
      {
        path: 'courses/:courseId',
        element: <TeacherCourseDetailPage />,
      },
      {
        path: 'calendar',
        element: <TeacherCalendarView />,
      },
    ],
  },
  {
    element: (
      <RoleBasedRoute requiredRole={[Role.TEACHER, Role.STUDENT, Role.ADMIN]}>
        <AuthLayout />
      </RoleBasedRoute>
    ),
    path: '/chat',
    children: [
      {
        index: true,
        path: ':senderId/:recipientId',
        element: <ChatPage />,
      },
    ],
  },
];

const router = createBrowserRouter(appRoutes);
function MainNavigator() {
  return <RouterProvider router={router} />;
}

export default MainNavigator;
