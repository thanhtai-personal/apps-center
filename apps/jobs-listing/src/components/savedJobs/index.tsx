import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import ZaloChat from "../ZaloChat";
import FacebookChat from "../FacebookChat";
import TelegramChat from "../TelegramChat";
import { useJobsListingStore } from "@core-ui/react-job-listing";
import { JobsGridView } from "../home/JobsGridView";
import { Link } from "@core-ui/react-core";
import { ArrowBack as ArrowBackIcon } from "@core-ui/react-mui-core/icons";
import { PAGE_MAX_WIDTH } from "@/utils/constants";

export interface ISavedJobsContentProps { }

export const SavedJobsContent = observer(({ }: ISavedJobsContentProps) => {
  const { jobStore } = useJobsListingStore();

  return (
    <Flex fullWidth center>
      <Flex maxWidth={PAGE_MAX_WIDTH} fullWidth column position={"relative"} minHeight={"100vh"}>
        <Flex fullWidth my={2} px={1}>
          <Link target="_new_jobs" to="/" title="Việc mới">
            <ArrowBackIcon style={{ color: "rgb(255, 255, 255)" }}  />
          </Link>
        </Flex>
        <JobsGridView data={jobStore.savedJobs} title={"Kho dự trữ của bạn"} />
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