import { ReactNode } from "react";
import { AppLayout } from "@/layout/index"
import "./reset.css";
import "./index.css";
import { AppStoreProvider } from "./store";
import { RecruiterProvider } from "@core-ui/react-recruiter";

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <AppStoreProvider>
      <RecruiterProvider config={{
        apiConfig: {
          apiEndpoint: import.meta.env.VITE_API_URL
        }
      }}>
        <AppLayout>
          {children}
        </AppLayout>
      </RecruiterProvider>
    </AppStoreProvider>
  )
};
