import { useEffect } from "react";
import { NovalsSDK } from "@core-sdk/novals";
import { ICommentFilter, ICommentResponse, IPagination, IPagingFilter } from "@core-ui/novals-types";
import { useNovalsStore } from "../store";

type FilterParam = ICommentFilter & IPagingFilter

export const useCommentsData = () => {
  const { commentStore } = useNovalsStore();

  const refetch = async () => {
    try {
      const commentsRs = await NovalsSDK.getInstance().getCommentControl().getMany((commentStore.filterData || {}) as FilterParam);
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