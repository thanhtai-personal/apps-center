import { runJobs, useJobsData, useJobsListingStore } from "@core-ui/react-job-listing";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { SearchBar } from "./SearchBar";
import { JobsSlider } from "./JobsSlider";
import { JobsGridView } from "./JobsGridView";
import ZaloChat from "../ZaloChat";
import FacebookChat from "../FacebookChat";
import TelegramChat from "../TelegramChat";
import { Link } from "@core-ui/react-core";
import { VolunteerActivism as VolunteerActivismIcon } from "@core-ui/react-mui-core/icons"

export interface IJobsPageContentProps { }

export const JobsPageContent = observer(({ }: IJobsPageContentProps) => {
  const { jobStore } = useJobsListingStore();

  const { todayJobs = [], currentWeekJobs = [] } = runJobs();

  return (
    <Flex fullWidth column position={"relative"}>
      <SearchBar />
      <JobsSlider data={todayJobs} />
      <Flex fullWidth px={2} justifyContent={"flex-end"}>
        <Link target="_saved_job" to="/saved" title="Việc đã lưu">
          <VolunteerActivismIcon  style={{ color: "rgb(255, 255, 255)" }} />
        </Link>
      </Flex>
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