import initialState, { SignupState } from "./initialState";
import SignupActionType from "src/actionTypes/signup.actionsType";
import produce from "immer";

const loginReducer = (state: SignupState = initialState, action: any) => {
  switch (action.type) {
    case SignupActionType.UPDATE_LOADING_SIGNUP:
      return produce(state, (prevState) => {
        prevState.loading = action.payload;
      });
    case SignupActionType.UPDATE_SIGNUP_USER_NAME:
      return produce(state, (prevState) => {
        prevState.username = action.payload;
      });
    case SignupActionType.UPDATE_SIGNUP_PASSWORD:
      return produce(state, (prevState) => {
        prevState.password = action.payload;
      });
    case SignupActionType.UPDATE_SIGNUP_PASSWORD_CONFIRM:
      return produce(state, (prevState) => {
        prevState.confirmPassword = action.payload;
      });
    case SignupActionType.UPDATE_FULL_NAME:
      return produce(state, (prevState) => {
        prevState.fullname = action.payload;
      });
    case SignupActionType.UPDATE_EMAIL:
      return produce(state, (prevState) => {
        prevState.email = action.payload;
      });
    case SignupActionType.UPDATE_PHONE_NUMBER:
      return produce(state, (prevState) => {
        prevState.phoneNumber = action.payload;
      });
    case SignupActionType.UPDATE_VALIDATE_SIGNUP:
      return produce(state, (prevState) => {
        prevState.validateObj.errors = action.payload;
      });
    default:
      return state;
  }
};

export default loginReducer;
