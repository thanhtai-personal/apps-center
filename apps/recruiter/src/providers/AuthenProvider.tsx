import { LoadingPage } from "@/components/LoadingPage";
import { UnthorizedPage } from "@/components/UnthorizedPage";
import { runAuthen, useAuthenticationStore } from "@core-logic-hooks/react-auth";
import { observer } from "@core-ui/react-mobx-state";
import { useLocalStorageData } from "@core-utils/react-hooks";
import { ReactNode } from "react";

export const AuthenProvider = observer(({
  children
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useLocalStorageData("token", true);
  const { authStore } = useAuthenticationStore();

  runAuthen();

  if (authStore.loading) {
    return <LoadingPage />
  }

  if (!token) {
    return <>
      <UnthorizedPage />
    </>
  }

  return <>
    {children}
  </>
})