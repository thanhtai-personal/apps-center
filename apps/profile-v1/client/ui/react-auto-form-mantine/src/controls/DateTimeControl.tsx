import { DateTimePicker, DateTimePickerProps } from "@mantine/dates";
import { IStringSchemaProperty } from "@ttt/json-schema";
import { ControlProps, useFormError } from "@ttt-ui/react-hooks-form";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getControlProps } from "../getControlProps";

export interface DateTimeControlProps
  extends ControlProps<IStringSchemaProperty, DateTimePickerProps> {}

export const DateTimeControl = forwardRef<
  HTMLButtonElement,
  DateTimeControlProps
>((props: DateTimeControlProps, ref) => {
  const { control, formState } = useFormContext();
  const getError = useFormError(formState);

  return (
    <Controller
      control={control}
      name={props.name!}
      render={({ field }) => (
        <DateTimePicker
          {...getControlProps(props, true)}
          {...field}
          ref={ref}
          error={props.name && getError(props.name)}
        />
      )}
    />
  );
});
