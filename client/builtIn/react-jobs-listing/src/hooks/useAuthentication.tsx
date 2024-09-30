import JobsListingSDK from "@core-sdk/jobs-listing";
import { useJobsListingStore } from "../store"
import { useLayoutEffect } from "react";
import { useLocalStorageData } from "@core-utils/react-hooks";

export const useAuthen = (isAdmin?: boolean) => {
  const { userStore, notiStore } = useJobsListingStore();
  const [token, setToken] = useLocalStorageData("token");

  const loginWithToken = async (token: string) => {
    try {
      userStore.loading = true;
      JobsListingSDK.getInstance().setAccessToken(token);
      JobsListingSDK.getInstance().login({
        token
      })
    } catch (error) {
      notiStore.messageQueue?.push({
        children: "Login failed",
        variant: "error"
      })
    } finally {
      userStore.loading = false;
    }
  }

  const onLogin = async () => {
    try {
      userStore.loading = true;
      const response: any = await JobsListingSDK.getInstance().login({
        ...userStore.loginData,
        isAdmin
      });
      setToken(response.data.access_token);
      userStore.user = response.data.user;
      notiStore.messageQueue?.push({
        children: "Login success",
        variant: "success"
      });
      if (isAdmin) {
        window.location.replace("/admin/data")
      } else {
        window.location.replace("/jobs")
      }
    } catch (error) {
      notiStore.messageQueue?.push({
        children: "Login Failed",
        variant: "error"
      })
    }
    finally {
      userStore.loading = false;
    }
  }

  return {
    onLogin,
    loginWithToken
  }
}

export const runAuthen = () => {
  const [token, setToken] = useLocalStorageData("token");
  const { loginWithToken } = useAuthen();

  useLayoutEffect(() => {
    if (!token) {
      // JobsListingSDK.getInstance().logout();
    } else {
      loginWithToken(token);
    }
    return () => {}; 
  }, [])

}