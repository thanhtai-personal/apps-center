import { Suspense, lazy } from "react";

const NotFoundPage = lazy(() => import("@/containers/404"));

export const router = [
  {
    path: "*",
    element: (
      <Suspense fallback={<div>loading</div>}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];
