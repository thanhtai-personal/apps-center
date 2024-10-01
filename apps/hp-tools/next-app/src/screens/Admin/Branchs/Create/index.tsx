import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback } from "react";
import { useGlobalStyle } from "src/styles";
import { useCreateBranchStyles } from "./styles";
import CreateBranchModel from "../model.branch";
import useSelector from "src/hooks/useSelector";

interface CreateBranchProps {}

const CreateBranch = (props: CreateBranchProps) => {
  const classes = useCreateBranchStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleCreateBranch = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>{t("Create branch")}</Text>
        </Flex>
        <MuiForm model={CreateBranchModel} onSubmit={handleCreateBranch} />
      </Flex>
    </Flex>
  );
};

export default CreateBranch;
