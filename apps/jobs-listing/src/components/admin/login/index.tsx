import { PAGE_MAX_WIDTH } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { LoginForm } from "../../login/LoginForm";
import recruiterBg from "@/assets/images/bg/recruiter_bg.png"

export const AdminLoginComponent = observer(() => {

  return (
    <Flex fullWidth center className="login_page">
      <Flex bgcolor={"red"}
        width={"100vw"}
        height={"100vh"}
        style={{
          backgroundImage: `url(${recruiterBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} column>
        </Flex>
      </Flex>
      <LoginForm isAdmin />
    </Flex>
  )
})