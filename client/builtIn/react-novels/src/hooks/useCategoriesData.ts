import { useEffect } from "react";
import { NovelsSDK } from "@core-sdk/novels";
import { ICategoryFilter, ICategoryResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";
import { useNovelsStore } from "../store";

type FilterParam = ICategoryFilter & IPagingFilter

export const useCategoriesData = () => {
  const { categoryStore } = useNovelsStore();

  const refetch = async () => {
    try {
      const categoriesRs = await NovelsSDK.getInstance().getCategoryControl().getMany((categoryStore.filterData || {}) as FilterParam);
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