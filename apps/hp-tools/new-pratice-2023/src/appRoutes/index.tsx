import LoadingFallback from "components/LoadingFallback";
import { lazy, Profiler, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import homeRoutes from "./home";
import adminRoutes from "./admin";
import siteonRoutes from "./siteon";

const HomePage = lazy(() => import("screens/Home"));
const NotFoundPage = lazy(() => import("screens/NotFound"));

function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  console.log(`%cPAGE-PERFORMANCE-LOGGER ON ${id}`, "color: green");
  console.log("Page phase:", phase);
  console.log("Page actual duration:", actualDuration);
  console.log("Page base duration:", baseDuration);
  console.log("Page start time:", startTime);
  console.log("Page commit time:", commitTime);
  console.log("Page interactions:", interactions);
  console.log("%cEND-PAGE-PERFORMANCE-LOGGER", "color: green");
}

const makeProfiler = (id, ComposedComponent: any) => {
  return (
    <Profiler id={id} onRender={onRenderCallback}>
      {ComposedComponent}
    </Profiler>
  );
};

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        {process.env.NODE_ENV === "development" ? (
          makeProfiler("home-page", <HomePage />)
        ) : (
          <HomePage />
        )}
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        {process.env.NODE_ENV === "development" ? (
          makeProfiler("home-page", <NotFoundPage />)
        ) : (
          <NotFoundPage />
        )}
      </Suspense>
    ),
    loader: LoadingFallback,
  },
  ...homeRoutes,
  ...adminRoutes,
  ...siteonRoutes,
]);

export default appRoutes;
