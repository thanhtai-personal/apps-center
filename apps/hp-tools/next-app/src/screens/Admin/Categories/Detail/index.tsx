import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback, useEffect } from "react";
import { useGlobalStyle } from "src/styles";
import { useDetailCategoryStyles } from "./styles";
import CategoryModel from "../model.category";
import useSelector from "src/hooks/useSelector";
import useSearchParams from "src/hooks/useSearchParams";
import {
  getDetailCategory,
  updateCategoryId,
} from "src/actions/category.actions";

interface DetailCategoryProps {}

const DetailCategory = (props: DetailCategoryProps) => {
  const classes = useDetailCategoryStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleDetailCategory = useCallback(() => {}, []);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      getDetailCategory(id);
      updateCategoryId(id);
    }
  }, [id]);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>
            {t("Detail category")}
          </Text>
        </Flex>
        <MuiForm model={CategoryModel} onSubmit={handleDetailCategory} />
      </Flex>
    </Flex>
  );
};

export default DetailCategory;
