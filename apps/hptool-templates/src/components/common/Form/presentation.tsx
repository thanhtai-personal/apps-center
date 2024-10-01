import Flex from "../Flex";
import FormField from "../FormField";
import { formStyles } from "./styles";
import { isEmpty } from "lodash";
import { FormControl } from "@material-ui/core";
import { useEffect, useState } from "react";

const FormPresentation = (props: any) => {
  const [classes, setClasses] = useState(formStyles(props));
  const {
    topLeftFields = [],
    topRightFields = [],
    bottomLeftFields = [],
    bottomRightFields = [],
    topActions = [],
    bottomActions = [],
    customStyle,
  } = props;

  useEffect(() => {
    if (customStyle) {
      setClasses(customStyle(props));
    }
  }, [customStyle]);

  return (
    <FormControl>
      <Flex column width={"100%"} className={classes.form}>
        {!isEmpty(topActions) && (
          <Flex width={"100%"} justifyContent={"flex-end"}>
            {topActions.map((action) => (
              <Flex m={1} key={action.key}>
                {action.render(action)}
              </Flex>
            ))}
          </Flex>
        )}
        <Flex column width={"100%"}>
          <Flex width={"100%"} flexWrap={"wrap"}>
            {!isEmpty(topLeftFields) && (
              <Flex flex={1} column className="fields-wrapper top-left">
                {topLeftFields.map((field, index) => (
                  <FormField key={field.key} model={field} />
                ))}
              </Flex>
            )}
            {!isEmpty(topRightFields) && (
              <Flex flex={1} column className="fields-wrapper top-right">
                {topRightFields.map((field, index) => (
                  <FormField key={field.key} model={field} />
                ))}
              </Flex>
            )}
          </Flex>
          <Flex width={"100%"} flexWrap={"wrap"}>
            {!isEmpty(bottomLeftFields) && (
              <Flex flex={1} column className="fields-wrapper bottom-left">
                {bottomLeftFields.map((field, index) => (
                  <FormField key={field.key} model={field} />
                ))}
              </Flex>
            )}
            {!isEmpty(bottomRightFields) && (
              <Flex flex={1} column className="fields-wrapper bottom-right">
                {bottomRightFields.map((field, index) => (
                  <FormField key={field.key} model={field} />
                ))}
              </Flex>
            )}
          </Flex>
        </Flex>
        {props.children && props.children}
        {!isEmpty(bottomActions) && (
          <Flex width={"100%"} justifyContent={"flex-end"}>
            {bottomActions.map((action) => (
              <Flex m={1} key={action.key}>
                {action.render(action)}
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </FormControl>
  );
};

export default FormPresentation;
