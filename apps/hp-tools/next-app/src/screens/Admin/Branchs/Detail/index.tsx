import { toggleHeader } from "src/actions/layout.actions";
import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import MuiForm from "src/components/common/Form";
import useLocalize from "src/hooks/useLocalize";
import { useCallback, useEffect } from "react";
import { useGlobalStyle } from "src/styles";
import { useDetailBranchStyles } from "./styles";
import DetailBranchModel from "../model.branch";
import useSelector from "src/hooks/useSelector";
import useSearchParams from "src/hooks/useSearchParams";
import { getDetailBranch, updateBranchId } from "src/actions/branch.actions";

interface DetailBranchProps {}

const DetailBranch = (props: DetailBranchProps) => {
  const classes = useDetailBranchStyles();
  const globalClasses = useGlobalStyle();
  const localizeState = useSelector((state) => state.localize);
  const { t, i18n } = useLocalize(localizeState.key);

  const handleDetailBranch = useCallback(() => {}, []);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      getDetailBranch(id);
      updateBranchId(id);
    }
  }, [id]);

  return (
    <Flex width={"100%"} height={"100%"} center>
      <Flex className={globalClasses.box} minWidth={400} column>
        <Flex className="box-title">
          <Text className={globalClasses.textTitle}>{t("Detail branch")}</Text>
        </Flex>
        <MuiForm model={DetailBranchModel} onSubmit={handleDetailBranch} />
      </Flex>
    </Flex>
  );
};

export default DetailBranch;
