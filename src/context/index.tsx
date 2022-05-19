import { Suspense, FunctionComponent, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Loading } from '../components/Loading';
import { AuthProvider } from './auth-context';

export const isDevMode = process.env.NODE_ENV === 'development';
export const isProdMode = process.env.NODE_ENV === 'production';

// if (isDevMode) {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

const ReactQueryDevTools = lazy(() =>
  import(`react-query/devtools`).then((module) => ({
    default: module.ReactQueryDevtools,
  })),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /*
        Enabling useErrorBoundary crashes the app whenever an error is thrown in a hook.
        We want to supply react-query hooks with errors instead of throwing them
        so that we can handle them on the FE appropriately.
      */
      // useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProviders: FunctionComponent = ({ children }) => (
  <Suspense fallback={<Loading />}>
    <QueryClientProvider client={queryClient}>
      <div>
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </div>
      {/* {isDevMode && <ReactQueryDevTools />} */}
    </QueryClientProvider>
  </Suspense>
);
