import { ReactNode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IAppProvider, IReactApp, ReactApp } from "../dom";

// Define the structure of a single router entry
export interface IRouter {
  path: string;
  element: ReactNode;
}

// Interface extending IReactApp by adding a 'router' property
export interface IAppWithRoute extends Omit<IReactApp, "App"> {
  router: IRouter[]; // Array of IRouter objects defining routes
}

// Props interface for AppRouter component
export interface IAppRouteProps {
  router: IRouter[]; // Array of IRouter objects defining routes
}

// Function to create a BrowserRouter based on provided router configuration
const buildAppRoute: (router: IRouter[]) => any = (router: IRouter[]) =>
  createBrowserRouter(router);

// Functional component representing the application router
const AppRouter: React.FC<IAppRouteProps> = ({ router }) => {
  const _router = buildAppRoute(router); // Create BrowserRouter instance based on provided router
  return <RouterProvider router={_router} />; // Render RouterProvider with created BrowserRouter
};

// Class representing a React application manager
export class ReactApplicationManager {
  private providers?: React.FC<IAppProvider>[]; // Optional array of providers
  private rootId: string = "root"; // Default root ID for rendering
  private router: IRouter[]; // Array of router configurations defining application routes
  private strictMode: boolean = true; // Flag indicating whether to use React StrictMode

  constructor(props: IAppWithRoute) {
    // Initialize class properties based on provided props
    this.providers = props.providers || []; // Set providers or default to an empty array
    this.rootId = props.rootId || "root"; // Set root ID or default to "root"
    this.strictMode = Boolean(props.strictMode) ? this.strictMode : true; // Set strictMode based on provided props
    this.router = props.router || []; // Set router configurations or default to an empty array
  }

  // Method to add a single provider entry
  addProvider = (provider: React.FC<IAppProvider>) => {
    this.providers = [...(this.providers || []), provider]; // Add a new provider to the 'provider' array
  };

  // Method to add multiple provider entries
  addProviders = (providers: React.FC<IAppProvider>[]) => {
    this.providers = [...(this.providers || []), ...providers]; // Concatenate new providers to the 'provider' array
  };

  // Method to add a single router entry
  addRoute = (router: IRouter) => {
    this.router = [router, ...this.router]; // Add a new router to the 'router' array
  };

  // Method to add multiple router entries
  addRoutes = (routers: IRouter[]) => {
    this.router = [...routers, ...this.router]; // Concatenate new routers to the 'router' array
  };

  // Method to remove a router entry at a specified index
  removeRoutes = (routers: IRouter[]) => {
    // Make a copy of the current router array
    const updatedRouter = [...this.router];

    // Iterate over each route to be removed
    routers.forEach((routeToRemove) => {
      // Find the index of the route to remove in the updatedRouter array
      const index = updatedRouter.findIndex(
        (route) =>
          route.path === routeToRemove.path,
      );

      // Check if the route was found in the array
      if (index !== -1) {
        // Remove the route at the found index using splice
        updatedRouter.splice(index, 1);
      } else {
        console.error(
          `Route not found: ${routeToRemove.path}. No route removed.`,
        );
      }
    });

    // Update the 'router' property with the updated array
    this.router = updatedRouter;

    // Alternatively, if 'router' is a state in a React component, you would update the state here
  };

  stop = () => {
    const rootElement = document.getElementById(this.rootId);

    if (rootElement) {
      // Check if the root element has any child nodes
      while (rootElement.firstChild) {
        // Remove the first child node of the root element
        rootElement.removeChild(rootElement.firstChild);
      }
    } else {
      console.warn(`Root element with ID '${this.rootId}' not found.`);
    }
  };

  // Method to start the React application
  start = () => {
    // Render the React application using ReactApp function from '../dom'
    ReactApp({
      strictMode: this.strictMode, // Pass strictMode flag
      providers: this.providers, // Pass providers array
      rootId: this.rootId, // Pass root ID for rendering
      renderedApp: <AppRouter router={this.router} />, // Pass AppRouter component with 'router' prop
    });
  };

  restart = () => {
    this.stop();
    this.start();
  };
}
