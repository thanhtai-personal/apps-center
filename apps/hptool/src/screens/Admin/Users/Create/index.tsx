import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback } from "react";
import { useGlobalStyle } from "src/styles";
import { useCreateUserStyles } from "./styles";
import CreateUserModel from "./model.createUser";
import useSelector from "src/hooks/useSelector";

interface CreateUserProps {}

const CreateUser = (props: CreateUserProps) => {
  const classes = useCreateUserStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleCreateUser = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>{t("Create user")}</Text>
        </Flex>
        <MuiForm model={CreateUserModel} onSubmit={handleCreateUser} />
      </Flex>
    </Flex>
  );
};

export default CreateUser;
