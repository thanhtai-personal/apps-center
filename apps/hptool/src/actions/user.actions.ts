import UserActionType from "src/actionTypes/user.actionsType";
import {
  createUser as createUserApi,
  searchUsers as getUserApi,
} from "src/apis/user";
import { userSchema } from "src/screens/Admin/Users/Create/model.createUser";
import store from "src/store";

export const createUser = async () => {
  store.dispatch({
    type: UserActionType.UPDATE_LOADING_USER,
    payload: true,
  });
  try {
    const userData = store.getState((state) => state.users);
    const response = await createUserApi({
      user: userData.user,
      parent: userData.parent,
    });
  } catch (error: any) {}
  store.dispatch({
    type: UserActionType.UPDATE_LOADING_USER,
    payload: false,
  });
};

export const getAllUsers = async () => {
  store.dispatch({
    type: UserActionType.UPDATE_LOADING_USER,
    payload: true,
  });
  try {
    const response = await getUserApi({});
    store.dispatch({
      type: UserActionType.UPDATE_LOADING_USER,
      payload: false,
    });
    return response;
  } catch (error: any) {
    store.dispatch({
      type: UserActionType.UPDATE_LOADING_USER,
      payload: false,
    });
  }
};

export const updateValidate = () => {
  const { name, parent } = store.getState((state) => state.users);
  userSchema
    .validate(
      {
        name,
        parent,
      },
      { abortEarly: false }
    )
    .then((valid) => {
      store.dispatch({
        type: UserActionType.UPDATE_VALIDATE_USER,
        payload: [],
      });
    })
    .catch((err) => {
      store.dispatch({
        type: UserActionType.UPDATE_VALIDATE_USER,
        payload: err.errors,
      });
    });
};

export const updateUserName = (data: { value: string }) => {
  store.dispatch({
    type: UserActionType.UPDATE_USER_NAME,
    payload: data.value,
  });
  updateValidate();
};

export const updateUserParent = (data: { value: string }) => {
  store.dispatch({
    type: UserActionType.UPDATE_USER_PARENT,
    payload: data.value,
  });
  updateValidate();
};
