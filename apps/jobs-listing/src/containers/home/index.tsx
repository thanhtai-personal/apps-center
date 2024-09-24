import { PageLayout } from "@/components/layout";
import { HomePageContent } from "@/components/home"
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

const CrawlerPage = () => {
  
  return (
    <PageLayout>
      <Flex fullWidth column>
        <HomePageContent />
      </Flex>
    </PageLayout>
  )
}

export default observer(CrawlerPage)
