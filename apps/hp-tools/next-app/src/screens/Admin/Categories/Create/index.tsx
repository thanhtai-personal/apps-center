import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback } from "react";
import { useGlobalStyle } from "src/styles";
import { useCreateCategoryStyles } from "./styles";
import CategoryModel from "../model.category";
import useSelector from "src/hooks/useSelector";

interface CreateCategoryProps {}

const CreateCategory = (props: CreateCategoryProps) => {
  const classes = useCreateCategoryStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleCreateCategory = useCallback(() => {}, []);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>
            {t("Create category")}
          </Text>
        </Flex>
        <MuiForm model={CategoryModel} onSubmit={handleCreateCategory} />
      </Flex>
    </Flex>
  );
};

export default CreateCategory;
