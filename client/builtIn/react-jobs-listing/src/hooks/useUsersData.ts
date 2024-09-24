import { useEffect } from "react";
import { JobsListingSDK } from "@core-sdk/jobs-listing";
import { IUserFilter, IUserResponse, IPagination, IPagingFilter } from "@core-ui/jobs-listing-types";
import { useJobsListingStore } from "../store";

type FilterParam = IUserFilter & IPagingFilter

export const useUsersData = () => {
  const { userStore } = useJobsListingStore();

  const refetch = async () => {
    try {
      const usersRs = await JobsListingSDK.getInstance().getUserControl().getMany((userStore.filterData || {}) as FilterParam);
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