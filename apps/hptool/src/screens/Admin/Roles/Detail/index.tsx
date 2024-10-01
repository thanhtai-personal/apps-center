import { toggleHeader } from "src/actions/layout.actions";
import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback, useEffect } from "react";
import { useGlobalStyle } from "src/styles";
import { useDetailRoleStyles } from "./styles";
import DetailRoleModel from "./model.detailRole";
import useSelector from "src/hooks/useSelector";

interface DetailRoleProps {}

const DetailRole = (props: DetailRoleProps) => {
  const classes = useDetailRoleStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleDetailRole = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>{t("Detail role")}</Text>
        </Flex>
        <MuiForm model={DetailRoleModel} viewMode onSubmit={handleDetailRole} />
      </Flex>
    </Flex>
  );
};

export default DetailRole;
