import { useEffect } from "react";
import { useEffect } from "react";
import { AppCenterSDK } from "@core-sdk/app-center";
import { IPermissionFilter, IPermissionResponse, IPagination, IPagingFilter } from "@core-ui/ums-types";
import { useUMSStore } from "../store";

type FilterParam = IPermissionFilter & IPagingFilter

export const usePermissionsData = () => {
  const { permissionStore } = useUMSStore();

  const refetch = async () => {
    try {
      const permissionsRs = await AppCenterSDK.getInstance().getPermissionControl().getMany((permissionStore.filterData || {}) as FilterParam);
      permissionStore.permissions = permissionsRs as IPagination<IPermissionResponse>;
    } catch (error) {}
  }

  return {
    refetch
  }
}

export const runPermissionStore = () => {
  const { refetch } = usePermissionsData();

  useEffect(() => {
    refetch();
  }, [])
}