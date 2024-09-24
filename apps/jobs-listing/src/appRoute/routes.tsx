import React from 'react';
import { IRouter } from '@core-ui/react-core';
import { Import } from '@core-utils/utils-helpers/import';
import { LoadingPage } from "@/components/LoadingPage";

const Home = Import({
  touch: React.lazy(() => import('@/containers/home')),
  desktop: React.lazy(() => import('@/containers/home'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const InputData = Import({
  touch: React.lazy(() => import('@/containers/admin/jobs')),
  desktop: React.lazy(() => import('@/containers/admin/jobs'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const NotFoundPage = Import({
  touch: React.lazy(() => import('@/containers/404')),
  desktop: React.lazy(() => import('@/containers/404'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;


const makeSuspense = (Component: React.FC) => {
  return <React.Suspense fallback={<LoadingPage isStrongPlatform={false} />}>
    <Component />
  </React.Suspense>
}

export const router: IRouter[] = [
  {
    element: makeSuspense(Home),
    path: '/'
  },
  {
    element: makeSuspense(Home),
    path: '/home'
  },
  {
    element: makeSuspense(InputData),
    path: '/data'
  },
  {
    path: "*",
    element: makeSuspense(NotFoundPage),
  },
];
