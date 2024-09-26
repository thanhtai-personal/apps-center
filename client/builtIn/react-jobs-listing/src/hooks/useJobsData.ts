import { useEffect, useMemo } from "react";
import { JobsListingSDK } from "@core-sdk/jobs-listing";
import { useJobsListingStore } from "../store";

export const useJobsData = () => {
  const { jobStore, notiStore } = useJobsListingStore();

  const refetch = async () => {
    try {
      jobStore.loading = true;
      const response = await JobsListingSDK.getInstance().getJobControl().getMany((jobStore.filterData || {}) as any);
      jobStore.jobs = response;
    } catch (error) {} finally {
      jobStore.loading = false;
    }
  }

  const searchJobs = async (filter = {}) => {
    try {
      jobStore.loading = true;
      const response = await JobsListingSDK.getInstance().getJobControl().getMany({...(jobStore.filterData || {}), ...filter} as any);
      jobStore.jobs = response;
    } catch (error) {} finally {
      jobStore.loading = false;
    }
  }

  const getJobDetail = async (id: string | number) => {
    try {
      jobStore.loading = true;
      const response = await JobsListingSDK.getInstance().getJobControl().getOne(id);
      jobStore.job = response.data;
    } catch (error) {} finally {
      jobStore.loading = false;
    }
  }

  const deleteJob = async (id: string | number) => {
    try {
      jobStore.loading = true;
      const response = await JobsListingSDK.getInstance().getJobControl().delete(id);
      notiStore.messageQueue = [...(notiStore.messageQueue || []), {
        children: "Delete Success",
        variant: "success"
      }]
      await refetch();
    } catch (error) {
      notiStore.messageQueue = [...(notiStore.messageQueue || []), {
        children: "Delete failed",
        variant: "error"
      }]
    } finally {
      jobStore.loading = false;
    }
  }

  const viewJob = (job: any) => {
    jobStore.job = job;
  }

  return {
    refetch,
    deleteJob,
    searchJobs,
    getJobDetail,
    viewJob,
  }
}

export const runJobs = () => {
  const { refetch } = useJobsData();
  const { jobStore } = useJobsListingStore();
  
  useEffect(() => {
    refetch();
  }, []);

  const todayJobs = useMemo(() => {
    return []
  }, [jobStore.jobs?.data])

  const currentWeekJobs = useMemo(() => {
    return []
  }, [jobStore.jobs?.data])

  return {
    todayJobs,
    currentWeekJobs
  }
}