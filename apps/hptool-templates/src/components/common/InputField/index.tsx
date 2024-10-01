import {
  FormHelperText,
  InputLabel,
  TextField,
  useTheme,
} from "@material-ui/core";
import Flex from "components/common/Flex";
import useLocalize from "hooks/useLocalize";
import Text from "../Text";

const InputField = (props: any) => {
  const { item = {} } = props;
  const {
    inputProps = {},
    labelProps = {},
    onChange,
    validateObj,
    name,
  } = item;
  const { t } = useLocalize();
  const theme = useTheme();

  const handleChange = (e: any) => {
    onChange && onChange({ value: e.target?.value });
  };

  return (
    <Flex column width={"100%"} bgcolor={theme.palette.background.paper}>
      <TextField
        variant="standard"
        id={item.id}
        label={
          <Text fontSize={12} mx={2}>
            {t(item.label)}
          </Text>
        }
        aria-describedby={`${item.id}-helper-text`}
        onChange={handleChange}
        InputProps={{
          disableUnderline: true,
          error: validateObj.errors?.includes(name),
          style: {
            border: validateObj.errors?.includes(name)
              ? "solid 1px rgba(250, 6, 6, 0.24)"
              : "solid 1px rgba(0,0,0,0.12)",
            borderRadius: ".5rem",
            padding: "0 12px",
          },
        }}
        {...inputProps}
      />
      {item.helpText && (
        <FormHelperText id={`${item.id}-helper-text`}>
          {item.helpText}
        </FormHelperText>
      )}
    </Flex>
  );
};

export default InputField;
