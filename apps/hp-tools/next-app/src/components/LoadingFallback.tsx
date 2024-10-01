import { CircularProgress } from "@material-ui/core";
import Flex from "src/components/common/Flex";

interface LoadingFallbackProps {}

const LoadingFallback = (props: LoadingFallbackProps) => {
  return (
    <Flex column center width="100%" height="100vh">
      <CircularProgress color="primary" />
    </Flex>
  );
};

export default LoadingFallback;
