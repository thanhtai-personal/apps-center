import { useEffect } from "react";
import { NovelsSDK } from "@core-sdk/novels";
import { IUserFilter, IUserResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

type FilterParam = IUserFilter & IPagingFilter

export const useUsersData = () => {
  const { userStore } = useNovelsStore();

  const refetch = async () => {
    try {
      const usersRs = await NovelsSDK.getInstance().getUserControl().getMany((userStore.filterData || {}) as FilterParam);
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