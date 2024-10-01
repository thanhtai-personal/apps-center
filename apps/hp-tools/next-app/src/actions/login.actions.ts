import AuthActionsType from "src/actionTypes/auth.actionsType";
import LoginActionType from "src/actionTypes/login.actionsType";
import { login as loginApi } from "src/apis/auth";
import { loginSchema } from "src/models/model.login";
import store from "src/store";
import { NotiStackInstance } from "pages/_app";
import { backendHttpClient } from "src/apis/httpClient";

export const login = async () => {
  store.dispatch({
    type: LoginActionType.UPDATE_LOADING_LOGIN,
    payload: true,
  });
  try {
    const { login } = store.getState();
    const response = await loginApi({
      username: login.username,
      password: login.password,
    });
    store.dispatch({
      type: AuthActionsType.UPDATE_AUTHEN_DATA,
      payload: response.data,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refresh_token", response.data.refreshToken);
    backendHttpClient.setBearerToken(response.data.token);
    NotiStackInstance.push({
      children: "Login success",
      variant: "success",
    });
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.message || "Login failed",
      variant: "error",
    });
  } finally {
    store.dispatch({
      type: LoginActionType.UPDATE_LOADING_LOGIN,
      payload: false,
    });
  }
};

export const logout = async () => {
  try {
    localStorage.clear();
  } catch (error: any) {}
};

export const updateValidate = () => {
  const { username, password } = store.getState((state) => state.login);
  loginSchema
    .validate(
      {
        username,
        password,
      },
      { abortEarly: false }
    )
    .then((valid) => {
      store.dispatch({
        type: LoginActionType.UPDATE_VALIDATE_LOGIN,
        payload: [],
      });
    })
    .catch((err) => {
      store.dispatch({
        type: LoginActionType.UPDATE_VALIDATE_LOGIN,
        payload: err.errors,
      });
    });
};

export const updateUsername = (data: { value: string }) => {
  store.dispatch({
    type: LoginActionType.UPDATE_LOGIN_USER_NAME,
    payload: data.value,
  });
  updateValidate();
};

export const updatePassword = (data: { value: string }) => {
  store.dispatch({
    type: LoginActionType.UPDATE_LOGIN_PASSWORD,
    payload: data.value,
  });
  updateValidate();
};
