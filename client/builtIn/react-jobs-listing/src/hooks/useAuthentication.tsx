import JobsListingSDK from "@core-sdk/jobs-listing";
import { useJobsListingStore } from "../store"

export const useLogin = (isAdmin?: boolean) => {
  const { userStore, notiStore } = useJobsListingStore();

  const onLogin = async () => {
    try {
      userStore.loading = true;
      await JobsListingSDK.getInstance().login({
        ...userStore.loginData,
        isAdmin
      });
      notiStore.messageQueue?.push({
        children: "Login success",
        variant: "success"
      })
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
    onLogin
  }
}