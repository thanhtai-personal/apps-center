import LayoutActionsType from "actionTypes/layout.actionsType";
import initialState, { MenuState } from "./initialState";
import produce from "immer";

const AppMenuReducer = (state: MenuState = initialState, action) => {
  switch (action.type) {
    case LayoutActionsType.TOGGLE_APP_MENU:
      return produce(state, (prevState) => {
        prevState.isMenuOpen = action.payload;
      });
    default:
      return state;
  }
};

export default AppMenuReducer;
