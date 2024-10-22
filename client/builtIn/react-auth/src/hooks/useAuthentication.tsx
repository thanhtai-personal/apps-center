import AppCenterSDK from "@core-sdk/app-center";
import { useAuthenticationStore } from "../store"
import { useLayoutEffect } from "react";
import { useLocalStorageData } from "@core-utils/react-hooks";

export const useAuthen = (isAdmin?: boolean) => {
  const { authStore, notiStore } = useAuthenticationStore();
  const [token, setToken] = useLocalStorageData("token");

  const onLogin = async (redirect?: string) => {
    try {
      if (!authStore.loginData) return;
      authStore.loading = true;
      const response: any = await AppCenterSDK.getInstance().login?.(authStore.loginData);
      setToken(response.data.access_token);
      authStore.authData = response.data;
      notiStore.messageQueue?.push({
        children: "Login success",
        variant: "success"
      });
      if (redirect) {
        window.location.replace(redirect)
      }
    } catch (error) {
      notiStore.messageQueue?.push({
        children: "Login Failed",
        variant: "error"
      })
    }
    finally {
      authStore.loading = false;
    }
  }

  return {
    onLogin,
  }
}

export const runAuthen = () => {
  const [token, setToken] = useLocalStorageData("token");

  useLayoutEffect(() => {
    if (!token) {
      AppCenterSDK.getInstance().logout?.();
      setTimeout(() => {
        window.location.replace("/login");
      }, 3000)
    }
    return () => {}; 
  }, [])

}