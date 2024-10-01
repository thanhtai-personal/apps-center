import initialState, { OrderState } from "./initialState";
import OrderActionType from "src/actionTypes/order.actionsType";
import produce from "immer";

const categoryReducer = (state: OrderState = initialState, action: any) => {
  switch (action.type) {
    case OrderActionType.UPDATE_LOADING_ORDER:
      return produce(state, (prevState) => {
        prevState.loading = action.payload;
      });
    case OrderActionType.UPDATE_ORDER_NAME:
      return produce(state, (prevState) => {
        prevState.name = action.payload;
      });
    case OrderActionType.UPDATE_VALIDATE_ORDER:
      return produce(state, (prevState) => {
        prevState.validateObj.errors = action.payload;
      });
    default:
      return state;
  }
};

export default categoryReducer;
