import { Button, ButtonGroup } from "@material-ui/core";
import { useRouter } from "next/router";
import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { useAppMenuStyle } from "./styles";

const AppMenu = (props) => {
  const classes = useAppMenuStyle(props);
  const localizeState = useSelector((state) => state.localize);
  const { t } = useLocalize(localizeState.key);
  const router = useRouter();

  return (
    <Flex
      height={"100%"}
      cursor={"pointer"}
      p={2}
      width={"100%"}
      className={classes.root}
      center
      minHeight={40}
      bgcolor={"#2e3553"}
    >
      <Flex className="content" width={1250}>
        <Flex
          height={"100%"}
          cursor={"pointer"}
          p={2}
          className={classes.menuButton}
          onClick={() => router.push(`/home`)}
        >
          {t(`Trang chủ`)}
        </Flex>
        <Flex
          height={"100%"}
          cursor={"pointer"}
          p={2}
          className={classes.menuButton}
          onClick={() => router.push(`/home`)}
        >
          {t(`Giới thiệu`)}
        </Flex>
        <Flex
          height={"100%"}
          cursor={"pointer"}
          p={2}
          className={classes.menuButton}
          onClick={() => router.push(`/products`)}
        >
          {t(`Sản phẩm`)}
        </Flex>
        <Flex
          height={"100%"}
          cursor={"pointer"}
          p={2}
          className={classes.menuButton}
          onClick={() => router.push(`/products`)}
        >
          {t(`Khuyến mãi`)}
        </Flex>
        <Flex
          height={"100%"}
          cursor={"pointer"}
          p={2}
          className={classes.menuButton}
          onClick={() => router.push(`/home`)}
        >
          {t(`Tin tức`)}
        </Flex>
        <Flex
          height={"100%"}
          cursor={"pointer"}
          p={2}
          className={classes.menuButton}
        >
          {t(`Báo giá nhanh`)}
        </Flex>
        <Flex
          height={"100%"}
          cursor={"pointer"}
          p={2}
          className={classes.menuButton}
          onClick={() => router.push(`/products`)}
        >
          {t(`Review sản phẩm`)}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppMenu;
