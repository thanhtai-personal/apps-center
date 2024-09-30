import { UnthorizedPage } from "@/components/UnthorizedPage";
import { runAuthen } from "@core-ui/react-job-listing";
import { observer } from "@core-ui/react-mobx-state";
import { useLocalStorageData } from "@core-utils/react-hooks";
import { ReactNode } from "react";

export const AuthenProvider = observer(({
  children
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useLocalStorageData("token");

  runAuthen();

  if (!token) {
    return <>
      <UnthorizedPage />
    </>
  } else {
    return <>
    {children}
  </>
  };
})