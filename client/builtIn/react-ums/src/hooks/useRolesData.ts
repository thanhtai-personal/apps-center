import { useEffect } from "react";
import { useEffect } from "react";
import { AppCenterSDK } from "@core-sdk/app-center";
import { IRoleFilter, IRoleResponse, IPagination, IPagingFilter } from "@core-ui/ums-types";
import { useJobsListingStore } from "../store";

type FilterParam = IRoleFilter & IPagingFilter

export const useRolesData = () => {
  const { roleStore } = useJobsListingStore();

  const refetch = async () => {
    try {
      const rolesRs = await AppCenterSDK.getInstance().getRoleControl().getMany((roleStore.filterData || {}) as FilterParam);
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