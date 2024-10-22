import JobsListingSDK from "@core-sdk/jobs-listing";
import { useJobsListingStore } from "../store"
import { useLayoutEffect } from "react";
import { useLocalStorageData } from "@core-utils/react-hooks";

export const useAuthen = (isAdmin?: boolean) => {
  const { authStore, notiStore } = useJobsListingStore();
  const [token, setToken] = useLocalStorageData("token");

  const loginWithToken = async (token: string) => {
    try {
      authStore.loading = true;
      JobsListingSDK.getInstance().setAccessToken(token);
      JobsListingSDK.getInstance().login({
        token
      })
      if (isAdmin) {
        window.location.replace("/admin/data")
      } else {
        window.location.replace("/")
      }
    } catch (error) {
      notiStore.messageQueue?.push({
        children: "Login failed",
        variant: "error"
      })
    } finally {
      authStore.loading = false;
    }
  }

  const onLogin = async () => {
    try {
      authStore.loading = true;
      const response: any = await JobsListingSDK.getInstance().login({
        ...authStore.loginData,
        isAdmin
      });
      setToken(response.data.access_token);
      authStore.user = response.data.user;
      notiStore.messageQueue?.push({
        children: "Login success",
        variant: "success"
      });
      if (isAdmin) {
        window.location.replace("/admin/data")
      } else {
        window.location.replace("/")
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
    loginWithToken
  }
}

export const runAuthen = () => {
  const [token, setToken] = useLocalStorageData("token");
  const { loginWithToken } = useAuthen();

  useLayoutEffect(() => {
    if (!token) {
      // JobsListingSDK.getInstance().logout();
      setTimeout(() => {
        window.location.replace("/login");
      }, 3000)
    } else {
      loginWithToken(token);
    }
    return () => {}; 
  }, [])

}