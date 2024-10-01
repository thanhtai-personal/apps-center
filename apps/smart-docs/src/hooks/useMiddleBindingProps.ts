import { useMemo } from "react";

const useMiddleBindingProps = (functionWrapperObj: any, data: any) => {
    const passedDataFunction = useMemo(() => {
      return Object.keys(functionWrapperObj).reduce((prev: any, current: string) => {
        return {
          ...prev,
          [current]: functionWrapperObj[current](data),
        };
      }, {});
    }, [functionWrapperObj, data]);

  return [passedDataFunction]
}

export default useMiddleBindingProps