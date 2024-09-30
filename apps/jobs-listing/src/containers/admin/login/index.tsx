import { AdminLoginComponent } from "@/components/admin/login";
import { PageLayout } from "@/components/layout";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

const AdminLoginPage = () => {
  
  return (
    <PageLayout>
      <Flex fullWidth column>
        <AdminLoginComponent />
      </Flex>
    </PageLayout>
  )
}

export default observer(AdminLoginPage)
