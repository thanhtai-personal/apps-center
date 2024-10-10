import { useEffect } from "react";
import { NovelsSDK } from "@core-sdk/novels";
import { IAuthorFilter, IAuthorResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

type FilterParam = IAuthorFilter & IPagingFilter

export const useAuthorsData = () => {
  const { authorStore } = useNovelsStore();

  const refetch = async () => {
    try {
      const authorsRs = await NovelsSDK.getInstance().getAuthorControl().getMany((authorStore.filterData || {}) as FilterParam);
      authorStore.authors = authorsRs as IPagination<IAuthorResponse>;
    } catch (error) {}
  }

  return {
    refetch
  }
}

export const runAuthorStore = () => {
  const { refetch } = useAuthorsData();

  useEffect(() => {
    refetch();
  }, [])
}