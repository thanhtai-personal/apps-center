import initialState, { LayoutState } from "./initialState";
import localizeActionTypes from "src/actionTypes/localize.actionsType";
import produce from "immer";

const localizeReducer = (state: LayoutState = initialState, action) => {
  switch (action.type) {
    case localizeActionTypes.CHANGE_LANGUAGE:
      return produce(state, (prevState) => {
        prevState.key = action.payload;
      });
    default:
      return state;
  }
};

export default localizeReducer;
