import { TextField, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import Flex from "src/components/common/Flex";
import useLocalize from "src/hooks/useLocalize";
import { useGlobalStyle } from "src/styles";
import { toLowerCaseNonAccentVietnamese } from "src/utils/helpers";
import Text from "../Text";
import { useSelectStyle } from "./styles";
import { debounce } from "lodash";

const MultipleSelectField = (props: any) => {
  const { item = {} } = props;
  const { onChange, getOptions, options, name, defaultValue, label } = item;
  const { t } = useLocalize();
  const theme = useTheme();
  const [_options, setOptions] = useState([] as Array<any>);
  const globalClasses = useGlobalStyle();
  const classes = useSelectStyle();
  const [selectedObjs, setSelectedObjs] = useState(defaultValue || []);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    options && setOptions(options);
    setSelectedObjs(defaultValue || []);
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
    <Flex
      className={classes.root}
      column
      width={"100%"}
      bgcolor={theme.palette.background.paper}
      border={"solid 1px rgba(0,0,0, 0.12)"}
      borderRadius={"1rem"}
      pt={3}
    >
      <Text className={globalClasses.labelText}>{label}:</Text>
      <Flex
        width={"100%"}
        className="value-container"
        flexWrap={"wrap"}
        minHeight={36}
        p={2}
      >
        {selectedObjs.map((selectedItem) => (
          <Flex
            m={1}
            key={selectedItem._id}
            p={2}
            borderRadius={"1rem"}
            bgcolor={"gray"}
            cursor={"pointer"}
            onClick={debounce(
              () =>
                setSelectedObjs((prev) =>
                  prev.filter((opt) => opt._id !== selectedItem._id)
                ),
              300
            )}
          >
            <Text className={"text"} color={"#fff"}>
              {selectedItem.name}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Flex width={"100%"} border={"solid 1px rgba(0,0,0, 0.12)"} my={2} px={2}>
        <TextField
          variant="standard"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t(`Enter search value`)}
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Flex>
      <Flex
        width={"100%"}
        className="selector-container"
        borderRadius={"1rem"}
        border={"solid 1px rgba(0,0,0, 0.12)"}
        px={2}
        column
        minHeight={120}
        maxHeight={350}
        overflow={"auto"}
      >
        {_options
          .filter(
            (opt) =>
              !selectedObjs.map((it) => it._id).includes(opt._id) &&
              toLowerCaseNonAccentVietnamese(opt.name).includes(
                toLowerCaseNonAccentVietnamese(searchValue)
              )
          )
          .map((opt) => {
            return (
              <Flex
                width={"100%"}
                key={opt.id || opt._id}
                p={2}
                borderRadius={".25rem"}
                cursor={"pointer"}
                onClick={debounce(() => {
                  setSelectedObjs((prev) => {
                    onChange && onChange([opt, ...prev]);
                    return [opt, ...prev];
                  });
                }, 300)}
                className={globalClasses.itemHover}
              >
                <Text className={"text"}>{opt.name}</Text>
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
};

export default MultipleSelectField;
