import { useEffect } from "react";
import { NovalsSDK } from "@core-sdk/novals";
import { IChapterFilter, IChapterResponse, IPagination, IPagingFilter } from "@core-ui/novals-types";
import { useNovalsStore } from "../store";

type FilterParam = IChapterFilter & IPagingFilter

export const useChaptersData = () => {
  const { chapterStore } = useNovalsStore();

  const refetch = async () => {
    try {
      const chaptersRs = await NovalsSDK.getInstance().getChapterControl().getMany((chapterStore.filterData || {}) as FilterParam);
      chapterStore.chapters = chaptersRs as IPagination<IChapterResponse>;
    } catch (error) {}
  }

  return {
    refetch
  }
}

export const runChapterStore = () => {
  const { refetch } = useChaptersData();

  useEffect(() => {
    refetch();
  }, [])
}