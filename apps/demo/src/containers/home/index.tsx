import { LoginComponent } from "@/components/login";
import { PageLayout } from "@/components/layout";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

const HomePage = () => {
  
  return (
    <PageLayout>
      <Flex fullWidth column>
        <LoginComponent />
      </Flex>
    </PageLayout>
  )
}

export default observer(HomePage)
