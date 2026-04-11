import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import { AppRoutes } from "@/app-routes";
import { AppShell } from "@/app-shell";
import { lazyPages } from "@/lib/page-imports";

const queryClient = new QueryClient();

const withPageLoader = (page: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>
    {page}
  </Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AppShell>
          <AppRoutes pages={lazyPages} wrapPage={withPageLoader} />
        </AppShell>
      </BrowserRouter>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
