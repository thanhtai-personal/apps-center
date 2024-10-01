import initialState, { HomeState } from "./initialState";
// import HomeActionsType from "src/actionTypes/home.actionsType";
import produce from "immer";

const homeReducer = (state: HomeState = initialState, action: any) => {
  switch (action.type) {
    // case HomeActionsType.UPDATE_LOADING_UICONFIG:
    //   return produce(state, (prevState) => {
    //     prevState.loading = action.payload;
    //   });
    default:
      return state;
  }
};

export default homeReducer;
