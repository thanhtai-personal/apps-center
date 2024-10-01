import initialState, { ProductState } from "./initialState";
import ProductActionType from "src/actionTypes/product.actionsType";
import produce from "immer";

const categoryReducer = (state: ProductState = initialState, action: any) => {
  switch (action.type) {
    case ProductActionType.UPDATE_LOADING_PRODUCT:
      return produce(state, (prevState) => {
        prevState.loading = action.payload;
      });
    case ProductActionType.UPDATE_PRODUCT_DATA:
      return produce(state, (prevState) => {
        prevState[action.payload.key] = action.payload.value;
      });
    case ProductActionType.UPDATE_VALIDATE_PRODUCT:
      return produce(state, (prevState) => {
        prevState.validateObj.errors = action.payload;
      });
    case ProductActionType.UPDATE_PRODUCT_DETAIL:
      return produce(state, (prevState) => {
        prevState.name = action.payload.name;
        prevState.quantity = action.payload.quantity;
        prevState.sold = action.payload.sold;
        prevState.remain = action.payload.remain;
        prevState.rating = action.payload.rating;
        prevState.price = action.payload.price;
        prevState.categories = action.payload.categories;
        prevState.images = action.payload.imagesDataList;
        prevState.description = action.payload.description;
        prevState.branch = action.payload.branch;
        prevState.sku = action.payload.sku;
        prevState.model = action.payload.model;
        prevState.engine = action.payload.engine;
        prevState.original = action.payload.original;
        prevState.warranty_time = action.payload.warranty_time;
        prevState.thumb = action.payload.thumb;
        prevState.short_description = action.payload.short_description;
        prevState.gifts = action.payload.giftsDataList;
        prevState.videos = action.payload.videos;
        prevState.giftsDataList = action.payload.giftsDataList;
        prevState.imagesDataList = action.payload.imagesDataList;
        prevState.thumbObj = action.payload.thumbObj;
        prevState.technique = action.payload.technique;
        prevState._id = action.payload._id;
      });
    default:
      return state;
  }
};

export default categoryReducer;
