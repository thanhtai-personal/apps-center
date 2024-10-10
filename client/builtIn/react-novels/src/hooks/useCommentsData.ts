import { useEffect } from "react";
import { NovelsSDK } from "@core-sdk/novels";
import { ICommentFilter, ICommentResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

type FilterParam = ICommentFilter & IPagingFilter

export const useCommentsData = () => {
  const { commentStore } = useNovelsStore();

  const refetch = async () => {
    try {
      const commentsRs = await NovelsSDK.getInstance().getCommentControl().getMany((commentStore.filterData || {}) as FilterParam);
      commentStore.comments = commentsRs as IPagination<ICommentResponse>;
    } catch (error) { }
  }

  return {
    refetch
  }
}

export const runCommentStore = () => {
  const { refetch } = useCommentsData();

  useEffect(() => {
    refetch();
  }, [])
}