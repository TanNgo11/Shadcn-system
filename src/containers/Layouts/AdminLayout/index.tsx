import SearchInput from '@/containers/Layouts/Components/SearchInputLayout';
import LoadingContainer from '@/containers/StartupContainers/LoadingContainer';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  ProfileOutlined,
  QuestionCircleFilled
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  ProSettings
} from '@ant-design/pro-components';
import { ConfigProvider, Dropdown } from 'antd';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useNotification } from '../../StartupContainers/ToastContainer';
import adminSidebarProps from '../Components/_AdminSidebarProps';
import defaultProps from '../Components/_HeaderMenuProps';

function AdminLayout() {
  const { clearAuth } = useAuthStore();
  const user = useAuthStore((s) => s.user);
  const name = `${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}`.trim().replace(/\s+/g, ' ');
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
                bgLayoutImgList={[
                  {
                    src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                    left: 85,
                    bottom: 100,
                    height: '303px',
                  },
                  {
                    src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                    bottom: -68,
                    right: -45,
                    height: '303px',
                  },
                  {
                    src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                    bottom: 0,
                    left: 0,
                    width: '331px',
                  },
                ]}
                {...defaultProps}
                //location={location}
                token={{
                  header: {
                    colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                  },
                }}
                siderMenuType="sub"
                menu={{
                  collapsedShowGroupTitle: true,
                }}
                avatarProps={{
                  src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                  size: 'small',
                  title: name,
                  render: (_props, dom) => {
                    return (
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: 'Profile',
                              icon: <ProfileOutlined />,
                              label: <Link to="/admin/profile">Profile</Link>,
                            },
                            {
                              key: 'Logout',
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
                // headerTitleRender={(logo, title, _) => {
                //   const customLogo = (
                //     <img
                //       src="/logoAndName.webp"
                //       alt="Logo"
                //       style={{ height: '46px', marginLeft: '12px' }}
                //     />
                //   );
                //   const defaultDom = <a>{customLogo}</a>;
                //   if (typeof window === 'undefined') return defaultDom;
                //   if (document.body.clientWidth < 1400) {
                //     return defaultDom;
                //   }
                //   if (_.isMobile) return defaultDom;
                //   return (
                //     <>
                //       {defaultDom}
                //       <MenuCard />
                //       <Link style={{ fontSize: '14px' }} to="/courses">
                //         Course
                //       </Link>
                //     </>
                //   );
                // }}
                onMenuHeaderClick={(e) => console.log(e)}
                menuItemRender={(item, dom) => <Link to={item.path || '/'}>{dom}</Link>}

                {...settings}
                {...adminSidebarProps}
              >
                <PageContainer
                  token={{
                    paddingInlinePageContainerContent: num,
                  }}
                >
                  <ProCard
                    style={{
                      height: 'fit-content',
                      minHeight: 800,
                    }}
                  >
                    <div />
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

export default AdminLayout;
