import { JobsCrawlerPageContent } from "@/components/admin/jobs";
import { PageLayout } from "@/components/layout";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

const CrawlerPage = () => {
  
  return (
    <PageLayout>
      <Flex fullWidth column>
        <JobsCrawlerPageContent />
      </Flex>
    </PageLayout>
  )
}

export default observer(CrawlerPage)
