import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback } from "react";
import { useGlobalStyle } from "src/styles";
import { useDetailOrderStyles } from "./styles";
import DetailOrderModel from "./model.detailOrder";
import useSelector from "src/hooks/useSelector";

interface DetailOrderProps {}

const DetailOrder = (props: DetailOrderProps) => {
  const classes = useDetailOrderStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleDetailOrder = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>{t("Detail order")}</Text>
        </Flex>
        <MuiForm
          model={DetailOrderModel}
          viewMode
          onSubmit={handleDetailOrder}
        />
      </Flex>
    </Flex>
  );
};

export default DetailOrder;
