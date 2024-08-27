import Sidebar from '@/containers/Sidebar';
import LoadingContainer from '@/containers/StartupContainers/LoadingContainer';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, theme } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';

import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

function StudentLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  //test
  return (
    <Suspense fallback={<LoadingContainer />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar collapsed={collapsed} />
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Outlet />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </ErrorBoundary>
    </Suspense>
  );
}

export default StudentLayout;
