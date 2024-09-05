import { useEffect } from "react";
import { NovalsSDK } from "@core-sdk/novals";
import { IUserFilter, IUserResponse, IPagination, IPagingFilter } from "@core-ui/novals-types";
import { useNovalsStore } from "../store";

type FilterParam = IUserFilter & IPagingFilter

export const useUsersData = () => {
  const { userStore } = useNovalsStore();

  const refetch = async () => {
    try {
      const usersRs = await NovalsSDK.getInstance().getUserControl().getMany((userStore.filterData || {}) as FilterParam);
      userStore.users = usersRs as IPagination<IUserResponse>;
    } catch (error) { }
  }

  return {
    refetch
  }
}

export const runUserStore = () => {
  const { refetch } = useUsersData();

  useEffect(() => {
    refetch();
  }, [])
}