import { PageLayout } from "@/components/layout";
import { SavedJobsContent } from "@/components/savedJobs";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

const JobsSavedPage = () => {
  
  return (
    <PageLayout>
      <Flex fullWidth column>
        <SavedJobsContent />
      </Flex>
    </PageLayout>
  )
}

export default observer(JobsSavedPage)
