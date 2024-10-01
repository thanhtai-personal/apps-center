import initialState, { HeaderState } from "./initialState";

const headerReducer = (state: HeaderState = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default headerReducer;
