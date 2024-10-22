import { PageLayout } from "@/components/layout";
import { PortfolioContent } from "@/components/portfolio"
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

const HomePage = () => {
  
  return (
    <PageLayout>
      <Flex fullWidth column>
        <PortfolioContent />
      </Flex>
    </PageLayout>
  )
}

export default observer(HomePage)
