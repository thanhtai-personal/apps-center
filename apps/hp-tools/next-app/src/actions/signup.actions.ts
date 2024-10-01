import AuthActionsType from "src/actionTypes/auth.actionsType";
import SignupActionTypes from "src/actionTypes/signup.actionsType";
import { signup as signupApi } from "src/apis/userApi";
import store from "src/store";

export const signup = async () => {
  store.dispatch({
    type: SignupActionTypes.UPDATE_LOADING_SIGNUP,
    payload: true,
  });
  try {
    const { login } = store.getState();
    const response = await signupApi({
      username: login.username,
      password: login.password,
    });
    store.dispatch({
      type: AuthActionsType.UPDATE_AUTHEN_DATA,
      payload: response.data,
    });
  } catch (error: any) {}
  store.dispatch({
    type: SignupActionTypes.UPDATE_LOADING_SIGNUP,
    payload: false,
  });
};

export const updateUsername = (data: { value: string }) => {
  store.dispatch({
    type: SignupActionTypes.UPDATE_SIGNUP_USER_NAME,
    payload: data.value,
  });
};

export const updatePassword = (data: { value: string }) => {
  store.dispatch({
    type: SignupActionTypes.UPDATE_SIGNUP_PASSWORD,
    payload: data.value,
  });
};

export const updatePasswordConfirm = (data: { value: string }) => {
  store.dispatch({
    type: SignupActionTypes.UPDATE_SIGNUP_PASSWORD_CONFIRM,
    payload: data.value,
  });
};

export const updateFullName = (data: { value: string }) => {
  store.dispatch({
    type: SignupActionTypes.UPDATE_FULL_NAME,
    payload: data.value,
  });
};

export const updatePhoneNumber = (data: { value: string }) => {
  store.dispatch({
    type: SignupActionTypes.UPDATE_PHONE_NUMBER,
    payload: data.value,
  });
};

export const updateEmail = (data: { value: string }) => {
  store.dispatch({
    type: SignupActionTypes.UPDATE_EMAIL,
    payload: data.value,
  });
};

export const updateValidate = (
  key: string,
  isValidated: boolean,
  error?: any
) => {
  store.dispatch({
    type: SignupActionTypes.UPDATE_VALIDATE_SIGNUP,
    payload: {
      key,
      isValidated,
      error,
    },
  });
};
