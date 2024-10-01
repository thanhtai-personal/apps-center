import initialState, { UserState } from "./initialState";
import UserActionType from "src/actionTypes/user.actionsType";
import produce from "immer";

const categoryReducer = (state: UserState = initialState, action: any) => {
  switch (action.type) {
    case UserActionType.UPDATE_LOADING_USER:
      return produce(state, (prevState) => {
        prevState.loading = action.payload;
      });
    case UserActionType.UPDATE_USER_NAME:
      return produce(state, (prevState) => {
        prevState.name = action.payload;
      });
    case UserActionType.UPDATE_USER_PARENT:
      return produce(state, (prevState) => {
        prevState.parentUser = action.payload;
      });
    case UserActionType.UPDATE_VALIDATE_USER:
      return produce(state, (prevState) => {
        prevState.validateObj.errors = action.payload;
      });
    default:
      return state;
  }
};

export default categoryReducer;
