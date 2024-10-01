import { router } from "@/appRoute/index";
import { IAppWithRoute, ReactApplicationManager } from "@ttt-ui/react-core";
import buildinFeatures from "@/features/index";
import allProviders from "./providers/index";
import { App } from "./App";

let reactApp = new ReactApplicationManager({
  rootId: "root",
  providers: [],
  strictMode: true,
  router: router, //add your custom router here
} as unknown as IAppWithRoute);

// App feature area
if (buildinFeatures) {
  buildinFeatures.forEach(
    (
      feat: (appManager: ReactApplicationManager) => ReactApplicationManager,
    ) => {
      reactApp = feat(reactApp);
    },
  );
}

// App providers area (A provider is a HOC component, which wrapped your application main components (all of your router))
reactApp.addProviders(allProviders || []);
reactApp.addProvider(App);

// Render your app into root element here!
reactApp.start();
