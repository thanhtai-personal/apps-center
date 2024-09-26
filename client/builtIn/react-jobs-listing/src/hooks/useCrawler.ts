import { useEffect } from "react";
import { useJobsListingStore } from "../store"
import { JobsListingSDK } from "@core-sdk/jobs-listing";


export const useCrawler = () => {
  const { jobStore } = useJobsListingStore();

  const exportAnydayJob = async (jobId: string, categoryId: number, htmlString: string) => {
    try {
      const jobs: any = await JobsListingSDK.getInstance().exportAnydayJob(jobId, categoryId, htmlString);
      jobStore.jobs = jobs; 
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