import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AppLayout } from '@/containers/layout';

export const AppRoute = () => {
  return (
    <AppLayout>
      <RouterProvider router={router} />
    </AppLayout>
  );
};
