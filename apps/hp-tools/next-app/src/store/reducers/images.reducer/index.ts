import produce from "immer";
import ImageActionTypes from "src/actionTypes/image.actionsType";
import initialState, { ImagesState } from "./initialState";

const imagesReducer = (state: ImagesState = initialState, action) => {
  switch (action.type) {
    case ImageActionTypes.UPDATE_IMAGES:
      return produce(state, (prevState) => {
        prevState.searchImages = action.payload;
      });
    case ImageActionTypes.UPDATE_SELECTED_IMAGE:
      return produce(state, (prevState) => {
        prevState.searchImages = action.payload.searchImages;
      });
    case ImageActionTypes.UPDATE_FILTER_IMAGES:
      return produce(state, (prevState) => {
        prevState.filter = action.payload;
      });
    default:
      return state;
  }
};

export default imagesReducer;
