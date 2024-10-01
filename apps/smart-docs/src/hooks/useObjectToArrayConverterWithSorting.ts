import { useMemo } from "react";

const useObjectToArrayConvererWithSorting = (object: any, sortKey: string) => {
    const arrays = useMemo(
    () =>
      Object.keys(object)
        .map((key) => ({
          ...object[key],
          name: key,
        }))
        .sort((a: any, b:any) => (a[sortKey] || 1) - (b[sortKey] || 1)),
    [object, sortKey]
  );

  return [arrays]
}

export default useObjectToArrayConvererWithSorting