import { useEffect, useMemo } from "react";
import { JobsListingSDK } from "@core-sdk/jobs-listing";
import { useLocalStorageData } from "@core-utils/react-hooks"
import { useJobsListingStore } from "../store";

export const useJobsData = () => {
  const { jobStore, notiStore } = useJobsListingStore();
  const [savedJobs, setSavedJobs] = useLocalStorageData("saved-jobs");

  const refetch = async () => {
    try {
      jobStore.loading = true;
      const response = await JobsListingSDK.getInstance().getJobControl().getMany((jobStore.filterData || {}) as any);
      jobStore.jobs = response;
    } catch (error) { } finally {
      jobStore.loading = false;
    }
  }

  const searchJobs = async (filter = {}) => {
    try {
      jobStore.loading = true;
      const response = await JobsListingSDK.getInstance().getJobControl().getMany({ ...(jobStore.filterData || {}), ...filter } as any);
      jobStore.jobs = response;
    } catch (error) { } finally {
      jobStore.loading = false;
    }
  }

  const getJobDetail = async (id: string | number) => {
    try {
      jobStore.loading = true;
      const response = await JobsListingSDK.getInstance().getJobControl().getOne(id);
      jobStore.job = response.data;
    } catch (error) { } finally {
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

  useEffect(() => {
    jobStore.savedJobs = savedJobs || [];
  }, [savedJobs])

  const viewJob = (job: any) => {
    jobStore.job = job;
  }

  const handleSavedJob = (job: any) => {
    setSavedJobs((prev) => {
      if (prev) {
        const existJob = prev.find(j => j.id === job.id)
        if (existJob) {
          return prev.filter(j => j.id !== job.id);
        } else {
          return [job, ...prev]
        }
      } else {
        return [job]
      }
    })
  }

  return {
    refetch,
    deleteJob,
    searchJobs,
    getJobDetail,
    viewJob,
    handleSavedJob
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