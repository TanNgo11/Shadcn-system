import { BookOutlined, CalendarOutlined, SmileOutlined } from '@ant-design/icons';
import { Calendar } from 'antd';
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
  CALENDAR: '/teacher/calendar',
};

export default {
  route: {
    path: '/',
    routes: [
      // {
      //   path: TEACHER_PATHS.DASHBOARD,
      //   name: 'Dashboard',
      //   icon: <SmileOutlined />,
      // },
      {
        path: TEACHER_PATHS.COURSES,
        name: 'Courses',
        icon: <BookOutlined />,
      },
      {
        path: TEACHER_PATHS.CALENDAR,
        name: 'Calendar',
        icon: <CalendarOutlined />,
      },
    ],
  },
};
