import Flex from "components/common/Flex";
import Text from "components/common/Text";
import { useGlobalStyle } from "styles";

interface ErrorProps {
  message: string;
}

const ErrorComponent = (props: ErrorProps) => {
  const { message } = props;
  const globalClasses = useGlobalStyle(props);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box}>
        <Text className="text">{message}</Text>
      </Flex>
    </Flex>
  );
};

export default ErrorComponent;
