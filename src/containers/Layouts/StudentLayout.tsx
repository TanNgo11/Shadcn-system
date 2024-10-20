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
import { Link, Outlet } from 'react-router-dom';
import defaultProps from './Components/_HeaderMenuProps';

function StudentLayout() {
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
                location={{
                  pathname,
                }}
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
                  title: 'Ngo Thanh Tan',
                  render: (props, dom) => {
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
                headerTitleRender={(logo, title, _) => {
                  const defaultDom = (
                    <a>
                      {logo}
                      {title}
                    </a>
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
                      <div>© 2021 Made with love</div>
                      <div>by Ant Design</div>
                    </div>
                  );
                }}
                onMenuHeaderClick={(e) => console.log(e)}
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
                      { path: '/admin/sub-page1', name: 'Sub Page 1' },
                      { path: '/admin/sub-page2', name: 'Sub Page 2' },
                    ],
                  },
                ]}
              >
                <PageContainer
                  token={{
                    paddingInlinePageContainerContent: num,
                  }}
                  subTitle="Subtitle"
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

                <SettingDrawer
                  pathname={pathname}
                  enableDarkTheme
                  getContainer={(e: any) => {
                    if (typeof window === 'undefined') return e;
                    return document.getElementById('test-pro-layout');
                  }}
                  settings={settings}
                  onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                  }}
                  disableUrlParams={false}
                />
              </ProLayout>
            </ConfigProvider>
          </ProConfigProvider>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}

export default StudentLayout;
