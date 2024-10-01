import { useCallback, useEffect, useState } from "react";

const useLocalStorageData = (key: string, defaultData?: any) => {
  const [jsonData, setJsonData] = useState("");
  const [error, setErrors] = useState(null as any);

  useEffect(() => {
    if (key) {
      const storageData = localStorage.getItem(key);
    if (storageData) {
      setJsonData(storageData);
    } else if (defaultData) {
      setJsonData(defaultData);
    }
    }
  }, [key, defaultData]);

  const handleUpdateJson = useCallback(
    (data: string) => {
      try {
        const isValid = JSON.parse(data);
        setErrors(null);
        setJsonData(data);
        localStorage.setItem(key, data);
      } catch (error) {
        setErrors(error)
      }
    },
    [key]
  );

  return [jsonData, jsonData ? JSON.parse(jsonData) : {}, handleUpdateJson, error];
};

export default useLocalStorageData;
