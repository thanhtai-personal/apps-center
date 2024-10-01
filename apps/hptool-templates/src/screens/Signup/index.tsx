import { toggleHeader } from "actions/layout.actions";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import MuiForm from "components/common/Form";
import useLocalize from "hooks/useLocalize";
import { useCallback, useLayoutEffect } from "react";
import { useGlobalStyle } from "styles";
import { useSignupStyles } from "./styles";
import SignupModel from "./model.signup";
import useSelector from "hooks/useSelector";

interface SignupProps {}

const Signup = (props: SignupProps) => {
  const classes = useSignupStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  useLayoutEffect(() => {
    toggleHeader(false);
    return () => {
      toggleHeader(true);
    };
  }, []);

  const handleSignup = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>{t("SIGNUP")}</Text>
        </Flex>
        <MuiForm model={SignupModel} onSubmit={handleSignup} />
      </Flex>
    </Flex>
  );
};

export default Signup;
