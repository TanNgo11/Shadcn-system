import LoadingContainer from '@/containers/StartupContainers/LoadingContainer';
import { ErrorBoundary } from 'react-error-boundary';

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <Suspense fallback={<LoadingContainer />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Outlet />
      </ErrorBoundary>
    </Suspense>
  );
}

export default PublicLayout;
