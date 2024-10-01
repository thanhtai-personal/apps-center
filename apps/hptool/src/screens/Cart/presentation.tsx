import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import LoadingPage from "src/components/LoadingPage";

import styles from "./styles.module.css";
import { useEffect, useMemo, useState } from "react";
import CartCard from "src/components/CartCard";
import Text from "src/components/common/Text";
import { formatMoney } from "src/utils/helpers";

const CartPresentation = (props) => {
  const { t } = useLocalize();
  const [cart, setCart] = useState([]);
  const { authUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.home);

  useEffect(() => {
    onChangeData();
  }, []);

  const onChangeData = () => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  };

  return (
    <>
      {loading ? (
        <Flex className={styles.pageContainer}>
          <LoadingPage />
        </Flex>
      ) : (
        <Flex width={"100%"} className={styles.pageContainer}>
          <Flex width={"100%"} column height={"fit-content"}>
            {cart?.length > 0 ? (
              cart.map((product) => (
                <CartCard
                  product={product}
                  key={product._id}
                  onChangeData={onChangeData}
                />
              ))
            ) : (
              <Flex width={"100%"} center minHeight={250}>
                <Text>{t("Không có sản phẩm trong giỏ hàng")}</Text>
              </Flex>
            )}
            <Flex
              width={"100%"}
              alignItems={"flex-end"}
              justifyContent={"flex-end"}
              p={4}
              mr={8}
              mb={10}
            >
              <Text style={{ fontWeight: "bold" }}>{t("Tổng cộng: ")}</Text>
              <Text
                color={"green"}
                style={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  color: "green",
                }}
              >
                {formatMoney(
                  cart.reduce((prev: number, prd: any) => {
                    return prev + (prd.price || 0) * (prd.amount || 1);
                  }, 0)
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default CartPresentation;
