import { toggleHeader } from "src/actions/layout.actions";
import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback, useEffect } from "react";
import { useGlobalStyle } from "src/styles";
import LoginModel from "../../src/models/model.login";
import useSelector from "src/hooks/useSelector";
import { getAuthData } from "src/actions/auth.actions";
import { useRouter } from "next/router";
import LoadingFallback from "src/components/LoadingFallback";
import { SET_OF_ADMIN } from "src/utils/constants";
import { createStyles, makeStyles } from "@material-ui/styles";

export const useLoginStyles = makeStyles(() => createStyles({}));

interface LoginProps {}

const Login = (props: LoginProps) => {
  const classes = useLoginStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const authState = useSelector((state) => state.auth);
  const { t, i18n } = useLocalize(localizeState.key);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      getAuthData(router);
    }
    toggleHeader(false);
    return () => {
      toggleHeader(true);
    };
  }, []);

  useEffect(() => {
    if (authState.authUser) {
      console.log(
        SET_OF_ADMIN.includes(authState.authUser.roleName?.toLowerCase())
      );
      if (SET_OF_ADMIN.includes(authState.authUser.roleName?.toLowerCase())) {
        router.push("admin/dashboard");
      } else {
        router.push("home");
      }
    }
  }, [authState.authUser]);

  const handleLogin = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center>
      {authState.loading ? (
        <LoadingFallback />
      ) : (
        <Flex className={globalClasses.box} minWidth={400} column>
          <Flex className="box-title">
            <Text className={globalClasses.textTitle}>{t("LOGIN")}</Text>
          </Flex>
          <MuiForm model={LoginModel} onSubmit={handleLogin} />
        </Flex>
      )}
    </Flex>
  );
};

export default Login;
