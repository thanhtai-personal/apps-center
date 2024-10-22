import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { LoginForm } from "@/components/login/LoginForm";
import { PortfolioContent } from "@/components/portfolio";

const HomePage = observer(() => {

  return (
    <Flex fullWidth column className="login_page">
      <Flex fullWidth column>
        <PortfolioContent />
      </Flex>
      <LoginForm />
    </Flex>
  )
})

export default HomePage;