import { NotiStackInstance } from "pages/_app";
import ImageActionsType from "src/actionTypes/image.actionsType";
import {
  searchImages as searchImagesApi,
  createImage as createImageApi,
} from "src/apis/image";
import store from "src/store";

export const searchImages = async (customFilter = {}) => {
  const { filter = {} } = store.getState((state) => state.images);
  store.dispatch({
    type: ImageActionsType.UPDATE_LOADING_IMAGES,
    payload: true,
  });
  try {
    const response = await searchImagesApi({
      ...filter,
      ...customFilter,
    });
    store.dispatch({
      type: ImageActionsType.UPDATE_LOADING_IMAGES,
      payload: false,
    });
    store.dispatch({
      type: ImageActionsType.UPDATE_IMAGES,
      payload: response.data?.data,
    });
    return response;
  } catch (error: any) {
    store.dispatch({
      type: ImageActionsType.UPDATE_LOADING_IMAGES,
      payload: false,
    });
  }
};

export const createImage = async (data: any, callback?: Function) => {
  store.dispatch({
    type: ImageActionsType.UPDATE_LOADING_IMAGES,
    payload: true,
  });
  try {
    const response = await createImageApi(data);
    store.dispatch({
      type: ImageActionsType.UPDATE_LOADING_IMAGES,
      payload: false,
    });
    NotiStackInstance.push({
      children: "Upload images success",
      variant: "success",
    });
    callback && callback(response.data);
    return response.data;
  } catch (error: any) {
    NotiStackInstance.push({
      children: error.message || "Upload images failed",
      variant: "error",
    });
    store.dispatch({
      type: ImageActionsType.UPDATE_LOADING_IMAGES,
      payload: false,
    });
  }
};

export const selectImage = (image) => {
  const { searchImages = [] } = store.getState((state) => state.images);
  store.dispatch({
    type: ImageActionsType.UPDATE_SELECTED_IMAGE,
    payload: {
      searchImages: searchImages.filter((item) => item._id !== image._id),
    },
  });
};

export const unselectImage = (image) => {
  const { selectedImages = [], searchImages = [] } = store.getState(
    (state) => state.images
  );
  store.dispatch({
    type: ImageActionsType.UPDATE_SELECTED_IMAGE,
    payload: {
      searchImages: [image, ...searchImages],
      selectedImages: selectedImages.filter((item) => item._id !== image._id),
    },
  });
};

export const updateFilterImages = (filter) => {
  store.dispatch({
    type: ImageActionsType.UPDATE_FILTER_IMAGES,
    payload: filter,
  });
};
