import { useLayoutEffect, useState } from "react";
import store from "src/store";

const useSelector = (
  selector: Function = (state) => state,
  isDebug: boolean = false
) => {
  const [state, setState] = useState(store.getState());

  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newState = store.getState();
      setState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  if (isDebug) {
    console.log("selector state", selector(state));
  }
  return selector(state);
};

export default useSelector;
