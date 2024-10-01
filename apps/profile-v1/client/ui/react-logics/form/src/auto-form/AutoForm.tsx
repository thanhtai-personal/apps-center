import { IObjectSchemaProperty } from "@ttt/json-schema";
import { FormProvider, Path, UseFormReturn } from "react-hook-form";
import { controlRenderer } from "./registerControls";

export interface AutoFormProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  schema: IObjectSchemaProperty;
  name?: Path<T>;
}

export function AutoForm<T extends Record<string, any>>({
  form,
  schema,
  name,
}: AutoFormProps<T>) {
  return (
    <FormProvider {...form}>{controlRenderer({ schema, name })}</FormProvider>
  );
}
