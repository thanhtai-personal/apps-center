import React from 'react';
import { IRouter } from '@core-ui/react-core';
import { Import } from '@core-utils/utils-helpers/import';
import { LoadingPage } from "@/components/LoadingPage";
import { AuthenProvider } from "@/providers/AuthenProvider";

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

const AdminJobsBoard = Import({
  touch: React.lazy(() => import('@/containers/admin/jobs')),
  desktop: React.lazy(() => import('@/containers/admin/jobs'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const AdminLogin = Import({
  touch: React.lazy(() => import('@/containers/admin/login')),
  desktop: React.lazy(() => import('@/containers/admin/login'))
}) as React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

const Login = Import({
  touch: React.lazy(() => import('@/containers/login')),
  desktop: React.lazy(() => import('@/containers/login'))
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

const requiredAuthen = (Component: React.FC) => {
  return <React.Suspense fallback={<LoadingPage isStrongPlatform={false} />}>
    <AuthenProvider>
      <Component />
    </AuthenProvider>
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
    element: makeSuspense(Login),
    path: '/login'
  },
  {
    element: requiredAuthen(AdminJobsBoard),
    path: '/admin/data'
  },
  {
    element: makeSuspense(AdminLogin),
    path: '/admin/login'
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