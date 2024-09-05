import { useEffect } from "react";
import { NovalsSDK } from "@core-sdk/novals";
import { IRoleFilter, IRoleResponse, IPagination, IPagingFilter } from "@core-ui/novals-types";
import { useNovalsStore } from "../store";

type FilterParam = IRoleFilter & IPagingFilter

export const useRolesData = () => {
  const { roleStore } = useNovalsStore();

  const refetch = async () => {
    try {
      const rolesRs = await NovalsSDK.getInstance().getRoleControl().getMany((roleStore.filterData || {}) as FilterParam);
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