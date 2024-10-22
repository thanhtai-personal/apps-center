import { runJobs, useRecruiterStore } from "@core-logic-hooks/react-recruiter";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import { SearchBar } from "./SearchBar";
import { JobsSlider } from "./JobsSlider";
import { JobsGridView } from "./JobsGridView";
import ZaloChat from "../ZaloChat";
import FacebookChat from "../FacebookChat";
import TelegramChat from "../TelegramChat";
import { Link } from "@core-ui/react-core";
import { VolunteerActivism as VolunteerActivismIcon } from "@core-ui/react-mui-core/icons"
import { useGlobalStyles } from "@/styles/globalStyle";
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { TopBar } from "./TopBar";

export interface IJobsPageContentProps { }

export const JobsPageContent = observer(({ }: IJobsPageContentProps) => {
  const { jobStore } = useRecruiterStore();
  const globalStyles = useGlobalStyles();
  const { todayJobs = [], currentWeekJobs = [] } = runJobs();

  return (
    <Flex fullWidth column position={"relative"}>
      <TopBar />
      <Flex my={2}></Flex>
      <SearchBar />
      <JobsSlider data={todayJobs} />
      <Flex fullWidth center>
        <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} px={2} justifyContent={"flex-end"}>
          <Link target="_saved_job" to="/jobs/saved" title="Việc đã lưu">
            <Flex centerY>
              <VolunteerActivismIcon style={{ color: "rgb(255, 255, 255)" }} />
              <Flex mx={0.5}></Flex>
              <Text className={globalStyles.textKanitBold18}>
                Việc đã lưu
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Flex>
      <JobsGridView data={jobStore.jobs?.data || []} paging={jobStore.pagingFilterData} title={"Việc mới đăng"} />
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