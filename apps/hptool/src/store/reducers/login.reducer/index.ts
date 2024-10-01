import initialState, { LoginState } from "./initialState";
import LoginActionType from "src/actionTypes/login.actionsType";
import produce from "immer";

const loginReducer = (state: LoginState = initialState, action: any) => {
  switch (action.type) {
    case LoginActionType.UPDATE_LOADING_LOGIN:
      return produce(state, (prevState) => {
        prevState.loading = action.payload;
      });
    case LoginActionType.UPDATE_LOGIN_USER_NAME:
      return produce(state, (prevState) => {
        prevState.username = action.payload;
      });
    case LoginActionType.UPDATE_LOGIN_PASSWORD:
      return produce(state, (prevState) => {
        prevState.password = action.payload;
      });
    case LoginActionType.UPDATE_VALIDATE_LOGIN:
      return produce(state, (prevState) => {
        prevState.validateObj.errors = action.payload;
      });
    default:
      return state;
  }
};

export default loginReducer;
