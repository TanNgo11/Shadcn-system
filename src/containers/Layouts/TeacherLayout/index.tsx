import SearchInput from '@/containers/Layouts/Components/SearchInputLayout';
import LoadingContainer from '@/containers/StartupContainers/LoadingContainer';
import { NO_DATA } from '@/utils';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import {
  InfoCircleFilled,
  LogoutOutlined,
  ProfileOutlined,
  QuestionCircleFilled,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  ProSettings,
} from '@ant-design/pro-components';
import { ConfigProvider, Dropdown } from 'antd';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useNotification } from '../../StartupContainers/ToastContainer';
import teacherSidebarProps from '../Components/_TeacherSidebarProps';

function TeacherLayout() {
  const { user, clearAuth } = useAuthStore();
  const toast = useNotification();
  const navigate = useNavigate();
  const [settings, _] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: false,
    navTheme: 'light',
    contentWidth: 'Fluid',
    colorPrimary: '#1677FF',
    siderMenuType: 'sub',
    fixedHeader: true,
  });
  const name = `${user?.firstName || NO_DATA} ${user?.middleName || NO_DATA} ${
    user?.lastName || NO_DATA
  }`;
  const pathname = window.location.pathname;
  if (typeof document === 'undefined') {
    return <div />;
  }

  const handleLogout = () => {
    clearAuth();
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
                return document.getElementById('test-pro-layout') ?? document.body;
              }}
            >
              <ProLayout
                prefixCls="my-prefix"
                location={{
                  pathname,
                }}
                token={{
                  header: {
                    colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                  },
                }}
                siderMenuType="sub"
                avatarProps={{
                  src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                  size: 'default',
                  title: name,
                  render: (_props, dom) => {
                    return (
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: 'Profile',
                              icon: <ProfileOutlined />,
                              label: <Link to={`/teacher/profile/${user?.id}`}>Profile</Link>,
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
             
                // title="EIU"
                menuItemRender={(item, dom) => <Link to={item.path || '/'}>{dom}</Link>}
                logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
                {...teacherSidebarProps}
                {...settings}
              >
                <PageContainer>
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

export default TeacherLayout;
