import { Button } from 'flowbite-react';
import { Fragment } from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  DefaultValues,
  FieldValues,
  Path,
  RegisterOptions,
  SubmitHandler,
  UseFormReturn,
  UseFormStateReturn,
  useForm
} from 'react-hook-form';

export interface IField<T extends FieldValues> {
  renderField: (form?: UseFormReturn<T, any, undefined>) => ({ field, fieldState, formState }
    : {
      field: ControllerRenderProps<T, Path<T>>;
      fieldState: ControllerFieldState;
      formState: UseFormStateReturn<T>
    }) => React.ReactElement;
  key: string;
  name: string;
  display?: boolean;
  rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">;
  /**
   * supported rules:
   required
   min
   max
   minLength
   maxLength
   pattern
   validate
   */
}

export interface IForm<T extends FieldValues> {
  fields?: IField<T>[];
  initialValue?: T;
  onSubmit?: SubmitHandler<T>;
  texts?: {
    submit?: string;
  };
  useSubmitButton?: boolean;
}

export const ReactHookForm = <T extends FieldValues,>({
  initialValue,
  fields,
  onSubmit,
  texts,
  useSubmitButton
}: IForm<T>) => {
  const form = useForm<T>({
    defaultValues: initialValue as DefaultValues<T>
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const _onSubmit = (data: T) => {
    onSubmit && onSubmit(data);
  };

  return (
    <>
      {fields?.filter(f => !!f.display).map(({ renderField, key, rules, name: fieldName }) => {
        return (
          <Fragment key={key}>
            <Controller
              key={key}
              control={control}
              rules={rules}
              render={renderField(form)}
              name={fieldName as Path<T>}
            />
            {errors[fieldName] && <div key={`error-${key}`} className="error text-sm italic">{errors[fieldName]?.message?.toString()}</div>}
          </Fragment>
        )
      })}
      {!!useSubmitButton && <Button type="submit" onClick={handleSubmit(_onSubmit)}>{texts?.submit || "Save"}</Button>}
    </>
  );
};
