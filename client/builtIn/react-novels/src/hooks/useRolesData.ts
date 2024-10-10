import { useEffect } from "react";
import { NovelsSDK } from "@core-sdk/novels";
import { IRoleFilter, IRoleResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

type FilterParam = IRoleFilter & IPagingFilter

export const useRolesData = () => {
  const { roleStore } = useNovelsStore();

  const refetch = async () => {
    try {
      const rolesRs = await NovelsSDK.getInstance().getRoleControl().getMany((roleStore.filterData || {}) as FilterParam);
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