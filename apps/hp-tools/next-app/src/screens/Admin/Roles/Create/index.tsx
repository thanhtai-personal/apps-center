import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback } from "react";
import { useGlobalStyle } from "src/styles";
import { useCreateRoleStyles } from "./styles";
import CreateRoleModel from "./model.createRole";
import useSelector from "src/hooks/useSelector";

interface CreateRoleProps {}

const CreateRole = (props: CreateRoleProps) => {
  const classes = useCreateRoleStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleCreateRole = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>{t("Create role")}</Text>
        </Flex>
        <MuiForm model={CreateRoleModel} onSubmit={handleCreateRole} />
      </Flex>
    </Flex>
  );
};

export default CreateRole;
