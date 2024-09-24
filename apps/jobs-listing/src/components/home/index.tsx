import { runJobs, useJobsData, useJobsListingStore } from "@core-ui/react-job-listing";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { SearchBar } from "./SearchBar";
import { JobsSlider } from "./JobsSlider";
import { JobsGridView } from "./JobsGridView";

export interface IHomePageContentProps { }

export const HomePageContent = observer(({ }: IHomePageContentProps) => {
  const { jobStore } = useJobsListingStore();

  const { todayJobs = [], currentWeekJobs = [] } = runJobs();
  
  return (
    <Flex fullWidth column>
      <SearchBar />
      <JobsSlider data={todayJobs} />
      <JobsGridView data={currentWeekJobs} title={"Rencent jobs (7 Days)"} />
      <JobsGridView data={jobStore.jobs} paging={jobStore.pagingFilterData} title={"Jobs list"} />
    </Flex>
  )
})