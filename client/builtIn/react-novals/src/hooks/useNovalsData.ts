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

  const getRankingNovals = async () => {
    try {
      const novalsRs: any = await NovalsSDK.getInstance().getRankingNovals(({
        limit: 10,
        offset: 0,
      }) as FilterParam);
      novalStore.topFollow = novalsRs.data.topFollow;
      novalStore.topLike = novalsRs.data.topLike;
      novalStore.topView = novalsRs.data.topView;
      novalStore.topVote = novalsRs.data.topVote;
    } catch (error) { }
  }

  return {
    refetch,
    getRankingNovals
  }
}

export const runNovalStore = () => {
  const { refetch, getRankingNovals } = useNovalsData();

  useEffect(() => {
    refetch();
    getRankingNovals();
  }, [])
}