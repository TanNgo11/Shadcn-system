import {
  BookOutlined,
  HomeOutlined,
  PlusSquareOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
export const PATHS = {
  // Admin
  DASHBOARD: '/admin/dashboard',
  STUDENTS_MANAGEMENT: '/admin/students-management',
  TEACHERS_MANAGEMENT: '/admin/teachers-management',
  ADMINS_MANAGEMENT: '/admin/admins-management',
  ACADEMIC_YEARS_MANAGEMENT: '/admin/academic-years-management',
  COURSES_MANAGEMENT: '/admin/courses-management',
  CLASSES_MANAGEMENT: '/admin/classes-management',
  DEPARTMENTS_MANAGEMENT: '/admin/departments-management',
  BUILDINGS_MANAGEMENT: '/admin/buildings-management',
  ROOM_MANAGEMENT: '/admin/room-management',
  SEMESTER_MANAGEMENT: '/admin/semester-management/:id',
  TIME_SLOT_TEACHER_SEMESTER_MANAGER: '/admin/time-slots/teachers/:teacherId/semesters/:semesterId',

  REGISTRATION_MANAGEMENT: '/admin/registration-management',
  TIME_TABLE_MANAGEMENT: '/admin/timetable-management/:semesterId',

  //Open Course
  OPEN_COURSE: '/admin/open-course/:id',

  // User
  USER: '/user',

  // Education
  EDUCATION: '/education',

  // University
  UNIVERSITY: '/university',

  // Blog
  BLOG: '/admin/blog',
  ADD_BLOG: '/admin/blog/create',
  EDIT_BLOG: '/admin/blog/:id',
  PREVIEW_BLOG: '/admin/blog/preview/:id',

  // Student
  STUDENT_PROFILE: '/student/profile/:userId',
};

export default {
  route: {
    path: '/',
    routes: [
      // Admin
      {
        path: PATHS.DASHBOARD,
        name: 'Dashboard',
        icon: <SmileOutlined />,
        breadcrumbName: 'Dashboard',
      },
      {
        path: PATHS.USER,
        name: 'User',
        icon: <UserOutlined />,
        access: 'canAdmin',
        component: './Admin',
        breadcrumbName: 'User',
        routes: [
          // Admin
          {
            path: PATHS.STUDENTS_MANAGEMENT,
            name: 'Students',
          },
          {
            path: PATHS.TEACHERS_MANAGEMENT,
            name: 'Teachers',
          },
          {
            path: PATHS.ADMINS_MANAGEMENT,
            name: 'Admins',
          },
        ],
      },
      {
        name: 'Education',
        icon: <BookOutlined />,
        path: PATHS.EDUCATION,
        routes: [
          // Admin
          {
            path: PATHS.ACADEMIC_YEARS_MANAGEMENT,
            name: 'Academic Years',
          },
          {
            path: PATHS.REGISTRATION_MANAGEMENT,
            name: 'Registrations',
          },
          // {
          //   path: PATHS.OPEN_COURSE,
          //   name: 'Open courses',
          // },
          {
            path: PATHS.COURSES_MANAGEMENT,
            name: 'Courses',
          },
          {
            path: PATHS.CLASSES_MANAGEMENT,
            name: 'Classes',
          },
        ],
      },
      {
        name: 'University',
        icon: <HomeOutlined />,
        path: PATHS.UNIVERSITY,
        routes: [
          // Admin
          {
            path: PATHS.DEPARTMENTS_MANAGEMENT,
            name: 'Departments',
          },
          {
            path: PATHS.BUILDINGS_MANAGEMENT,
            name: 'Buildings',
          },
          // {
          //   path: PATHS.ROOM_MANAGEMENT,
          //   name: 'Rooms',
          // },
        ],
      },
      {
        name: 'Blog',
        icon: <PlusSquareOutlined />,
        path: PATHS.BLOG,
        routes: [
          {
            path: PATHS.BLOG,
            name: 'Manage',
          },
        ],
      },
    ],
  },
};
