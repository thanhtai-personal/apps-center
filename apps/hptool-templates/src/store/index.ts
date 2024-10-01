import loggerMiddleware from "middlewares/logger";
import rootReducer from "./reducers";
import defaultState from "./reducers/initialState";

const createStore = (reducer, initialState, enhancer) => {
  let state = initialState;
  const listeners = [];

  const getState = (selector?: Function) => {
    if (selector) return selector(state);
    return state;
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
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

const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg;
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
  (...middlewares) =>
  (createStore) =>
  (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    const dispatch = (action) => store.dispatch(action);
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
