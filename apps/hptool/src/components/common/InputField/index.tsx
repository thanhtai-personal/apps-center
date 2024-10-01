import { FormHelperText, TextField, useTheme } from "@material-ui/core";
import { useCallback, useEffect, useRef } from "react";
import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import { useGlobalStyle } from "src/styles";
import Text from "../Text";

const InputField = (props: any) => {
  const { item = {} } = props;
  const {
    inputProps = {},
    labelProps = {},
    onChange,
    validateObj = { errors: [] },
    name,
    viewMode,
    defaultValue,
  } = item;
  const { t } = useLocalize();
  const theme = useTheme();
  const globalClasses = useGlobalStyle();
  const inputRef: any = useRef();

  useEffect(() => {
    if (inputRef.current && defaultValue) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  const handleChange = useCallback(
    (e: any) => {
      onChange && onChange({ value: e.target?.value, name });
    },
    [name]
  );

  return (
    <Flex column width={"100%"} bgcolor={theme.palette.background.paper}>
      {item.label && (
        <Text className={globalClasses.labelText}>{t(item.label)}:&nbsp;</Text>
      )}
      <Flex
        width={"100%"}
        style={{
          border: validateObj?.errors?.includes(name)
            ? "solid 1px rgba(250, 6, 6, 0.24)"
            : "solid 1px rgba(0,0,0,0.12)",
          borderRadius: ".5rem",
          padding: "0 12px",
        }}
      >
        <TextField
          variant="standard"
          id={item.id}
          aria-describedby={`${item.id}-helper-text`}
          onChange={handleChange}
          defaultValue={defaultValue}
          inputRef={inputRef}
          InputProps={{
            disableUnderline: true,
          }}
          {...inputProps}
        />
        {item.actions && (
          <Flex>
            {item.actions.map((action) => {
              return (
                <Flex
                  cursor={"pointer"}
                  mx={1}
                  onClick={() => action.action && action.action()}
                >
                  {action.icon}
                </Flex>
              );
            })}
          </Flex>
        )}
      </Flex>
      {item.helpText && !viewMode && (
        <FormHelperText id={`${item.id}-helper-text`}>
          {item.helpText}
        </FormHelperText>
      )}
    </Flex>
  );
};

export default InputField;
