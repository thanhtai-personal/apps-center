import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { formatMoney, addToCart, removeFromCart } from "src/utils/helpers";
import { useCartCardStyles } from "./styles";
import StarIcon from "@material-ui/icons/Star";
import { useMemo } from "react";
import { useGlobalStyle } from "src/styles";
import { useRouter } from "next/router";
import LazyLoadImage from "../common/LazyImage";
import { Button } from "@material-ui/core";

const CartCard = (props) => {
  const classes = useCartCardStyles(props);
  const localizeState = useSelector((state) => state.localize);
  const globalClasses = useGlobalStyle(props);
  const { t } = useLocalize(localizeState.key);
  const { product, onChangeData } = props;
  const router = useRouter();

  const ratingElement = useMemo(() => {
    const element = [];
    for (let idx = 1; idx <= 5; idx++) {
      element.push(
        <Flex mr={1}>
          <StarIcon
            style={{
              width: 18,
              height: 18,
              color: idx <= product.rating ? "rgb(255, 190, 0)" : "lightgray",
            }}
          />
        </Flex>
      );
    }
    return element;
  }, [product.rating]);

  return (
    <Flex
      className={classes.root}
      my={10}
      position={"relative"}
      m={2}
      py={8}
      px={4}
      cursor={"pointer"}
      style={{
        borderTop: "solid 1px rgba(0,0,0, 0.75)",
      }}
    >
      <Flex>
        <Flex
          width={"auto"}
          position={"relative"}
          className={"hover-container"}
        >
          <LazyLoadImage
            src={product.thumbObj?.url}
            style={{
              width: 270,
              height: 195,
            }}
          />
          <Flex
            className={"hover-content"}
            position={"absolute"}
            width={"100%"}
            height={"100%"}
            center
            column
            bgcolor={"rgba(0,0,0, 0.7)"}
          >
            <Text className={globalClasses.text} color={"#fff"}>
              {`Mã sản phẩm: ${product.code}`}
            </Text>
            <Text
              textAlign={"center"}
              className={globalClasses.textLinkHover}
              color={"#fff"}
              mt={2}
              fontSize={14}
            >
              {product.name}
            </Text>
            <Flex>
              <Flex
                className={globalClasses.button}
                onClick={() =>
                  router.push(`/products/detail?id=${product._id}`)
                }
              >
                {t(`Chi tiết`)}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex width={"auto"} px={8} column>
          <Flex width={"100%"} className={globalClasses.textLinkHover}>
            <Text>{product.name}</Text>
          </Flex>
          <Flex width={"100%"} mt={4}>
            <Text>{formatMoney(product.price)}</Text>
          </Flex>
          {product.rating && (
            <Flex width={"100%"} mt={4}>
              {ratingElement}
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex width={"auto"} px={8} column>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          border={"solid 1px black"}
        >
          <Button
            onClick={() => {
              removeFromCart(product);
              onChangeData && onChangeData();
            }}
          >
            <Text>{t("-")}</Text>
          </Button>
          <Text color={"green"}>{product.amount || 1}</Text>
          <Button
            onClick={() => {
              addToCart(product);
              onChangeData && onChangeData();
            }}
          >
            <Text>{t("+")}</Text>
          </Button>
        </Flex>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          border={"solid 1px black"}
          borderTop={"unset"}
          py={2}
        >
          <Text color={"green"} style={{ fontWeight: "bold" }}>
            {formatMoney((product.amount || 1) * (product.price || 0))}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartCard;
