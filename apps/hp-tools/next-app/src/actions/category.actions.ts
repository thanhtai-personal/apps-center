import { NotiStackInstance } from "pages/_app";
import CategoryActionType from "src/actionTypes/category.actionsType";
import {
  createCategory as createCategoryApi,
  updateCategory as updateCategoryApi,
  searchCategories as searchCategoriesApi,
  deleteCategory as deleteCategoryApi,
  getDetailCategory as getDetailCategoryApi,
} from "src/apis/category";
import { categorySchema } from "src/screens/Admin/Categories/model.category";
import store from "src/store";

export const createOrUpdateCategory = async () => {
  store.dispatch({
    type: CategoryActionType.UPDATE_LOADING_CATEGORY,
    payload: true,
  });
  try {
    const categoryData = store.getState((state) => state.categories);
    const reqData: any = {
      name: categoryData.name,
      level: categoryData.level || 1,
      _id: categoryData.detail?._id,
    };
    if (categoryData.parent) {
      reqData.parent = categoryData.parent;
    }
    const response = await (categoryData.detail?._id
      ? updateCategoryApi
      : createCategoryApi)(reqData);
    NotiStackInstance.push({
      children: categoryData.detail?._id
        ? "Update category successfully"
        : "Create category successfully",
      variant: "success",
    });
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.data?.message || "Create category failed",
      variant: "error",
    });
  }
  store.dispatch({
    type: CategoryActionType.UPDATE_LOADING_CATEGORY,
    payload: false,
  });
};

export const deleteCategory = async (id?: string) => {
  store.dispatch({
    type: CategoryActionType.UPDATE_LOADING_CATEGORY,
    payload: true,
  });
  try {
    const categoryData = store.getState((state) => state.categories);
    const response = await deleteCategoryApi(id || categoryData.searchId);
    NotiStackInstance.push({
      children: "Delete category successfully",
      variant: "success",
    });
    await searchCategories({});
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.data?.message || "Delete category failed",
      variant: "error",
    });
  }
  store.dispatch({
    type: CategoryActionType.UPDATE_LOADING_CATEGORY,
    payload: false,
  });
};

export const searchCategories = async (data) => {
  store.dispatch({
    type: CategoryActionType.UPDATE_LOADING_CATEGORY,
    payload: true,
  });
  try {
    const response = await searchCategoriesApi(data);
    const dataRes = (response.data?.data || []).map((item) => ({
      id: item._id,
      _id: item.name,
      name: item.name,
      parent: item.parent,
      level: item.level || 0,
    }));
    store.dispatch({
      type: CategoryActionType.UPDATE_CATEGORIES,
      payload: dataRes,
    });
    store.dispatch({
      type: CategoryActionType.UPDATE_LOADING_CATEGORY,
      payload: false,
    });
    return dataRes;
  } catch (error: any) {
    store.dispatch({
      type: CategoryActionType.UPDATE_LOADING_CATEGORY,
      payload: false,
    });
  }
};

export const AdminSearchCategories = async (data) => {
  store.dispatch({
    type: CategoryActionType.UPDATE_LOADING_CATEGORY,
    payload: true,
  });
  try {
    const response = await searchCategoriesApi(data);
    const dataRes = (response.data?.data || []).map((item) => ({
      _id: item._id,
      name: item.name,
      parent: item.parent,
    }));
    store.dispatch({
      type: CategoryActionType.UPDATE_CATEGORIES,
      payload: dataRes,
    });
    store.dispatch({
      type: CategoryActionType.UPDATE_LOADING_CATEGORY,
      payload: false,
    });
    return dataRes;
  } catch (error: any) {
    store.dispatch({
      type: CategoryActionType.UPDATE_LOADING_CATEGORY,
      payload: false,
    });
  }
};

export const updateValidate = () => {
  const { name, parent } = store.getState((state) => state.categories);
  categorySchema
    .validate(
      {
        name,
        parent,
      },
      { abortEarly: false }
    )
    .then((valid) => {
      store.dispatch({
        type: CategoryActionType.UPDATE_VALIDATE_CATEGORY,
        payload: [],
      });
    })
    .catch((err) => {
      store.dispatch({
        type: CategoryActionType.UPDATE_VALIDATE_CATEGORY,
        payload: err.errors,
      });
    });
};

export const updateCategoryData = (data: { name: string; value: any }) => {
  store.dispatch({
    type: CategoryActionType.UPDATE_CATEGORY_DATA,
    payload: data,
  });
  updateValidate();
};

export const getDetailCategory = async (id?: string) => {
  store.dispatch({
    type: CategoryActionType.UPDATE_LOADING_CATEGORY,
    payload: true,
  });
  try {
    const categoryData = store.getState((state) => state.categories);
    const response: any = await getDetailCategoryApi(
      id || categoryData.searchId
    );
    store.dispatch({
      type: CategoryActionType.UPDATE_DETAIL_CATEGORY,
      payload: response.data,
    });
    NotiStackInstance.push({
      children: "Get detail category successfully",
      variant: "success",
    });
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.data?.message || "Get detail category failed",
      variant: "error",
    });
  }
  store.dispatch({
    type: CategoryActionType.UPDATE_LOADING_CATEGORY,
    payload: false,
  });
  updateValidate();
};

export const updateCategoryId = (value: string) => {
  store.dispatch({
    type: CategoryActionType.UPDATE_SEARCH_ID,
    payload: value,
  });
};

export const revertCategoryId = () => {
  const value = store.getState((state) => state.categories.detail?.id || "");
  store.dispatch({
    type: CategoryActionType.UPDATE_SEARCH_ID,
    payload: value,
  });
};
