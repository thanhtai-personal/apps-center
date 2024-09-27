import { runJobs, useJobsData, useJobsListingStore } from "@core-ui/react-job-listing";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { SearchBar } from "./SearchBar";
import { JobsSlider } from "./JobsSlider";
import { JobsGridView } from "./JobsGridView";
import ZaloChat from "../ZaloChat";
import FacebookChat from "../FacebookChat";
import TelegramChat from "../TelegramChat";

export interface IHomePageContentProps { }

export const HomePageContent = observer(({ }: IHomePageContentProps) => {
  const { jobStore } = useJobsListingStore();

  const { todayJobs = [], currentWeekJobs = [] } = runJobs();

  return (
    <Flex fullWidth column position={"relative"}>
      <SearchBar />
      <JobsSlider data={todayJobs} />
      <JobsGridView data={jobStore.jobs?.data} paging={jobStore.pagingFilterData} title={"Việc mới đăng"} />
      <Flex position={"absolute"} bottom={0} right={0} p={2} column>
        <FacebookChat />
        <Flex my={1}></Flex>
        <ZaloChat />
        <Flex my={1}></Flex>
        <TelegramChat />
      </Flex>
      
    </Flex>
  )
})