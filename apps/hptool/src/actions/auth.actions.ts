import { NotiStackInstance } from "pages/_app";
import AuthActionsType from "src/actionTypes/auth.actionsType";
import { getAuth, refreshToken } from "src/apis/auth";
import { backendHttpClient } from "src/apis/httpClient";
import store from "src/store";

export const getAuthData = async (router) => {
  store.dispatch({
    type: AuthActionsType.UPDATE_LOADING_AUTHEN,
    payload: true,
  });
  try {
    backendHttpClient.setBearerToken(localStorage.getItem("token"));
    const response = await getAuth();
    if (response.data) {
      localStorage.setItem("token", response.data.token);
      backendHttpClient.setBearerToken(response.data.token);
      store.dispatch({
        type: AuthActionsType.UPDATE_AUTHEN_DATA,
        payload: response.data.user,
      });
    }
  } catch (error: any) {
    if (
      error.data?.message === "token expired" ||
      error.data?.message === "jwt expired"
    ) {
      try {
        const response: any = await refreshToken();
        if (response.data) {
          localStorage.setItem("token", response.data.token);
          backendHttpClient.setBearerToken(response.data.token);
          store.dispatch({
            type: AuthActionsType.UPDATE_AUTHEN_DATA,
            payload: response.data.user,
          });
        }
      } catch (err) {
        NotiStackInstance.push({
          children: err.data?.message || "refresh token failed!",
          variant: "error",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
      }
    } else {
      // NotiStackInstance.push({
      //   children: error.message || "Get authen data failed!",
      //   variant: "error",
      // });
    }
  }
  store.dispatch({
    type: AuthActionsType.UPDATE_LOADING_AUTHEN,
    payload: false,
  });
};
