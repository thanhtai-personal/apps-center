import { useReducerWithLogger } from "@/hooks/useReducerWithLogger";
import React, { createContext, useContext, ReactNode, Dispatch, Reducer } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

interface ContextData<T, Action> {
  Provider: React.FC<ContextProviderProps>;
  useDataContext: () => T | null;
  useDataDispatchContext: () => Dispatch<Action> | null;
}

export const makeContext = <T, Action>(
  reducer: Reducer<T, Action>,
  initialData: T
): ContextData<T, Action> => {
  const DataContext = createContext<T | null>(null);
  const DataDispatchContext = createContext<Dispatch<Action> | null>(null);

  const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [data, dispatch] = useReducerWithLogger(reducer, initialData);

    return (
      <DataContext.Provider value={data}>
        <DataDispatchContext.Provider value={dispatch}>
          {children}
        </DataDispatchContext.Provider>
      </DataContext.Provider>
    );
  };

  const useDataContext = () => useContext(DataContext);
  const useDataDispatchContext = () => useContext(DataDispatchContext);

  return {
    Provider: ContextProvider,
    useDataContext,
    useDataDispatchContext
  };
};
