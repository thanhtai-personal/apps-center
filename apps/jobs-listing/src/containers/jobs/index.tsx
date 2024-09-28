import { PageLayout } from "@/components/layout";
import { JobsPageContent } from "@/components/jobs"
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

const JobsPage = () => {
  
  return (
    <PageLayout>
      <Flex fullWidth column>
        <JobsPageContent />
      </Flex>
    </PageLayout>
  )
}

export default observer(JobsPage)
