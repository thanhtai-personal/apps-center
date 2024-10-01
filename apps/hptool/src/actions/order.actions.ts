import OrderActionType from "src/actionTypes/order.actionsType";
import {
  createOrder as createOrderApi,
  searchOrders as searchOrdersApi,
} from "src/apis/order";
import { orderSchema } from "src/screens/Admin/Orders/Create/model.createOrder";
import store from "src/store";

export const createOrder = async () => {
  store.dispatch({
    type: OrderActionType.UPDATE_LOADING_ORDER,
    payload: true,
  });
  try {
    const orderData = store.getState((state) => state.orders);
    const response = await createOrderApi({
      order: orderData.order,
      parent: orderData.parent,
    });
  } catch (error: any) {}
  store.dispatch({
    type: OrderActionType.UPDATE_LOADING_ORDER,
    payload: false,
  });
};

export const getAllOrders = async () => {
  store.dispatch({
    type: OrderActionType.UPDATE_LOADING_ORDER,
    payload: true,
  });
  try {
    const response = await searchOrdersApi({});
    store.dispatch({
      type: OrderActionType.UPDATE_LOADING_ORDER,
      payload: false,
    });
    return response;
  } catch (error: any) {
    store.dispatch({
      type: OrderActionType.UPDATE_LOADING_ORDER,
      payload: false,
    });
  }
};

export const updateValidate = () => {
  const { name, parent } = store.getState((state) => state.orders);
  orderSchema
    .validate(
      {
        name,
        parent,
      },
      { abortEarly: false }
    )
    .then((valid) => {
      store.dispatch({
        type: OrderActionType.UPDATE_VALIDATE_ORDER,
        payload: [],
      });
    })
    .catch((err) => {
      store.dispatch({
        type: OrderActionType.UPDATE_VALIDATE_ORDER,
        payload: err.errors,
      });
    });
};

export const updateOrderName = (data: { value: string }) => {
  store.dispatch({
    type: OrderActionType.UPDATE_ORDER_NAME,
    payload: data.value,
  });
  updateValidate();
};

export const updateOrderParent = (data: { value: string }) => {
  store.dispatch({
    type: OrderActionType.UPDATE_ORDER_PARENT,
    payload: data.value,
  });
  updateValidate();
};
