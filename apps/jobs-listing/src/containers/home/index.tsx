import { CrawlerPageContent } from "@/components/home";
import { PageLayout } from "@/components/layout";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

const CrawlerPage = () => {
  
  return (
    <PageLayout>
      <Flex fullWidth column>
        <CrawlerPageContent />
      </Flex>
    </PageLayout>
  )
}

export default observer(CrawlerPage)
