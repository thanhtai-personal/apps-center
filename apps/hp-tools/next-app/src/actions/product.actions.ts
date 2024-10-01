import ProductActionType from "src/actionTypes/product.actionsType";
import ImageActionsType from "src/actionTypes/image.actionsType";
import {
  createProduct as createProductApi,
  searchProducts as searchProductsApi,
  deleteProduct as deleteProductApi,
  deleteProducts as deleteProductsApi,
  updateProduct as updateProductApi,
  getDetailProduct as getDetailProductApi,
} from "src/apis/product";
import { productSchema } from "src/screens/Admin/Products/model.product";
import store from "src/store";
import { NotiStackInstance } from "pages/_app";

export const deleteProduct = async (id?: string) => {
  store.dispatch({
    type: ProductActionType.UPDATE_LOADING_PRODUCT,
    payload: true,
  });
  try {
    const productData = store.getState((state) => state.products);
    const response = await deleteProductApi(id || productData.searchId);
    NotiStackInstance.push({
      children: "Delete product successfully",
      variant: "success",
    });
    await searchProducts();
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.data?.message || "Delete product failed",
      variant: "error",
    });
  }
  store.dispatch({
    type: ProductActionType.UPDATE_LOADING_PRODUCT,
    payload: false,
  });
};

export const deleteProducts = async (ids: Array<string>) => {
  store.dispatch({
    type: ProductActionType.UPDATE_LOADING_PRODUCT,
    payload: true,
  });
  try {
    const productData = store.getState((state) => state.products);
    const response = await deleteProductsApi(ids || productData.selectedIds);
    NotiStackInstance.push({
      children: "Delete products successfully",
      variant: "success",
    });
    await searchProducts();
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.data?.message || "Delete product failed",
      variant: "error",
    });
  }
  store.dispatch({
    type: ProductActionType.UPDATE_LOADING_PRODUCT,
    payload: false,
  });
};

export const createProduct = async () => {
  store.dispatch({
    type: ProductActionType.UPDATE_LOADING_PRODUCT,
    payload: true,
  });
  try {
    const productData = store.getState((state) => state.products);
    const response = await (productData._id
      ? updateProductApi
      : createProductApi)({
      _id: productData._id,
      name: productData.name,
      quantity: productData.quantity,
      sold: productData.sold,
      remain: productData.remain,
      rating: productData.rating,
      price: productData.price,
      categories: productData.categories,
      images: productData.imagesDataList.map((img) => img._id),
      description: window.descriptionEditor
        ? window.descriptionEditor.getHTML()
        : "",
      technique: window.techniqueEditor ? window.techniqueEditor.getHTML() : "",
      branch: productData.branch,
      sku: productData.sku,
      model: productData.model,
      engine: productData.engine,
      original: productData.original,
      warranty_time: productData.warranty_time,
      thumb: productData.thumbObj?._id,
      short_description: productData.short_description,
      gifts: (productData.gifts || []).map((g) => g._id),
      videos: productData.videos,
    });
    NotiStackInstance.push({
      children: "Create product success!",
      variant: "success",
    });
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.message || "Create product failed!",
      variant: "error",
    });
  }
  store.dispatch({
    type: ProductActionType.UPDATE_LOADING_PRODUCT,
    payload: false,
  });
};

export const getDetailProduct = async (id: string) => {
  store.dispatch({
    type: ProductActionType.UPDATE_LOADING_PRODUCT,
    payload: true,
  });
  try {
    const response = await getDetailProductApi(id);
    store.dispatch({
      type: ProductActionType.UPDATE_PRODUCT_DETAIL,
      payload: response.data,
    });
    store.dispatch({
      type: ProductActionType.UPDATE_LOADING_PRODUCT,
      payload: false,
    });
    updateValidate();
    return response;
  } catch (error: any) {
    store.dispatch({
      type: ProductActionType.UPDATE_LOADING_PRODUCT,
      payload: false,
    });
    NotiStackInstance.push({
      children: "Get product detail failed",
      variant: "error",
    });
  }
};

export const searchProducts = async (customFilter = {}) => {
  store.dispatch({
    type: ProductActionType.UPDATE_LOADING_PRODUCT,
    payload: true,
  });
  try {
    const { paging, filter } = store.getState((state) => state.products);
    const dataRequest = {
      page: paging.page,
      rowsPerPage: paging.rowsPerPage,
    };
    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        dataRequest[key] = filter[key];
      }
    });
    Object.keys(customFilter).forEach((key) => {
      if (customFilter[key]) {
        dataRequest[key] = customFilter[key];
      }
    });
    const response = await searchProductsApi(dataRequest);
    store.dispatch({
      type: ProductActionType.UPDATE_PRODUCT_DATA,
      payload: { key: "products", value: response.data.data },
    });
    store.dispatch({
      type: ProductActionType.UPDATE_PRODUCT_DATA,
      payload: {
        key: "paging",
        value: {
          ...paging,
          total: response.data.total,
        },
      },
    });
    store.dispatch({
      type: ProductActionType.UPDATE_LOADING_PRODUCT,
      payload: false,
    });
    return response.data.data;
  } catch (error: any) {
    store.dispatch({
      type: ProductActionType.UPDATE_LOADING_PRODUCT,
      payload: false,
    });
    NotiStackInstance.push({
      children: "Get products failed",
      variant: "error",
    });
  }
};

export const updateValidate = () => {
  const { name, parent } = store.getState((state) => state.products);
  productSchema
    .validate(
      {
        name,
        parent,
      },
      { abortEarly: false }
    )
    .then((valid) => {
      store.dispatch({
        type: ProductActionType.UPDATE_VALIDATE_PRODUCT,
        payload: [],
      });
    })
    .catch((err) => {
      store.dispatch({
        type: ProductActionType.UPDATE_VALIDATE_PRODUCT,
        payload: err.errors,
      });
    });
};

export const updateProductData = (data: { value: any; name: string }) => {
  store.dispatch({
    type: ProductActionType.UPDATE_PRODUCT_DATA,
    payload: { key: data.name, value: data.value },
  });
  updateValidate();
};
