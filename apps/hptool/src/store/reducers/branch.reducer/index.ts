import initialState, { BranchState } from "./initialState";
import BranchActionType from "src/actionTypes/branch.actionsType";
import produce from "immer";

const branchReducer = (state: BranchState = initialState, action: any) => {
  switch (action.type) {
    case BranchActionType.UPDATE_LOADING_BRANCH:
      return produce(state, (prevState) => {
        prevState.loading = action.payload;
      });
    case BranchActionType.UPDATE_BRANCH_DATA:
      return produce(state, (prevState) => {
        prevState[action.payload.name] = action.payload.value;
      });
    case BranchActionType.UPDATE_BRANCH_DESCRIPTION:
      return produce(state, (prevState) => {
        prevState.description = action.payload;
      });
    case BranchActionType.UPDATE_VALIDATE_BRANCH:
      return produce(state, (prevState) => {
        prevState.validateObj.errors = action.payload;
      });
    case BranchActionType.UPDATE_BRANCHS:
      return produce(state, (prevState) => {
        prevState.branchs = action.payload;
      });
    case BranchActionType.UPDATE_DETAIL_BRANCH:
      return produce(state, (prevState) => {
        Object.keys(action.payload).forEach((key) => {
          prevState[key] = action.payload[key];
        });
      });
    case BranchActionType.UPDATE_SEARCH_ID:
      return produce(state, (prevState) => {
        prevState.searchId = action.payload;
      });
    default:
      return state;
  }
};

export default branchReducer;
