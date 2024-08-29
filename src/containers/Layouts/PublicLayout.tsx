import LoadingContainer from '@/containers/StartupContainers/LoadingContainer';
import { Layout } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <Suspense fallback={<LoadingContainer />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Layout style={{ minHeight: '100vh' }}>
          <Outlet />
        </Layout>
      </ErrorBoundary>
    </Suspense>
  );
}

export default PublicLayout;
