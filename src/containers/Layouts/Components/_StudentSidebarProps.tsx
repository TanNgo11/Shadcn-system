import { BookOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';
export const PATHS = {
  // User
  DASHBOARD: '/student/dashboard',

  STUDENT: '/student',

  // Education
  EDUCATION: '/education',

  // University
  SCHEDULE: '/student/schedule',
  CLASSES: '/student/classes',
  REGISTER_COURSES: '/student/register-course',

  CURRENT_COURSES: '/student/current-courses',
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
      //   {
      //     path: PATHS.USER,
      //     name: 'User',
      //     icon: <UserOutlined />,
      //     access: 'canAdmin',
      //     component: './Admin',
      //     breadcrumbName: 'User',
      //     routes: [
      //       // Admin
      //       {
      //         path: PATHS.STUDENTS_MANAGEMENT,
      //         name: 'Students',
      //       },
      //       {
      //         path: PATHS.TEACHERS_MANAGEMENT,
      //         name: 'Teachers',
      //       },
      //       {
      //         path: PATHS.ADMINS_MANAGEMENT,
      //         name: 'Admins',
      //       },
      //     ],
      //   },
      {
        name: 'Education',
        icon: <BookOutlined />,
        path: PATHS.STUDENT,
        routes: [
          {
            path: PATHS.SCHEDULE,
            name: 'Schedules',
          },
          {
            path: PATHS.CLASSES,
            name: 'Classes',
          },
          {
            path: PATHS.CURRENT_COURSES,
            name: 'Current Courses',
          },
          // {
          //   path: PATHS.OPEN_COURSE,
          //   name: 'Open courses',
          // },
          //   {
          //     path: PATHS.COURSES_MANAGEMENT,
          //     name: 'Courses',
          //   },
          //   {
          //     path: PATHS.CLASSES_MANAGEMENT,
          //     name: 'Classes',
          //   },
        ],
      },
      {
        name: 'University',
        icon: <HomeOutlined />,
        path: PATHS.STUDENT,
        routes: [
          // Admin
          {
            path: PATHS.REGISTER_COURSES,
            name: 'Register Courses',
          },
        ],
      },
    ],
  },
};
