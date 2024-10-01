import { ControlProps } from "@ttt-ui/react-hooks-form";
import { ISchemaProperty } from "@ttt/json-schema";

export function getControlProps<
  P extends object,
  Props extends ControlProps<ISchemaProperty, P>,
>(
  props: Props,
  input: true,
): Props & {
  label: string | undefined;
  description: string | undefined;
  withAsterisk: boolean;
};

export function getControlProps<
  P extends object,
  Props extends ControlProps<ISchemaProperty, P>,
>(
  props: Props,
): Props & {
  label: string | undefined;
  description: string | undefined;
};

export function getControlProps<
  P extends object,
  Props extends ControlProps<ISchemaProperty, P>,
>(props: Props, input?: boolean) {
  const {
    schema: { title, description },
    required = false,
    ...other
  } = props;

  if (!input) {
    return {
      label: title,
      description,
      ...other,
    };
  }

  return {
    label: title,
    description,
    withAsterisk: required,
    ...other,
  };
}
