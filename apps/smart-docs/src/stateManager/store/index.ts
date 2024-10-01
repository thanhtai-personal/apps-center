import loggerMiddleware from "../middlewares/logger";
import rootReducer from "../reducers";
import defaultState from "../reducers/initialState";

const createStore = (reducer: any, initialState: any, enhancer: any) => {
  let state = initialState;
  const listeners: Array<any> = [];

  const getState = (selector?: Function) => {
    if (selector) return selector(state);
    return state;
  };

  const dispatch = (action: any) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: any) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  const unsubscribe = subscribe(() => {
    const state = getState();
  });

  if (enhancer) {
    return enhancer(createStore)(reducer, initialState);
  }

  return {
    getState,
    dispatch,
    subscribe,
    unsubscribe,
  };
};

const compose = <T>(...funcs: ((arg: T) => T)[]): ((arg: T) => T) => {
  if (funcs.length === 0) {
    return (arg: any) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
};

const applyMiddleware =
  (...middlewares: any[]) =>
  (createStore: any) =>
  (reducer: any, initialState: any) => {
    const store = createStore(reducer, initialState);
    const dispatch = (action: any) => store.dispatch(action);
    const chain = middlewares.map((middleware) => middleware(store));
    const enhancedDispatch = compose(...chain)(dispatch);

    return {
      ...store,
      dispatch: enhancedDispatch,
    };
  };

const store = applyMiddleware(loggerMiddleware)(createStore)(
  rootReducer,
  defaultState
);

export default store;
