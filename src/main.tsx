import { ONE_HOUR } from '@/config/constants.ts';
import MainNavigator from '@/containers';
import LoadingContainer from '@/containers/StartupContainers/LoadingContainer';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { NotificationProvider } from './containers/StartupContainers/ToastContainer';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: ONE_HOUR,
      onError(err: unknown | Error) {
        console.error(err);
      },
    },
    mutations: {
      onError(err: unknown | Error) {
        console.error(err);
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={enUS}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingContainer />}>
          <NotificationProvider>
            <MainNavigator />
          </NotificationProvider>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
    ,
  </React.StrictMode>,
);
