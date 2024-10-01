import initialState, { HomeState } from "./initialState";
import HomeActionsType from "src/actionTypes/home.actionsType";
import produce from "immer";
import { isEmpty } from "lodash";

const homeReducer = (state: HomeState = initialState, action: any) => {
  switch (action.type) {
    case HomeActionsType.UPDATE_LOADING_UICONFIG:
      return produce(state, (prevState) => {
        prevState.loading = action.payload;
      });
    case HomeActionsType.UPDATE_UICONFIG_DATA:
      return produce(state, (prevState) => {
        prevState[action.payload.name] = action.payload.value;
      });
    case HomeActionsType.UPDATE_HOME_PAGE_CONFIG:
      return produce(state, (prevState) => {
        Object.keys(action.payload || {}).forEach((key) => {
          if (action.payload[key] && !isEmpty(action.payload[key])) {
            prevState[key] = action.payload[key];
          }
        });
      });
    default:
      return state;
  }
};

export default homeReducer;
