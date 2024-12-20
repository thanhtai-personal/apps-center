import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import ZaloChat from "../ZaloChat";
import FacebookChat from "../FacebookChat";
import TelegramChat from "../TelegramChat";
import { useRecruiterStore } from "@core-logic-hooks/react-recruiter";
import { JobsGridView } from "../jobs/JobsGridView";
import { Link } from "@core-ui/react-core";
import { ArrowBack as ArrowBackIcon } from "@core-ui/react-mui-core/dist/base/icons";
import { PAGE_MAX_WIDTH } from "@/utils/constants";

export interface ISavedJobsContentProps { }

export const SavedJobsContent = observer(({ }: ISavedJobsContentProps) => {
  const { jobStore } = useRecruiterStore();

  return (
    <Flex fullWidth center>
      <Flex maxWidth={PAGE_MAX_WIDTH} fullWidth column position={"relative"} minHeight={"100vh"}>
        <Flex fullWidth my={2} px={1}>
          <Link target="_new_jobs" to="/jobs" title="Việc mới">
            <ArrowBackIcon style={{ color: "rgb(255, 255, 255)" }}  />
          </Link>
        </Flex>
        <JobsGridView data={jobStore.savedJobs || []} title={"Kho dự trữ của bạn"} />
        <Flex position={"absolute"} bottom={0} right={0} p={2} column>
          <FacebookChat />
          <Flex my={1}></Flex>
          <ZaloChat />
          <Flex my={1}></Flex>
          <TelegramChat />
        </Flex>
      </Flex>
    </Flex>
  )
})