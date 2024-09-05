import { useEffect } from "react";
import { NovalsSDK } from "@core-sdk/novals";
import { IAuthorFilter, IAuthorResponse, IPagination, IPagingFilter } from "@core-ui/novals-types";
import { useNovalsStore } from "../store";

type FilterParam = IAuthorFilter & IPagingFilter

export const useAuthorsData = () => {
  const { authorStore } = useNovalsStore();

  const refetch = async () => {
    try {
      const authorsRs = await NovalsSDK.getInstance().getAuthorControl().getMany((authorStore.filterData || {}) as FilterParam);
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