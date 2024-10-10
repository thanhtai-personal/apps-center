import { useEffect } from "react";
import { useNovelsStore } from "../store"
import { NovelsSDK } from "@core-sdk/novels";
import { INovelFilter, INovelResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";

type FilterParam = INovelFilter & IPagingFilter

export const useNovelsData = () => {
  const { novelStore } = useNovelsStore();

  const refetch = async () => {
    try {
      const novelsRs = await NovelsSDK.getInstance().getNovelControl().getMany((novelStore.filterData || {}) as FilterParam);
      novelStore.novels = novelsRs as IPagination<INovelResponse>;
    } catch (error) { }
  }

  const getRankingNovels = async () => {
    try {
      const novelsRs: any = await NovelsSDK.getInstance().getRankingNovels(({
        limit: 10,
        offset: 0,
      }) as FilterParam);
      novelStore.topFollow = novelsRs.data.topFollow;
      novelStore.topLike = novelsRs.data.topLike;
      novelStore.topView = novelsRs.data.topView;
      novelStore.topVote = novelsRs.data.topVote;
    } catch (error) { }
  }

  return {
    refetch,
    getRankingNovels
  }
}

export const runNovelStore = () => {
  const { refetch, getRankingNovels } = useNovelsData();

  useEffect(() => {
    refetch();
    getRankingNovels();
  }, [])
}