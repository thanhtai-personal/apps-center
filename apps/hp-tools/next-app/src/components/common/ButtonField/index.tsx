import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import Flex from "src/components/common/Flex";
import Text from "src/components/common/Text";
import useLocalize from "src/hooks/useLocalize";
import useSelector from "src/hooks/useSelector";
import { useGlobalStyle } from "src/styles";

const ButtonField = (props: any) => {
  const {
    action,
    label,
    selector,
    loading,
    validated = () => true,
    router,
    ...nestedProps
  } = props;
  const { t } = useLocalize();
  const globalClasses = useGlobalStyle();
  const storeData = useSelector(selector);
  const _router = useRouter();
  const handleClick = (e: any) => {
    action && action({ event: e, router: router || _router, ...nestedProps });
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
