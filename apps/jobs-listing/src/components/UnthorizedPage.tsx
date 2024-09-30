import { Flex, LazyImage, Text } from "@core-ui/react-mui-core"
import { PAGE_MAX_WIDTH } from "../utils"
import unauthorizeSvg from "@/assets/images/unauthorize.svg"
import { Animates } from "@core-ui/react-animates"
import { useGlobalStyles } from "@/styles/globalStyle"
import { Link } from "@core-ui/react-core"

export const UnthorizedPage = ({ }: any) => {
  const globalStyles = useGlobalStyles()

  return <Flex fullWidth center bgcolor={"#000"}>
    <Flex fullWidth maxWidth={PAGE_MAX_WIDTH} px={2}>
      <Flex fullWidth column center>
        <Flex fullWidth center mt={4} column>
          <Text className={globalStyles.textOrbiBold24} fontWeight={600} fontSize={24}>
            You are not authorized
          </Text>
          <Flex my={1}></Flex>
          <Text fontSize={18} color={"#AAAAAA"}>
            You tried to access a page you did not have prior
            authorization for.
          </Text>
          <Flex my={2}></Flex>
          <Link to="/login">
            <Text className={globalStyles.textOrbiBold20}>{"Click to go to login page"}</Text>
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