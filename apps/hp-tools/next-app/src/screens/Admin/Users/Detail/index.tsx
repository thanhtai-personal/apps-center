import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback } from "react";
import { useGlobalStyle } from "src/styles";
import { useDetailUserStyles } from "./styles";
import DetailUserModel from "./model.detailUser";
import useSelector from "src/hooks/useSelector";

interface DetailUserProps {}

const DetailUser = (props: DetailUserProps) => {
  const classes = useDetailUserStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleDetailUser = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>{t("Detail user")}</Text>
        </Flex>
        <MuiForm model={DetailUserModel} viewMode onSubmit={handleDetailUser} />
      </Flex>
    </Flex>
  );
};

export default DetailUser;
