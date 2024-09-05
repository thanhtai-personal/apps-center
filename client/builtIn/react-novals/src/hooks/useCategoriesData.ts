import { useEffect } from "react";
import { NovalsSDK } from "@core-sdk/novals";
import { ICategoryFilter, ICategoryResponse, IPagination, IPagingFilter } from "@core-ui/novals-types";
import { useNovalsStore } from "../store";

type FilterParam = ICategoryFilter & IPagingFilter

export const useCategoriesData = () => {
  const { categoryStore } = useNovalsStore();

  const refetch = async () => {
    try {
      const categoriesRs = await NovalsSDK.getInstance().getCategoryControl().getMany((categoryStore.filterData || {}) as FilterParam);
      categoryStore.categories = categoriesRs as IPagination<ICategoryResponse>;
    } catch (error) { }
  }

  return {
    refetch
  }
}

export const runCategoryStore = () => {
  const { refetch } = useCategoriesData();

  useEffect(() => {
    refetch();
  }, [])
}