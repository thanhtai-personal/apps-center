import { FormHelperText, MenuItem, Select, useTheme } from "@material-ui/core";
import { memo, useEffect, useRef, useState } from "react";
import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import { useGlobalStyle } from "src/styles";
import Text from "../Text";

const SelectField = (props: any) => {
  const { item = {} } = props;
  const {
    onChange,
    getOptions,
    options,
    validateObj = { errors: [] },
    name,
    useNoneValue = false,
    placeholder = "",
    viewMode,
    defaultValue,
  } = item;
  const { t } = useLocalize();
  const theme = useTheme();
  const [_options, setOptions] = useState([] as Array<any>);
  const globalClasses = useGlobalStyle();
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any, value) => {
    onChange && onChange({ value: e.target.value, name });
    setSelectedValue(e.target.value as string);
  };

  useEffect(() => {
    setLoading(true);
    options && setOptions(options);
    setSelectedValue(defaultValue as string);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [options, defaultValue]);

  useEffect(() => {
    if (getOptions) {
      (async () => {
        setLoading(true);
        try {
          const res = await getOptions();
          setOptions(res || []);
        } catch (error) {
          throw error;
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [getOptions]);

  return (
    <Flex column width={"100%"} bgcolor={theme.palette.background.paper}>
      {item.label && (
        <Text className={globalClasses.labelText}>{t(item.label)}:&nbsp;</Text>
      )}
      {loading ? (
        <Select
          key={"loading-select"}
          variant="standard"
          disableUnderline
          onChange={handleChange}
          placeholder={placeholder}
          error={validateObj?.errors?.includes(name)}
          value={"loading"}
          style={{
            border: validateObj?.errors?.includes(name)
              ? "solid 1px rgba(250, 6, 6, 0.24)"
              : "solid 1px rgba(0,0,0,0.12)",
            borderRadius: ".5rem",
            padding: "0 12px",
          }}
        >
          <MenuItem value={"loading"}>
            <Flex centerY key={"loading-value"}>
              <Text
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Loading
              </Text>
            </Flex>
          </MenuItem>
        </Select>
      ) : (
        <Select
          key={"value-select"}
          variant="standard"
          disableUnderline
          onChange={handleChange}
          placeholder={placeholder}
          error={validateObj?.errors?.includes(name)}
          value={selectedValue}
          disabled={loading}
          style={{
            border: validateObj?.errors?.includes(name)
              ? "solid 1px rgba(250, 6, 6, 0.24)"
              : "solid 1px rgba(0,0,0,0.12)",
            borderRadius: ".5rem",
            padding: "0 12px",
          }}
        >
          {useNoneValue && (
            <MenuItem value={null}>
              <Flex centerY key={"none-value"}>
                <Text
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  None
                </Text>
              </Flex>
            </MenuItem>
          )}
          {_options.map((item) => (
            <MenuItem value={item.key || item._id} key={item.key || item._id}>
              <Flex centerY key={item.key}>
                {item.icon}&nbsp;&nbsp;
                <Text
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </Text>
              </Flex>
            </MenuItem>
          ))}
        </Select>
      )}
      {item.helpText && !viewMode && (
        <FormHelperText id={`${item.id}-helper-text`}>
          {item.helpText}
        </FormHelperText>
      )}
    </Flex>
  );
};

export default SelectField;
