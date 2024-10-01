import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback } from "react";
import { useGlobalStyle } from "src/styles";
import { useCreateOrderStyles } from "./styles";
import CreateOrderModel from "./model.createOrder";
import useSelector from "src/hooks/useSelector";

interface CreateOrderProps {}

const CreateOrder = (props: CreateOrderProps) => {
  const classes = useCreateOrderStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleCreateOrder = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>{t("Create order")}</Text>
        </Flex>
        <MuiForm model={CreateOrderModel} onSubmit={handleCreateOrder} />
      </Flex>
    </Flex>
  );
};

export default CreateOrder;
