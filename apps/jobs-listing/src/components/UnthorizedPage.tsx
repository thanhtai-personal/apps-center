import { Flex, LazyImage, Text } from "@core-ui/react-mui-core"
import { PAGE_MAX_WIDTH } from "../utils"
import unauthorizeSvg from "@/assets/images/unauthorize.svg"
import { useGlobalStyles } from "@/styles/globalStyle"
import { Link } from "@core-ui/react-core"
import { useLanguage } from "@/hooks/useLanguage"
import { useState } from "react"
import { useInterval } from "@core-utils/utils-helpers"

const unauthorizedTextsObj = {
  "VI": {
    "You are not authorized": "Bạn không có quyền truy cập trang này",
    "You tried to access a page you did not have prior authorization for."
      : "Bạn đã cố truy cập vào một trang mà bạn không được phép trước.",
    "Click to go to login page": "Click vào đây để truy cập trang đăng nhập",
    "Redirect to login page in ": "Chuyển hướng đến trang đăng nhập trong ",
    " seconds": " giây"
  }
}

export const UnthorizedPage = ({ }: any) => {
  const globalStyles = useGlobalStyles();
  const [countDown, setCountDown] = useState(3);

  const { getText } = useLanguage(unauthorizedTextsObj)

  useInterval(() => {
    setCountDown(prev => prev - 1)
  }, 1000);

  return <Flex fullWidth center bgcolor={"#000"}>
    <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} px={2}>
      <Flex fullWidth column center>
        <Flex fullWidth center mt={4} column>
          <Text className={globalStyles.textOrbiBold24} fontWeight={600} fontSize={24}>
            {getText("You are not authorized")}
          </Text>
          <Flex my={1}></Flex>
          <Text fontSize={18} color={"#AAAAAA"}>
            {getText("You tried to access a page you did not have prior authorization for.")}
          </Text>
          <Flex my={1}></Flex>
          <Text fontSize={18} color={"#AAAAAA"}>
            {getText("Redirect to login page in ")}
            {countDown}
            {getText(" seconds")}
          </Text>
          <Flex my={2}></Flex>
          <Link to="/login">
            <Text className={globalStyles.textOrbiBold20}>{getText("Click to go to login page")}</Text>
          </Link>
        </Flex>
        <LazyImage src={unauthorizeSvg} alt="unauthorize"
          style={{ width: "90%" }}
          imgStyle={{ width: "90%" }}
        />
      </Flex>
    </Flex>
  </Flex>
}