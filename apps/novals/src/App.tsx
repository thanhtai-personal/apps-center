import { ReactNode } from "react";
import { AppLayout } from "@/layout/index"
import "./reset.css";
import "./index.css";
import { AppStoreProvider } from "./store";
import { NovalsProvider } from "@core-ui/react-novals";

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <AppStoreProvider>
      <NovalsProvider config={{
        apiConfig: {
          apiEndpoint: import.meta.env.VITE_API_URL
        }
      }}>
        <AppLayout>
          {children}
        </AppLayout>
      </NovalsProvider>
    </AppStoreProvider>
  )
};
