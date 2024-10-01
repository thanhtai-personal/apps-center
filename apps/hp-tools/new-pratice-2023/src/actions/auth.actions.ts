import AuthActionsType from "actionTypes/auth.actionsType";
import { getAuth } from "apis/userApi";
import { NotiStackInstance } from "App";
import store from "store";

export const getAuthData = async () => {
  store.dispatch({
    type: AuthActionsType.UPDATE_LOADING_AUTHEN,
    payload: true,
  });
  try {
    const response = await getAuth();
    store.dispatch({
      type: AuthActionsType.UPDATE_AUTHEN_DATA,
      payload: response.data,
    });
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.message || "Get authen data failed!",
      variant: "error",
    });
  }
  store.dispatch({
    type: AuthActionsType.UPDATE_LOADING_AUTHEN,
    payload: false,
  });
};
