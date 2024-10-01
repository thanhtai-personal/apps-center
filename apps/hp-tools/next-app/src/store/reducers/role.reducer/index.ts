import initialState, { RoleState } from "./initialState";
import RoleActionType from "src/actionTypes/role.actionsType";
import produce from "immer";

const categoryReducer = (state: RoleState = initialState, action: any) => {
  switch (action.type) {
    case RoleActionType.UPDATE_LOADING_ROLE:
      return produce(state, (prevState) => {
        prevState.loading = action.payload;
      });
    case RoleActionType.UPDATE_ROLE_NAME:
      return produce(state, (prevState) => {
        prevState.name = action.payload;
      });
    case RoleActionType.UPDATE_VALIDATE_ROLE:
      return produce(state, (prevState) => {
        prevState.validateObj.errors = action.payload;
      });
    default:
      return state;
  }
};

export default categoryReducer;
