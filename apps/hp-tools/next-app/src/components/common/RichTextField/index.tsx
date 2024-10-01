import { useTheme } from "@material-ui/core";
import { useEffect, useRef } from "react";
import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import { useGlobalStyle } from "src/styles";
import Text from "../Text";
import { useRichTextFieldStyle } from "./styles";
import TipTap from "./TipTap";

const RichTextField = (props: any) => {
  const { item = {} } = props;
  const {
    onChange,
    validateObj = { errors: [] },
    name,
    editable,
    defaultValue,
    setGlobalEditor,
  } = item;
  const { t } = useLocalize();
  const theme = useTheme();
  const globalClasses = useGlobalStyle();
  const classes = useRichTextFieldStyle();

  return (
    <Flex
      column
      width={"100%"}
      bgcolor={theme.palette.background.paper}
      className={classes.root}
    >
      {item.label && (
        <Text className={globalClasses.labelText}>{t(item.label)}:&nbsp;</Text>
      )}
      <Flex
        width={"100%"}
        className={"content"}
        style={{
          border: validateObj?.errors?.includes(name)
            ? "solid 1px rgba(250, 6, 6, 0.24)"
            : "solid 1px rgba(0,0,0,0.12)",
          borderRadius: ".5rem",
          padding: "16px",
        }}
      >
        <TipTap
          setGlobalEditor={setGlobalEditor}
          onChange={onChange}
          editable={editable}
          defaultValue={defaultValue}
        />
      </Flex>
    </Flex>
  );
};

export default RichTextField;
