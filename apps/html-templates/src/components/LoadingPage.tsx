import { Flex } from "@core-ui/react-mui-core"
import "@core-ui/react-animates/dist/loadingIcon.style.css"

export const LoadingPage = ({ isStrongPlatform }: {
  isStrongPlatform?: boolean;
}) => {
  return <Flex position={"fixed"} zIndex={99999999} width={"100vw"} height={"100vh"} bgcolor={"black"} center>
    <Flex center column fullSize maxWidth={650} bgcolor={"transparent"}>
    </Flex>
  </Flex>
}