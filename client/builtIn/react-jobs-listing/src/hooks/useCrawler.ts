import { useEffect } from "react";
import { useJobsListingStore } from "../store"
import { JobsListingSDK } from "@core-sdk/jobs-listing";


export const useCrawler = () => {
  const { jobStore } = useJobsListingStore();

  const exportAnydayJob = async (jobId: string, htmlString: string) => {
    try {
      const jobs: any = await JobsListingSDK.getInstance().exportAnydayJob(jobId, htmlString);
      jobStore.jobs = jobs.data; 
    } catch (error) { }
  }

  return {
    exportAnydayJob,
  }
}

export const runCrawler = () => {

  useEffect(() => {
  }, [])
}