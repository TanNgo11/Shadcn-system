import studentSidebarProps from '@/containers/Layouts/Components/_StudentSidebarProps';
import SearchInput from '@/containers/Layouts/Components/SearchInputLayout';
import LoadingContainer from '@/containers/StartupContainers/LoadingContainer';
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import { NO_DATA } from '@/utils';
import { formatFullName } from '@/utils/format';
import { ONLINE_STATUS } from '@/zustand/auth/types';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import {
  GithubFilled,
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
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useNotification } from '../../StartupContainers/ToastContainer';
import { PATHS } from '../Components/_AdminSidebarProps';

function StudentLayout() {
  const { clearAuth, user, accessTokenState } = useAuthStore();
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
  const { isConnected, addUserToChat, disconnectUserFromChat } = useChatWebSocket({
    userId: user?.id?.toString(),
    token: String(accessTokenState),
    serverUrl: 'http://localhost:8086/chat-svc/ws',
    subscriptionChannels: [`/user/${user?.id}/queue/messages`, '/user/public'],
    onMessage: (message) => {
      if (message.source === '/user/public') {
        console.log('Public message', message);
      }
    },
  });

  const name = `${user?.firstName || NO_DATA} ${user?.middleName || NO_DATA} ${user?.lastName || NO_DATA}`;

  useEffect(() => {
    if (isConnected && user?.id) {
      addUserToChat({
        userId: Number(user?.id),
        fullName: formatFullName(user),
        status: ONLINE_STATUS.ONLINE,
        avatar: user?.avatar,
      });
    }
  }, [isConnected, user, addUserToChat]);

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
    if (user?.id) {
      disconnectUserFromChat(user?.id);
    }
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
                //{...defaultProps}
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
                  title: name,
                  render: (_props, dom) => {
                    return (
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: 'Profile',
                              icon: <ProfileOutlined />,
                              label: (
                                <Link
                                  to={PATHS.STUDENT_PROFILE.replace(
                                    ':userId',
                                    user?.id?.toString(),
                                  )}
                                >
                                  Profile
                                </Link>
                              ),
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
                      {/* <MenuCard />

                      <Link style={{ fontSize: '14px' }} to="/courses">
                        Course
                      </Link> */}
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
                {...settings}
                {...studentSidebarProps}
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
