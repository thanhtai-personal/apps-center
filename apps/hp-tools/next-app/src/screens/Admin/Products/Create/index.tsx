import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback } from "react";
import { useGlobalStyle } from "src/styles";
import { useCreateProductStyles } from "./styles";
import CreateProductModel from "../model.product";
import useSelector from "src/hooks/useSelector";

interface CreateProductProps {}

const CreateProduct = (props: CreateProductProps) => {
  const classes = useCreateProductStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleCreateProduct = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center px={2}>
      <Flex className={globalClasses.box} width={"100%"} column>
        <Flex className="box-title" my={4}>
          <Text className={globalClasses.textTitle}>{t("CREATE PRODUCT")}</Text>
        </Flex>
        <MuiForm model={CreateProductModel} onSubmit={handleCreateProduct} />
      </Flex>
    </Flex>
  );
};

export default CreateProduct;
