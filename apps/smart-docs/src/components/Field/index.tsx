import { memo } from "react";

interface FieldProps {
  item: any;
  values: any;
  getOptions?: any;
  setFormValue?: any;
  errors?: any;
  validate?: any;
  setErrors?: any;
}

const Field = (props: FieldProps) => {
  const {
    item,
    getOptions,
    setFormValue,
    errors,
    values,
    validate,
    setErrors,
  } = props;

  const handleChangeField = (newValue: any) => {
    try {
      if (validate) {
        const validateObj = validate[item.name];
        if (validateObj && validateObj.func) {
          if (!validateObj.func(newValue)) {
            throw {
              message: "validated error",
            };
          }
        }
      }
      setFormValue && setFormValue(item, newValue);
    } catch (error: any) {
      console.log("error", error);
      if (error && error.message === "validated error") {
        setErrors && setErrors(item.name, { validated: false, touched: true });
      }
    }
  };

  if (!item.name) return <></>;
  return (
    <div className="field">
      {item.render({
        getOptions: getOptions[item.name],
        item,
        value: values[item.name],
        onChange: handleChangeField,
        error: errors[item.name],
      })}
    </div>
  );
};

export default memo(Field);
