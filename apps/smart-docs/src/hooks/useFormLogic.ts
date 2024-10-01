import { AppModalInstance } from "app/pages";
import { useCallback, useEffect, useState } from "react";

const useFormLogic = (props: any) => {
  const {
    mappingSubmitData,
    mappingInitialValues,
    initialData,
    onSubmit,
    isEdit,
  } = props;
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setValues(
        mappingInitialValues ? mappingInitialValues(initialData) : initialData
      );
    }
  }, [initialData, mappingInitialValues]);

  const handleUpdateData = useCallback((name: string, value: any) => {
    if (!name) return;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleUpdateRelatedFields = useCallback((item: any, newValue: any) => {
    if (!item.updateRelatedFields) return;
    item.updateRelatedFields(newValue, errors);
  }, []);

  const handleUpdateErrors = useCallback((name: string, error: any) => {
    if (!name) return;
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const dataSubmit = mappingSubmitData ? mappingSubmitData(values) : values;
      if (onSubmit) {
        await onSubmit(dataSubmit, isEdit);
      }
    } catch (error) {
    } finally {
      AppModalInstance.close();
    }
  }, [values, onSubmit, mappingSubmitData, isEdit]);

  return [
    {
      values,
      errors,
    },
    {
      handleUpdateData,
      handleUpdateRelatedFields,
      handleUpdateErrors,
      handleSubmit,
    },
  ];
};

export default useFormLogic;
