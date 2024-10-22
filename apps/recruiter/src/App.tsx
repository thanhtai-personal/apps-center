import { ReactNode } from "react";
import { AppLayout } from "@/layout/index"
import "./reset.css";
import "./index.css";
import { AppStoreProvider } from "./store";
import { RecruiterProvider } from "@core-logic-hooks/react-recruiter";
import { AuthProvider } from "@core-logic-hooks/react-auth";
import { UMSProvider } from "@core-logic-hooks/react-ums";

export const App = ({ children }: { children: ReactNode }) => {
  return (
    <AppStoreProvider>
      <AuthProvider config={{
        apiConfig: {
          apiEndpoint: import.meta.env.VITE_API_URL
        }
      }}>
        <UMSProvider config={{
          apiConfig: {
            apiEndpoint: import.meta.env.VITE_API_URL
          }
        }}>
          <RecruiterProvider config={{
            apiConfig: {
              apiEndpoint: import.meta.env.VITE_API_URL
            }
          }}>
            <AppLayout>
              {children}
            </AppLayout>
          </RecruiterProvider>
        </UMSProvider>
      </AuthProvider>
    </AppStoreProvider>
  )
};
