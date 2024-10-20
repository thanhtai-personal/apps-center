import { useEffect } from "react";
import { JobsListingSDK } from "@core-sdk/jobs-listing";
import { IRoleFilter, IRoleResponse, IPagination, IPagingFilter } from "@core-ui/jobs-listing-types";
import { useJobsListingStore } from "../store";

type FilterParam = IRoleFilter & IPagingFilter

export const useRolesData = () => {
  const { roleStore } = useJobsListingStore();

  const refetch = async () => {
    try {
      const rolesRs = await JobsListingSDK.getInstance().getRoleControl().getMany((roleStore.filterData || {}) as FilterParam);
      roleStore.roles = rolesRs as IPagination<IRoleResponse>;
    } catch (error) {}
  }

  return {
    refetch
  }
}

export const runRoleStore = () => {
  const { refetch } = useRolesData();

  useEffect(() => {
    refetch();
  }, [])
}