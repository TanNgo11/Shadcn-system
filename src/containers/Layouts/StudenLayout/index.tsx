import MenuCard from '@/containers/Layouts/Components/MenuCardLayout';
import SearchInput from '@/containers/Layouts/Components/SearchInputLayout';
import LoadingContainer from '@/containers/StartupContainers/LoadingContainer';
import {
  CrownFilled,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  ProfileOutlined,
  QuestionCircleFilled,
  SmileFilled,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  ProSettings,
  SettingDrawer,
} from '@ant-design/pro-components';
import { ConfigProvider, Dropdown, Menu } from 'antd';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import defaultProps from '../Components/_HeaderMenuProps';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { useNotification } from '../../StartupContainers/ToastContainer';

function StudentLayout() {
  const { clearAuth, user } = useAuthStore();
  const toast = useNotification();
  const navigate = useNavigate();
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

  const [pathname, setPathname] = useState(window.location.pathname);
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
        <div
          id="test-pro-layout"
          style={{
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <ProConfigProvider hashed={false}>
            <ConfigProvider
              getTargetContainer={() => {
                return document.getElementById('test-pro-layout') || document.body;
              }}
            >
              <ProLayout
                prefixCls="my-prefix"
                {...defaultProps}
                location={{
                  pathname,
                }}
                token={{
                  header: {
                    colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                  },
                }}
                siderMenuType="group"
                avatarProps={{
                  src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                  size: 'default',
                  title: `${user?.firstName || ''} ${user?.lastName || ''} `,
                  render: (_props, dom) => {
                    return (
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: 'Profile',
                              icon: <ProfileOutlined />,
                              label: <Link to="/profile">Profile</Link>,
                            },
                            {
                              key: 'logout',
                              icon: <LogoutOutlined />,
                              label: 'Logout',
                              onClick: handleLogout,
                            },
                          ],
                        }}
                      >
                        {dom}
                      </Dropdown>
                    );
                  },
                }}
                actionsRender={(props) => {
                  if (props.isMobile) return [];
                  if (typeof window === 'undefined') return [];
                  return [
                    props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                      <SearchInput />
                    ) : undefined,
                    <InfoCircleFilled key="InfoCircleFilled" />,
                    <QuestionCircleFilled key="QuestionCircleFilled" />,
                    <GithubFilled key="GithubFilled" />,
                  ];
                }}
                title="EIU"
                logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
                headerTitleRender={(logo, title, _) => {
                  const defaultDom = (
                    <Link to={'/student/home'}>
                      {logo}
                      {title}
                    </Link>
                  );
                  if (typeof window === 'undefined') return defaultDom;
                  if (document.body.clientWidth < 1400) {
                    return defaultDom;
                  }
                  if (_.isMobile) return defaultDom;
                  return (
                    <>
                      {defaultDom}
                      <MenuCard />

                      <Link style={{ fontSize: '14px' }} to="/courses">
                        Course
                      </Link>
                    </>
                  );
                }}
                menuFooterRender={(props) => {
                  if (props?.collapsed) return undefined;
                  return (
                    <div
                      style={{
                        textAlign: 'center',
                        paddingBlockStart: 12,
                      }}
                    >
                      <div>© 2024 Made with love</div>
                      <div>by CTTH</div>
                    </div>
                  );
                }}
                menuItemRender={(item, dom) => <Link to={item.path || '/'}>{dom}</Link>}
                breadcrumbRender={(routers = []) => {
                  return [
                    {
                      path: '/profile',
                      breadcrumbName: 'Profile',
                    },
                    ...routers,
                  ];
                }}
                {...settings}
                menuDataRender={() => [
                  {
                    path: '/home',
                    name: 'Home',
                    icon: <SmileFilled />,
                  },
                  {
                    path: '/admin',
                    name: 'Admin',
                    icon: <CrownFilled />,
                    children: [
                      {
                        path: '/admin/student-management',
                        name: 'Student',
                      },
                      { path: '/admin/teacher-management', name: 'Teacher' },
                      { path: '/admin/staff-management', name: 'Staff' },
                    ],
                  },
                ]}
              >
                <PageContainer
                  token={{
                    paddingInlinePageContainerContent: num,
                  }}
                  title={false}
                >
                  <ProCard
                    style={{
                      height: 'fit-content',
                      minHeight: 800,
                    }}
                  >
                    <Outlet />
                  </ProCard>
                </PageContainer>
              </ProLayout>
            </ConfigProvider>
          </ProConfigProvider>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}

export default StudentLayout;
