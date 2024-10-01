import AuthActionsType from "actionTypes/auth.actionsType";
import produce from "immer";
import initialState, { AuthState } from "./initialState";

const authReducer = (state: AuthState = initialState, action) => {
  switch (action.type) {
    case AuthActionsType.UPDATE_LOADING_AUTHEN:
      return produce(state, (prevState) => {
        prevState.loading = action.payload;
      });
    case AuthActionsType.UPDATE_AUTHEN_DATA:
      return produce(state, (prevState) => {
        prevState.authenUser = action.payload;
      });
    default:
      return state;
  }
};

export default authReducer;
