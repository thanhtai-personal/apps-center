import { Button, ButtonGroup } from "@material-ui/core";
import { useRouter } from "next/router";
import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { useTopbarStyle } from "./styles";

const TopBar = (props) => {
  const classes = useTopbarStyle(props);
  const localizeState = useSelector((state) => state.localize);
  const authState = useSelector((state) => state.auth);
  const home = useSelector((state) => state.home);
  const { t } = useLocalize(localizeState.key);
  const router = useRouter();

  return (
    <Flex width={"100%"} className={classes.root} center py={2} centerY>
      <Flex className="content" width={"100%"} centerY>
        <Text className="welcome_text" color={"#f62d3e"}>
          {home.welcome_text}
        </Text>
        <Flex justifyContent={"flex-end"} centerY>
          <Button
            onClick={() => router.push("/products")}
            className="topbar_button"
          >
            {t(`Sản phẩm`)}
          </Button>
          <Button
            onClick={() => router.push("/products")}
            className="topbar_button"
          >
            {t(`Tin tức`)}
          </Button>
          <Button
            onClick={() => router.push("/home")}
            className="topbar_button"
          >
            {t(`Liên hệ`)}
          </Button>
          <Flex ml={4} pl={4} borderLeft={"solid 1px rgba(0,0,0, 0.25)"}>
            {!authState.authUser && (
              <Button
                onClick={() => router.push("/signup")}
                className="topbar_button"
              >
                {t(`Đăng ký`)}
              </Button>
            )}
            {!authState.authUser && (
              <Button
                onClick={() => router.push("/login")}
                className="topbar_button"
              >
                {t(`Đăng nhập`)}
              </Button>
            )}
            {authState.authUser && (
              <Button
                onClick={() => {
                  window.localStorage.clear();
                  window.location.reload();
                }}
                className="topbar_button"
              >
                {t(`Đăng xuất`)}
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TopBar;
