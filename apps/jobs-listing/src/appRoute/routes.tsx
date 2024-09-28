import React from 'react';
import { IRouter } from '@core-ui/react-core';
import { Import } from '@core-utils/utils-helpers/import';
import { LoadingPage } from "@/components/LoadingPage";

const Jobs = Import({
  touch: React.lazy(() => import('@/containers/jobs')),
  desktop: React.lazy(() => import('@/containers/jobs'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const Portfolio = Import({
  touch: React.lazy(() => import('@/containers/portfolio')),
  desktop: React.lazy(() => import('@/containers/portfolio'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const Home = Import({
  touch: React.lazy(() => import('@/containers/home')),
  desktop: React.lazy(() => import('@/containers/home'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const SavedJobs = Import({
  touch: React.lazy(() => import('@/containers/savedJobs')),
  desktop: React.lazy(() => import('@/containers/savedJobs'))
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
    element: makeSuspense(Jobs),
    path: '/'
  },
  {
    element: makeSuspense(Home),
    path: '/home'
  },
  {
    element: makeSuspense(Jobs),
    path: '/jobs'
  },
  {
    element: makeSuspense(Portfolio),
    path: '/me'
  },
  {
    element: makeSuspense(InputData),
    path: '/data'
  },
  {
    element: makeSuspense(SavedJobs),
    path: '/jobs/saved'
  },
  {
    path: "*",
    element: makeSuspense(NotFoundPage),
  },
];