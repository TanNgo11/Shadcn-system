import { BookOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { DatabaseIcon } from 'lucide-react';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        icon: <SmileOutlined />,
      },
      {
        path: '/user',
        name: 'User',
        icon: <UserOutlined />,
        access: 'canAdmin',
        component: './Admin',
        routes: [
          {
            path: '/admin/students-management',
            name: 'Students',
            breadcrumbName: 'Students List',
          },
          {
            path: '/admin/teachers-management',
            name: 'Teachers',
            breadcrumbName: 'Teachers List',
          },
          {
            path: '/admin/admins-management',
            name: 'Admins',
          },
        ],
      },
      {
        name: 'University',
        icon: <BookOutlined />,
        path: '/list',
        routes: [
          {
            path: '/admin/academic-years-management',
            name: 'Academic Years',
            breadcrumbName: 'Academic Years List',
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
          },
          {
            path: '/admin/departments-management',
            name: 'Departments',
          },
        ],
      },
    ],
  },
};
