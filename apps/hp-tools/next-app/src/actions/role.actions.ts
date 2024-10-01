import RoleActionType from "src/actionTypes/role.actionsType";
import {
  createRole as createRoleApi,
  searchRoles as getRoleApi,
} from "src/apis/role";
import { roleSchema } from "src/screens/Admin/Roles/Create/model.createRole";
import store from "src/store";

export const createRole = async () => {
  store.dispatch({
    type: RoleActionType.UPDATE_LOADING_ROLE,
    payload: true,
  });
  try {
    const roleData = store.getState((state) => state.roles);
    const response = await createRoleApi({
      role: roleData.role,
      parent: roleData.parent,
    });
  } catch (error: any) {}
  store.dispatch({
    type: RoleActionType.UPDATE_LOADING_ROLE,
    payload: false,
  });
};

export const getAllRoles = async () => {
  store.dispatch({
    type: RoleActionType.UPDATE_LOADING_ROLE,
    payload: true,
  });
  try {
    const response = await getRoleApi({});
    store.dispatch({
      type: RoleActionType.UPDATE_LOADING_ROLE,
      payload: false,
    });
    return response;
  } catch (error: any) {
    store.dispatch({
      type: RoleActionType.UPDATE_LOADING_ROLE,
      payload: false,
    });
  }
};

export const updateValidate = () => {
  const { name, parent } = store.getState((state) => state.roles);
  roleSchema
    .validate(
      {
        name,
        parent,
      },
      { abortEarly: false }
    )
    .then((valid) => {
      store.dispatch({
        type: RoleActionType.UPDATE_VALIDATE_ROLE,
        payload: [],
      });
    })
    .catch((err) => {
      store.dispatch({
        type: RoleActionType.UPDATE_VALIDATE_ROLE,
        payload: err.errors,
      });
    });
};

export const updateRoleName = (data: { value: string }) => {
  store.dispatch({
    type: RoleActionType.UPDATE_ROLE_NAME,
    payload: data.value,
  });
  updateValidate();
};

export const updateRoleParent = (data: { value: string }) => {
  store.dispatch({
    type: RoleActionType.UPDATE_ROLE_PARENT,
    payload: data.value,
  });
  updateValidate();
};
