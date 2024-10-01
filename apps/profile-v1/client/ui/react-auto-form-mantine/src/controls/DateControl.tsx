import { DateInput, DateInputProps } from "@mantine/dates";
import { IStringSchemaProperty } from "@ttt/json-schema";
import { ControlProps, useFormError } from "@ttt-ui/react-hooks-form";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getControlProps } from "../getControlProps";

export interface DateControlProps
  extends ControlProps<IStringSchemaProperty, DateInputProps> {}

export const DateControl = forwardRef<HTMLInputElement, DateControlProps>(
  (props: DateControlProps, ref) => {
    const { control, formState } = useFormContext();
    const getError = useFormError(formState);

    return (
      <Controller
        control={control}
        name={props.name!}
        render={({ field }) => (
          <DateInput
            {...getControlProps(props, true)}
            {...field}
            ref={ref}
            error={props.name && getError(props.name)}
          />
        )}
      />
    );
  },
);
