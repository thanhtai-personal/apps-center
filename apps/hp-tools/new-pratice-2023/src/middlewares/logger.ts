const loggerMiddleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV === "development") {
    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
  }
  const result = next(action);
  return result;
};

export default loggerMiddleware;
