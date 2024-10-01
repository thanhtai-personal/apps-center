import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { formatMoney, addToCart } from "src/utils/helpers";
import { useProductCardStyles } from "./styles";
import StarIcon from "@material-ui/icons/Star";
import { useMemo } from "react";
import { useGlobalStyle } from "src/styles";
import { useRouter } from "next/router";
import LazyLoadImage from "../common/LazyImage";

const ProductCard = (props) => {
  const classes = useProductCardStyles(props);
  const localizeState = useSelector((state) => state.localize);
  const globalClasses = useGlobalStyle(props);
  const { t } = useLocalize(localizeState.key);
  const { product } = props;
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
      column
      width={270}
      height={300}
      m={2}
      cursor={"pointer"}
    >
      <Flex width={"100%"} position={"relative"} className={"hover-container"}>
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
              onClick={() => router.push(`/products/detail?id=${product._id}`)}
            >
              {t(`Chi tiết`)}
            </Flex>
            <Flex
              className={globalClasses.button}
              onClick={() => addToCart(product)}
            >
              {t(`Thêm vào giỏ hàng`)}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex width={"100%"} column>
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
  );
};

export default ProductCard;
