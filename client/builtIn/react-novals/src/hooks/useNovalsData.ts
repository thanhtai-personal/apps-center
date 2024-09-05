import { useEffect } from "react";
import { useNovalsStore } from "../store"
import { NovalsSDK } from "@core-sdk/novals";
import { INovalFilter, INovalResponse, IPagination, IPagingFilter } from "@core-ui/novals-types";

type FilterParam = INovalFilter & IPagingFilter

export const useNovalsData = () => {
  const { novalStore } = useNovalsStore();

  const refetch = async () => {
    try {
      const novalsRs = await NovalsSDK.getInstance().getNovalControl().getMany((novalStore.filterData || {}) as FilterParam);
      novalStore.novals = novalsRs as IPagination<INovalResponse>;
    } catch (error) { }
  }

  return {
    refetch
  }
}

export const runNovalStore = () => {
  const { refetch } = useNovalsData();

  useEffect(() => {
    refetch();
  }, [])
}