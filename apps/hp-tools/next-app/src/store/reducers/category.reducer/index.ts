import initialState, { CategoryState } from "./initialState";
import CategoryActionType from "src/actionTypes/category.actionsType";
import produce from "immer";

const categoryReducer = (state: CategoryState = initialState, action: any) => {
  switch (action.type) {
    case CategoryActionType.UPDATE_LOADING_CATEGORY:
      return produce(state, (prevState) => {
        prevState.loading = action.payload;
      });
    case CategoryActionType.UPDATE_CATEGORY_DATA:
      return produce(state, (prevState) => {
        prevState[action.payload.name] = action.payload.value;
      });
    case CategoryActionType.UPDATE_CATEGORY_PARENT:
      return produce(state, (prevState) => {
        prevState.parent = action.payload;
      });
    case CategoryActionType.UPDATE_VALIDATE_CATEGORY:
      return produce(state, (prevState) => {
        prevState.validateObj.errors = action.payload;
      });
    case CategoryActionType.UPDATE_CATEGORIES:
      return produce(state, (prevState) => {
        prevState.categories = action.payload;
      });
    case CategoryActionType.UPDATE_DETAIL_CATEGORY:
      return produce(state, (prevState) => {
        prevState.detail = action.payload;
        prevState.name = action.payload.name;
        prevState.parent = action.payload.parent;
      });
    case CategoryActionType.UPDATE_SEARCH_ID:
      return produce(state, (prevState) => {
        prevState.searchId = action.payload;
      });
    default:
      return state;
  }
};

export default categoryReducer;
