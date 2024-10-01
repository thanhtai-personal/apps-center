import { Button } from "@material-ui/core";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import useLocalize from "hooks/useLocalize";
import useSelector from "hooks/useSelector";
import { useGlobalStyle } from "styles";

const ButtonField = (props: any) => {
  const {
    action,
    label,
    selector,
    loading,
    validated = () => true,
    ...nestedProps
  } = props;
  const { t } = useLocalize();
  const globalClasses = useGlobalStyle();
  const storeData = useSelector(selector);

  const handleClick = (e: any) => {
    action && action({ event: e });
  };

  return (
    <Flex column m={1}>
      <Button
        className={globalClasses.buttonSubmit}
        variant="contained"
        onClick={handleClick}
        disabled={
          storeData.loading || loading || !validated(storeData.validateObj)
        }
        {...nestedProps}
      >
        <Text className={globalClasses.buttonText}>
          {storeData.loading || loading ? t("...") : t(label)}
        </Text>
      </Button>
    </Flex>
  );
};

export default ButtonField;
