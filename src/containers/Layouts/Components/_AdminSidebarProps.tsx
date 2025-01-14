import { BookOutlined, HomeOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { DatabaseIcon, School2Icon } from 'lucide-react';
import { FaSchool } from 'react-icons/fa6';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        icon: <SmileOutlined />,
        breadcrumbName: 'Dashboard',
      },
      {
        path: '/user',
        name: 'User',
        icon: <UserOutlined />,
        access: 'canAdmin',
        component: './Admin',
        breadcrumbName: 'User',
        routes: [
          {
            path: '/admin/students-management',
            name: 'Students',
            breadcrumbName: 'Students',
          },
          {
            path: '/admin/teachers-management',
            name: 'Teachers',
            breadcrumbName: 'Teachers',
          },
          {
            path: '/admin/admins-management',
            name: 'Admins',
            breadcrumbName: 'Admins',
          },
        ],
      },
      {
        name: 'Education',
        icon: <BookOutlined />,
        path: '/education',
        routes: [
          {
            path: '/admin/academic-years-management',
            name: 'Academic Years',
            breadcrumbName: 'Academic Years',
            // routes: [
            //   {
            //     path: 'sub-sub-page1',
            //     name: 'sub-sub-page1',
            //     icon: <CrownFilled />,
            //     component: './Welcome',
            //   },
            // ],
          },
          {
            path: '/admin/semesters-management',
            name: 'Semesters',
            breadcrumbName: 'Semesters',
          },
          {
            path: '/admin/courses-management',
            name: 'Courses',
            breadcrumbName: 'Courses',
          },
          {
            path: '/admin/classes-management',
            name: 'Classes',
            breadcrumbName: 'Classes',
          },
        ],
      },
      {
        name: 'University',
        icon: <HomeOutlined />,
        path: '/university',
        routes: [
          {
            path: '/admin/departments-management',
            name: 'Departments',
            breadcrumbName: 'Departments',
          },
          {
            path: '/admin/room-management',
            name: 'Rooms',
            breadcrumbName: 'Rooms',
          },
        ],
      },
    ],
  },
};
