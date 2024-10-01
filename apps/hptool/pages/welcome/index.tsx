import AuthenProvider from "src/components/AuthenProvider";
import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import useSelector from "src/hooks/useSelector";

interface WellcomePageProps {}

const WellcomePage = (props: WellcomePageProps) => {
  const authData = useSelector((state) => state.auth);

  return (
    <AuthenProvider roles={[]}>
      <Flex column center width="100vw" height="100vh" bgcolor="pageBg">
        <Text
          color="gray"
          style={{
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Wellcome!
        </Text>
      </Flex>
    </AuthenProvider>
  );
};

export default WellcomePage;
