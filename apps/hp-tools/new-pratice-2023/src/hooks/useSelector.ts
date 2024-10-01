import { useEffect, useState } from "react";
import store from "store";

const useSelector = (selector: Function) => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newState = store.getState();
      setState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return selector(state);
};

export default useSelector;
