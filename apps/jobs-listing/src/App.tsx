import { ReactNode } from "react";
import { AppLayout } from "@/layout/index"
import "./reset.css";
import "./index.css";
import { AppStoreProvider } from "./store";
import { JobsListingProvider } from "@core-ui/react-job-listing";

export const App = ({ children }: { children: ReactNode }) => {
  return (
    // <SocialProvider
    //   config={{
    //     useGoogle: true,
    //     redirectUrl: import.meta.env.VITE_BASE_URL,
    //     ggAppId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    //   }}
    // >
      <AppStoreProvider>
        <JobsListingProvider config={{
          apiConfig: {
            apiEndpoint: import.meta.env.VITE_API_URL
          }
        }}>
          <AppLayout>
            {children}
          </AppLayout>
        </JobsListingProvider>
      </AppStoreProvider>
    // </SocialProvider>
  )
};
