import { toggleHeader } from "src/actions/layout.actions";
import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback, useEffect } from "react";
import { useGlobalStyle } from "src/styles";
import SignupModel from "src/models/model.signup";
import useSelector from "src/hooks/useSelector";
import { createStyles, makeStyles } from "@material-ui/styles";

export const useSignupStyles = makeStyles(() => createStyles({}));

interface SignupProps {}

const Signup = (props: SignupProps) => {
  const classes = useSignupStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  useEffect(() => {
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
