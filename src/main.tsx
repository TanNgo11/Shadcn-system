import { ONE_HOUR } from "@/config/constants.ts";
import MainNavigator from "@/containers";
import LoadingContainer from "@/containers/StartupContainers/LoadingContainer";
import "@/styles/globals.css";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<LoadingContainer />}>
      <MainNavigator />
    </Suspense>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  // </React.StrictMode>,
);
