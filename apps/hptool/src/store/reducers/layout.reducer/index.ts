import LayoutActionsType from "src/actionTypes/layout.actionsType";
import produce from "immer";
import initialState, { LayoutState } from "./initialState";

const layoutReducer = (state: LayoutState = initialState, action) => {
  switch (action.type) {
    case LayoutActionsType.UPDATE_GLOBAL_LOADING:
      return produce(state, (prevState) => {
        prevState.isGlobalLoading = action.payload;
      });
    case LayoutActionsType.OPEN_OR_CLOSE_HEADER:
      return produce(state, (prevState) => {
        prevState.useHeader = action.payload;
      });
    case LayoutActionsType.OPEN_OR_CLOSE_FOOTER:
      return produce(state, (prevState) => {
        prevState.useFooter = action.payload;
      });
    case LayoutActionsType.UPDATE_ACTIVE_ALIGNMENT_MENU:
      return produce(state, (prevState) => {
        prevState.menuAlignment = action.payload;
      });
    case LayoutActionsType.UPDATE_APP_MENU:
      return produce(state, (prevState) => {
        prevState.dividerList = action.payload.dividerList;
        prevState.menus = action.payload.menus;
      });
    case LayoutActionsType.SET_ACTIVE_MENUS:
      return produce(state, (prevState) => {
        prevState.activeMenus = action.payload;
      });
    case LayoutActionsType.UPDATE_LAYOUT:
      return produce(state, (prevState) => {
        Object.keys(action.payload).forEach((key) => {
          prevState[key] = action.payload[key];
        });
      });
    case LayoutActionsType.TOGGLE_CATEGORY_MENU:
      return produce(state, (prevState) => {
        prevState.openMobileCategoryMenu = !prevState.openMobileCategoryMenu;
      });
    default:
      return state;
  }
};

export default layoutReducer;
