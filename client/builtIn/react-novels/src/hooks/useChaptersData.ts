import { useEffect } from "react";
import { NovelsSDK } from "@core-sdk/novels";
import { IChapterFilter, IChapterResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

type FilterParam = IChapterFilter & IPagingFilter

export const useChaptersData = () => {
  const { chapterStore } = useNovelsStore();

  const refetch = async () => {
    try {
      const chaptersRs = await NovelsSDK.getInstance().getChapterControl().getMany((chapterStore.filterData || {}) as FilterParam);
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