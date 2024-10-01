import initialState, { ThemeState } from "./initialState";
import ThemeActionsType from "actionTypes/theme.actionsType";
import produce from "immer";

const themeReducer = (state: ThemeState = initialState, action: any) => {
  switch (action.type) {
    case ThemeActionsType.UPDATE_THEME:
      return produce(state, (prevState) => {
        prevState.themeKey = action.payload;
      });
    default:
      return state;
  }
};

export default themeReducer;
