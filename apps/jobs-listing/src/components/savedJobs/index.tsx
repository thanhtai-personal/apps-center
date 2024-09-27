import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import ZaloChat from "../ZaloChat";
import FacebookChat from "../FacebookChat";
import TelegramChat from "../TelegramChat";
import { useJobsListingStore } from "@core-ui/react-job-listing";
import { JobsGridView } from "../home/JobsGridView";

export interface ISavedJobsContentProps { }

export const SavedJobsContent = observer(({ }: ISavedJobsContentProps) => {
  const { jobStore } = useJobsListingStore();

  return (
    <Flex fullWidth column position={"relative"} minHeight={"100vh"}>
      <JobsGridView data={jobStore.savedJobs} title={"Kho dự trữ của bạn"} />
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