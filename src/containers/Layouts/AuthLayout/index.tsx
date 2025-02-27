import MenuCard from '@/containers/Layouts/Components/MenuCardLayout';
import SearchInput from '@/containers/Layouts/Components/SearchInputLayout';
import LoadingContainer from '@/containers/StartupContainers/LoadingContainer';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import {
  BookOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  ProfileOutlined,
  QuestionCircleFilled,
  QuestionCircleOutlined,
  SmileFilled,
  UserOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  ProSettings,
  SettingDrawer,
} from '@ant-design/pro-components';
import { ConfigProvider, Dropdown } from 'antd';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useNotification } from '../../StartupContainers/ToastContainer';
import defaultProps from '../Components/_HeaderMenuProps';
import adminSidebarProps from '../Components/_AdminSidebarProps';

function AuthLayout() {
  const { clearAuth } = useAuthStore();
  const toast = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: false,
    navTheme: 'light',
    contentWidth: 'Fluid',
    colorPrimary: '#1677FF',
    siderMenuType: 'sub',
    fixedHeader: true,
  });

  const [pathname, setPathname] = useState(location.pathname);
  const [num, setNum] = useState(40);
  if (typeof document === 'undefined') {
    return <div />;
  }

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem('accessToken');
    toast.success({
      message: 'Logout successfully',
      description: 'Goodbye!',
    });
    navigate('/login');
  };

  return (
    <Suspense fallback={<LoadingContainer />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        {' '}
        <Outlet />
      </ErrorBoundary>
    </Suspense>
  );
}

export default AuthLayout;
