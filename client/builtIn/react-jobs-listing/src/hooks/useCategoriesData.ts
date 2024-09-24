import { useEffect } from "react";
import { JobsListingSDK } from "@core-sdk/jobs-listing";
import { ICategoryFilter, ICategoryResponse, IPagination, IPagingFilter } from "@core-ui/jobs-listing-types";
import { useJobsListingStore } from "../store";

type FilterParam = ICategoryFilter & IPagingFilter

export const useCategoriesData = () => {
  const { categoryStore } = useJobsListingStore();

  const refetch = async () => {
    try {
      const categoriesRs = await JobsListingSDK.getInstance().getCategoryControl().getMany((categoryStore.filterData || {}) as FilterParam);
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