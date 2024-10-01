import { Flex, FlexProps, Text } from "@mantine/core";
import { IObjectSchemaProperty, ISchemaProperty } from "@ttt/json-schema";
import { ControlProps, controlRenderer } from "@ttt-ui/react-hooks-form";
import { Fragment, forwardRef } from "react";
import { getControlProps } from "../getControlProps";

export interface ObjectControlProps
  extends ControlProps<IObjectSchemaProperty, FlexProps> {}

export const ObjectControl = forwardRef<HTMLDivElement, ObjectControlProps>(
  (props: ObjectControlProps, ref) => {
    const { title, description, name, ...other } = getControlProps(props);
    const {
      schema: { properties, required },
    } = props;
    return (
      <Flex direction="column" gap="md" ref={ref} {...other}>
        {title && <Text>{title}</Text>}
        {description && <Text>{description}</Text>}
        {Object.keys(
          properties as Record<string, ISchemaProperty<unknown>>,
        ).map((key) => {
          const propertyProps = properties[key];
          if (!propertyProps) {
            return null;
          }
          return (
            <Fragment key={key}>
              {controlRenderer({
                schema: propertyProps,
                required: required?.includes(key),
                name: name ? `${name}.${key}` : key,
              })}
            </Fragment>
          );
        })}
      </Flex>
    );
  },
);
