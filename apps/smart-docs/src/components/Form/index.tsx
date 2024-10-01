import React, { useCallback, useState } from "react";
import Field from "app/components/Field";
import useObjectToArrayConverterWithSorting from "app/hooks/useObjectToArrayConverterWithSorting";
import useMiddleBindingProps from "app/hooks/useMiddleBindingProps";

interface FormProps {
  title: string;
  values: any;
  errors: any;
  validate: any;
  model: any;
  onSubmit: any;
  getOptions?: any;
  dataSelected?: any;
  onUpdateForm?: any;
  onRelatedUpdate?: any;
  onErrorUpdate?: any;
}

const Form = (props: FormProps) => {
  const {
    title,
    validate,
    model = {},
    onSubmit,
    getOptions = {},
    dataSelected,
    onUpdateForm,
    onRelatedUpdate,
    values,
    errors,
    onErrorUpdate,
  } = props;

  const [isSubmitting, setIsSbumitting] = useState(false);
  const [fields] = useObjectToArrayConverterWithSorting(model, "priority");
  const [passedDataGetOptions] = useMiddleBindingProps(
    getOptions,
    dataSelected
  );

  const handleSubmit = useCallback(async () => {
    setIsSbumitting(true);
    try {
      await (onSubmit && onSubmit());
    } catch (error) {
    } finally {
      setIsSbumitting(false);
    }
  }, [onSubmit]);

  const handleUpdateFormValue = useCallback(
    (field: any, newValue: any) => {
      if (!field.name) return;
      onUpdateForm && onUpdateForm(field.name, newValue);
      field.relatedFields &&
        onRelatedUpdate &&
        onRelatedUpdate(field.relatedFields, field.name, newValue);
    },
    [onUpdateForm, onRelatedUpdate]
  );

  const handleError = useCallback(
    (name: string, error: any) => {
      onErrorUpdate && onErrorUpdate(name, error);
    },
    [onErrorUpdate]
  );

  return (
    <div
      style={{
        minWidth: "40vw",
        maxWidth: "75vw",
        padding: "8px",
        position: "relative",
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          borderBottom: "solid 1px rgba(0,0,0, 0.125)",
          padding: "8px",
        }}
      >
        <h1 style={{ fontWeight: 700, textTransform: "uppercase" }}>{title}</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "16px",
        }}
      >
        {fields.map((item) => {
          return (
            <Field
              key={`item-${item.priority}-${item.id}`}
              item={item}
              getOptions={passedDataGetOptions}
              setFormValue={handleUpdateFormValue}
              errors={errors}
              values={values}
              validate={validate}
              setErrors={handleError}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          padding: "8px 0",
        }}
      >
        <button
          disabled={isSubmitting}
          style={{
            background: "steelblue",
            padding: "8px",
          }}
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Form;
