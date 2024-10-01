import { NotiStackInstance } from "pages/_app";
import BranchActionType from "src/actionTypes/branch.actionsType";
import {
  createBranch as createBranchApi,
  updateBranch as updateBranchApi,
  searchBranchs as searchBranchsApi,
  deleteBranch as deleteBranchApi,
  getDetailBranch as getDetailBranchApi,
} from "src/apis/branch";
import { branchSchema } from "src/screens/Admin/Branchs/model.branch";
import store from "src/store";

export const createBranch = async () => {
  store.dispatch({
    type: BranchActionType.UPDATE_LOADING_BRANCH,
    payload: true,
  });
  try {
    const branchData = store.getState((state) => state.branchs);
    const reqData: any = {
      name: branchData.name,
      description: branchData.description,
      logo: branchData.logo,
      _id: branchData._id,
    };
    const response = await (branchData._id ? updateBranchApi : createBranchApi)(
      reqData
    );
    NotiStackInstance.push({
      children: branchData._id
        ? "Update branch successfully"
        : "Create branch successfully",
      variant: "success",
    });
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.data?.message || "Create branch failed",
      variant: "error",
    });
  }
  store.dispatch({
    type: BranchActionType.UPDATE_LOADING_BRANCH,
    payload: false,
  });
};

export const deleteBranch = async (id?: string) => {
  store.dispatch({
    type: BranchActionType.UPDATE_LOADING_BRANCH,
    payload: true,
  });
  try {
    const branchData = store.getState((state) => state.branchs);
    const response = await deleteBranchApi(id || branchData.searchId);
    NotiStackInstance.push({
      children: "Delete branch successfully",
      variant: "success",
    });
    await searchBranchs({});
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.data?.message || "Delete branch failed",
      variant: "error",
    });
  }
  store.dispatch({
    type: BranchActionType.UPDATE_LOADING_BRANCH,
    payload: false,
  });
};

export const searchBranchs = async (data) => {
  store.dispatch({
    type: BranchActionType.UPDATE_LOADING_BRANCH,
    payload: true,
  });
  try {
    const response = await searchBranchsApi(data);
    const dataRes = (response.data?.data || []).map((item) => ({
      ...item,
      id: item._id,
      _id: item.name,
    }));
    store.dispatch({
      type: BranchActionType.UPDATE_BRANCHS,
      payload: dataRes,
    });
    store.dispatch({
      type: BranchActionType.UPDATE_LOADING_BRANCH,
      payload: false,
    });
    return dataRes;
  } catch (error: any) {
    store.dispatch({
      type: BranchActionType.UPDATE_LOADING_BRANCH,
      payload: false,
    });
  }
};

export const updateValidate = () => {
  const { name, parent } = store.getState((state) => state.branchs);
  branchSchema
    .validate(
      {
        name,
        parent,
      },
      { abortEarly: false }
    )
    .then((valid) => {
      store.dispatch({
        type: BranchActionType.UPDATE_VALIDATE_BRANCH,
        payload: [],
      });
    })
    .catch((err) => {
      store.dispatch({
        type: BranchActionType.UPDATE_VALIDATE_BRANCH,
        payload: err.errors,
      });
    });
};

export const updateBranchData = (data: { name: string; value: any }) => {
  store.dispatch({
    type: BranchActionType.UPDATE_BRANCH_DATA,
    payload: data,
  });
  updateValidate();
};

export const getDetailBranch = async (id?: string) => {
  store.dispatch({
    type: BranchActionType.UPDATE_LOADING_BRANCH,
    payload: true,
  });
  try {
    const branchData = store.getState((state) => state.branchs);
    const response: any = await getDetailBranchApi(id || branchData.searchId);
    store.dispatch({
      type: BranchActionType.UPDATE_DETAIL_BRANCH,
      payload: response.data,
    });
    updateValidate();
    NotiStackInstance.push({
      children: "Get detail branch successfully",
      variant: "success",
    });
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.data?.message || "Get detail branch failed",
      variant: "error",
    });
  }
  store.dispatch({
    type: BranchActionType.UPDATE_LOADING_BRANCH,
    payload: false,
  });
};

export const updateBranchId = (value: string) => {
  store.dispatch({
    type: BranchActionType.UPDATE_SEARCH_ID,
    payload: value,
  });
};

export const revertBranchId = () => {
  const value = store.getState((state) => state.branchs.detail?.id || "");
  store.dispatch({
    type: BranchActionType.UPDATE_SEARCH_ID,
    payload: value,
  });
};
