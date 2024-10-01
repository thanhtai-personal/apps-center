import { ButtonBase } from "@material-ui/core";
import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";

interface NotFoundPageProps {}

const NotFoundPage = (props: NotFoundPageProps) => {
  return (
    <Flex column center width="100vw" height="100vh" bgcolor="pageBg">
      <Text
        color="gray"
        style={{
          fontSize: 40,
          fontWeight: "bold",
        }}
      >
        404
      </Text>
      <ButtonBase onClick={() => {}}>
        <Flex center>
          <Text color="gray" fontSize={16} ml={1}>
            PAGE NOT FOUND
          </Text>
        </Flex>
      </ButtonBase>
    </Flex>
  );
};

export default NotFoundPage;
