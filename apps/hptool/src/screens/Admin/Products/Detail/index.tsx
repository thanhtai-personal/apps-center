import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback, useEffect, useRef } from "react";
import { useGlobalStyle } from "src/styles";
import { useDetailProductStyles } from "./styles";
import ProductModel from "../model.product";
import useSelector from "src/hooks/useSelector";
import InputField from "src/components/common/InputField";
import { Button, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import useSearchParams from "src/hooks/useSearchParams";
import { getDetailProduct } from "src/actions/product.actions";

interface DetailProductProps {}

const DetailProduct = (props: DetailProductProps) => {
  const classes = useDetailProductStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);
  const router = useRouter();
  const inputRef: any = useRef();
  const params = useSearchParams();
  const id = params.get("id");

  const handleGoToDetailProduct = useCallback(() => {
    window.location.replace(
      `${window.location.origin}/admin/products?sMenu=detail-product&id=${inputRef.current?.value}`
    );
  }, []);

  useEffect(() => {
    getDetailProduct(id);
  }, [id]);

  return (
    <Flex width={"100%"} height={"100%"} center px={2}>
      <Flex className={globalClasses.box} width={"100%"} column>
        <Flex className="box-title" my={4}>
          <Text className={globalClasses.textTitle}>{t("UPDATE PRODUCT")}</Text>
        </Flex>
        <Flex width={"100%"} center>
          <Flex column>
            <Text className={globalClasses.labelText}>PRODUCT ID:</Text>
            <Flex>
              <Flex
                width={250}
                border={"solid 1px rgba(0,0,0, 0.25)"}
                borderRadius={".5rem"}
                px={1}
              >
                <TextField
                  variant="standard"
                  fullWidth
                  value={id}
                  inputRef={inputRef}
                  InputProps={{
                    disableUnderline: true,
                    disabled: true,
                  }}
                />
              </Flex>
              <Button onClick={handleGoToDetailProduct}>{t(`Go`)}</Button>
            </Flex>
          </Flex>
        </Flex>
        <MuiForm model={ProductModel} />
      </Flex>
    </Flex>
  );
};

export default DetailProduct;
