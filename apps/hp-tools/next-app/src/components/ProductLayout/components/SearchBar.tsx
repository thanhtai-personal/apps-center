import {
  Button,
  ButtonGroup,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { useSearchbarStyle } from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import Text from "src/components/common/Text";
import MenuIcon from "@material-ui/icons/Menu";
import { toggleCategoryMobileMenu } from "src/actions/layout.actions";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useSearchParams from "src/hooks/useSearchParams";
import { searchProducts } from "src/actions/product.actions";
import LazyLoadImage from "src/components/common/LazyImage";

const SearchBar = (props) => {
  const classes = useSearchbarStyle(props);
  const { appLogoObj, hot_line } = useSelector((state) => state.home);
  const localizeState = useSelector((state) => state.localize);
  const { t } = useLocalize(localizeState.key);
  const inputRef: any = useRef();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = params.get("name") || "";
    }
  }, [params]);

  return (
    <Flex width={"100%"} className={classes.root} center py={2} column>
      <Flex className="content" width={"100%"} centerY px={4}>
        <Flex
          className="menu_mobile"
          center
          cursor={"pointer"}
          onClick={() => {
            toggleCategoryMobileMenu();
          }}
        >
          <MenuIcon
            style={{
              width: 28,
              height: 28,
              color: "rgb(246, 45, 62)",
            }}
          />
        </Flex>
        <Flex
          className="logo"
          onClick={() => router.push("/home")}
          cursor="pointer"
        >
          <LazyLoadImage
            src={appLogoObj?.url}
            style={{
              width: 180,
              height: "auto",
            }}
          />
        </Flex>

        <Flex
          className="searchbox"
          centerY
          borderRadius={".5rem"}
          border={"solid 1px rgba(0,0,0, 0.2)"}
        >
          <Flex style={{ borderRight: "solid 1px rgba(0,0,0, 0.2)" }} p={2}>
            <Select defaultValue={"all"} variant={"standard"} disableUnderline>
              <MenuItem value={"all"}>{t(`Tất cả`)}</MenuItem>
            </Select>
          </Flex>
          <Flex ml={2} p={2}>
            <TextField
              variant="standard"
              fullWidth
              inputRef={inputRef}
              InputProps={{
                disableUnderline: true,
                style: {
                  minWidth: 350,
                },
              }}
            />
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => {
              router.push(`/products?name=${inputRef.current.value || ""}`);
              if (inputRef.current.value) {
                searchProducts({
                  name: {
                    regex: inputRef.current.value,
                  },
                });
              } else {
                searchProducts({});
              }
            }}
            px={6}
            height={48}
            center
            bgcolor={"#f62d3e"}
          >
            <SearchIcon style={{ color: "#fff" }} />
          </Flex>
        </Flex>

        <Flex centerY>
          <Flex className="hot_line" centerY>
            <img
              src={"/images/icon_phone.png"}
              style={{
                width: 32,
                height: 24,
              }}
            />
            <Flex column ml={4}>
              <Text className="text_hotline">{t(`Hot line:`)}</Text>
              <Text className="number_hotline">{hot_line}</Text>
            </Flex>
          </Flex>
          <Flex ml={8} center>
            <Flex
              cursor={"pointer"}
              className="cart_mobile"
              onClick={() => {
                router.push(`/cart`);
              }}
            >
              <LazyLoadImage
                src={"/images/icon_cart_mobi.png"}
                style={{
                  width: 28,
                  height: 28,
                }}
              />
            </Flex>
            <Button
              className="cart"
              onClick={() => {
                router.push(`/cart`);
              }}
              style={{
                background: "#f62d3e",
                color: "#fff",
                borderRadius: "3px",
                width: "130px",
                height: "40px",
                lineHeight: "40px",
                textTransform: "none",
              }}
            >
              <Text>
                {t(
                  `Giỏ hàng: (${JSON.parse(
                    window.localStorage.getItem("cart") || "[]"
                  ).reduce((prev, item) => {
                    return prev + (item.amount || 1);
                  }, 0)})`
                )}
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex width={"100%"} mt={4} center className="searchbox_mobile">
        <Flex
          centerY
          borderRadius={".5rem"}
          border={"solid 1px rgba(0,0,0, 0.2)"}
        >
          <Flex style={{ borderRight: "solid 1px rgba(0,0,0, 0.2)" }} p={2}>
            <Select defaultValue={"all"} variant={"standard"} disableUnderline>
              <MenuItem value={"all"}>{t(`Tất cả`)}</MenuItem>
            </Select>
          </Flex>
          <Flex ml={2} p={2}>
            <TextField
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                style: {
                  minWidth: 350,
                },
              }}
            />
          </Flex>
          <Flex px={6} height={48} center bgcolor={"#f62d3e"}>
            <SearchIcon style={{ color: "#fff" }} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SearchBar;
