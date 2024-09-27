import { PageLayout } from "@/components/layout";
import { HomePageContent } from "@/components/home"
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

const HomePage = () => {
  
  return (
    <PageLayout>
      <Flex fullWidth column>
        <HomePageContent />
      </Flex>
    </PageLayout>
  )
}

export default observer(HomePage)
