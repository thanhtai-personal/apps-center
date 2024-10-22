import { ReactNode } from "react";
import { AppLayout } from "@/layout/index"
import "./reset.css";
import "./index.css";
import { AppStoreProvider } from "./store";
import { NovelsProvider } from "@core-logic-hooks/react-novels";
import { SocialProvider } from "@core-utils/react-social-login";

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <SocialProvider
      config={{
        useGoogle: true,
        redirectUrl: import.meta.env.VITE_BASE_URL,
        ggAppId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      }}
    >
      <AppStoreProvider>
        <NovelsProvider config={{
          apiConfig: {
            apiEndpoint: import.meta.env.VITE_API_URL
          }
        }}>
          <AppLayout>
            {children}
          </AppLayout>
        </NovelsProvider>
      </AppStoreProvider>
    </SocialProvider>
  )
};
