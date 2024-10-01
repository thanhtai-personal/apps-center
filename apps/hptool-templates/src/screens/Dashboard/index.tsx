import Flex from "components/common/Flex";
import Text from "components/common/Text";
import useAdminLayout from "hooks/useAdminLayout";

const DashboardPage = () => {
  useAdminLayout();

  return (
    <Flex center width={"100vw"} height={"100vh"}>
      <Text className="text">dash board page</Text>
    </Flex>
  );
};

export default DashboardPage;
