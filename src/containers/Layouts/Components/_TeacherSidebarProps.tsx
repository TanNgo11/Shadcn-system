import { BookOutlined, SmileOutlined } from '@ant-design/icons';
export const TEACHER_PATHS = {
  // User
  DASHBOARD: '/teacher/dashboard',

  STUDENT: '/teacher/student',

  // Education
  EDUCATION: '/teacher/education',

  // Courses
  COURSES: '/teacher/courses',

  // University
  SCHEDULE: '/teacher/schedule',
  CLASSES: '/teacher/classes',
  REGISTER_COURSES: '/teacher/register-course',

  CURRENT_COURSES: '/teacher/current-courses',
};

export default {
  route: {
    path: '/',
    routes: [
      {
        path: TEACHER_PATHS.DASHBOARD,
        name: 'Dashboard',
        icon: <SmileOutlined />,
      },
      {
        path: TEACHER_PATHS.COURSES,
        name: 'Courses',
        icon: <BookOutlined />,
      },

    ],
  },
};
