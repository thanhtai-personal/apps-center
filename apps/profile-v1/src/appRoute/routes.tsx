import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingComponent } from "@/components/index"

const HomePage = lazy(() => import('@/containers/home/index'));


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingComponent loadingPage />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<LoadingComponent loadingPage />}>
        <HomePage />
      </Suspense>
    ),
  },
]);
