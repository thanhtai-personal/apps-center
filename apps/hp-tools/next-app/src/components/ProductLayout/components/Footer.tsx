import { useMediaQuery, useTheme } from "@material-ui/core";
import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { useGlobalStyle } from "src/styles";
import { useFooterStyle } from "./styles";
import CallIcon from "@material-ui/icons/Call";
import { useDesktopFirstDesign } from "src/hooks/useMobileSize";

const Footer = (props) => {
  const classes = useFooterStyle(props);
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t } = useLocalize(localizeState.key);
  const homeData = useSelector((state) => state.home);
  const { downSM } = useDesktopFirstDesign();

  return (
    <Flex
      width={"100%"}
      className={classes.root}
      center
      position={"relative"}
      mt={10}
      column
    >
      <Flex
        className="content-wrap"
        width={"100%"}
        height={"100%"}
        p={4}
        center
        column
      >
        <Flex className="content" column={!!downSM} centerX py={6}>
          <Flex column width={"100%"} centerY={!!downSM}>
            <Text className={globalClasses.textTitle} color={"#fff"}>
              {t(`Địa chỉ`)}
            </Text>
            <Flex column mt={4} width={"100%"} centerY={!!downSM}>
              <Text color={"#acacac"} fontSize={13} mt={2}>{`Địa chỉ: ${
                homeData.address || ""
              }`}</Text>
              <Text color={"#acacac"} fontSize={13} mt={2}>{`Hotline: ${
                homeData.hot_line || ""
              }`}</Text>
            </Flex>
          </Flex>
          <Flex
            column
            mx={8}
            mt={downSM ? 4 : 0}
            centerY={!!downSM}
            width={"100%"}
          >
            <Text className={globalClasses.textTitle} color={"#fff"}>
              {t(`Chính sách`)}
            </Text>
            <Flex column width={"100%"} centerY={!!downSM}>
              <Text
                className={globalClasses.textLinkHover}
                color={"#acacac"}
                fontSize={13}
                mt={2}
              >
                {t(`Bảo hành sản phẩm`)}
              </Text>
              <Text
                className={globalClasses.textLinkHover}
                color={"#acacac"}
                fontSize={13}
                mt={2}
              >
                {t(`Hướng dẩn thanh toán`)}
              </Text>
              <Text
                className={globalClasses.textLinkHover}
                color={"#acacac"}
                fontSize={13}
                mt={2}
              >
                {t(`Chính sách và quy định chung`)}
              </Text>
              <Text
                className={globalClasses.textLinkHover}
                color={"#acacac"}
                fontSize={13}
                mt={2}
              >
                {t(`Tư vấn vận chuyển`)}
              </Text>
              <Text
                className={globalClasses.textLinkHover}
                color={"#acacac"}
                fontSize={13}
                mt={2}
              >
                {t(`Chính sách đổi - trả hàng`)}
              </Text>
              <Text
                className={globalClasses.textLinkHover}
                color={"#acacac"}
                fontSize={13}
                mt={2}
              >
                {t(`Chính sách bảo mật thông tin`)}
              </Text>
            </Flex>
          </Flex>
          <Flex column mx={8} mt={downSM ? 4 : 0}>
            <Flex column width={"100%"} centerY={!!downSM}>
              <Text className={globalClasses.textTitle} color={"#fff"}>
                {t(`Chấp nhận thanh toán`)}
              </Text>
              <Flex cursor={"pointer"} mt={2}>
                <img src={"/images/payment.png"} />
              </Flex>
            </Flex>
            <Flex column mt={8} width={"100%"} centerY pt={2}>
              <Text className={globalClasses.textTitle} color={"#fff"}>
                {t(`Hotline tư vấn trực tiếp`)}
              </Text>
              <Flex center mt={4}>
                <Flex
                  p={1}
                  width={55}
                  height={55}
                  mr={2}
                  borderRadius={"50%"}
                  center
                  bgcolor={"#fff"}
                >
                  <CallIcon
                    style={{
                      width: 36,
                      height: 36,
                      color: "#f62d3e",
                    }}
                  />
                </Flex>
                <Flex column>
                  <Text
                    fontStyle={36}
                    fontWeight={700}
                    color={"#f62d3e"}
                    mt={2}
                  >
                    {homeData.hot_line}
                  </Text>
                  <Text color={"#acacac"} fontSize={13} mt={2}>
                    {t(`(Phục vụ 24/24, cả thứ 7 & CN)`)}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex column width={"100%"} centerY={!!downSM} mt={downSM ? 4 : 0}>
            <Text className={globalClasses.textTitle} color={"#fff"}>
              {t(`Facebook fanpage`)}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex width={"100%"} bgcolor={"#0a0b12"} center py={1}>
        <Text fontSize={10} color={"#fff"}>
          Source code by TTT
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
