import ErrorContainer from "appRoutes/RouterErrorElement";
import LoadingFallback from "components/LoadingFallback";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("screens/Login"));
const Signup = lazy(() => import("screens/Signup"));

const siteonRoutes = [
  {
    path: "login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
    errorElement: <ErrorContainer />,
    loader: LoadingFallback,
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Signup />
      </Suspense>
    ),
    errorElement: <ErrorContainer />,
    loader: LoadingFallback,
  },
];

export default siteonRoutes;
