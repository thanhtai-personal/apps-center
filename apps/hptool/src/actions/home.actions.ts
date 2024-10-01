import { NotiStackInstance } from "pages/_app";
import UIconfigActionType from "src/actionTypes/home.actionsType";
import {
  createUIconfig as createUIconfigApi,
  searchUIconfigs as searchUIconfigsApi,
  updateUIconfig,
} from "src/apis/uiconfig";
import store from "src/store";

export const createUIconfig = async () => {
  try {
    const homeData = store.getState((state) => state.home);
    const response = await (homeData._id ? updateUIconfig : createUIconfigApi)({
      name: homeData.name || "home", // screen name
      slider_images: (homeData.sliderImagesDataList || []).map(
        (img) => img._id
      ),
      branchs: homeData.branchsDataList.map((item) => item.id),
      categories: homeData.categoriesDataList.map((item) => item.id),
      showing_categories: homeData.showing_categoriesDataList.map(
        (item) => item.id
      ),
      app_logo: homeData.appLogoObj?._id,
      hot_line: homeData.hot_line,
      email: homeData.email,
      address: homeData.address,
      welcome_text: homeData.welcome_text,
      is_active: true,
      _id: homeData._id,
    });
    NotiStackInstance.push({
      children: "update uiconfig success",
      variant: "success",
    });
  } catch (error: any) {
    NotiStackInstance.push({
      children: "update uiconfig failed",
      variant: "error",
    });
  }
};

export const searchUIconfigs = async (filter) => {
  store.dispatch({
    type: UIconfigActionType.UPDATE_LOADING_UICONFIG,
    payload: true,
  });
  try {
    const response = await searchUIconfigsApi({
      ...filter,
    });
    store.dispatch({
      type: UIconfigActionType.UPDATE_LOADING_UICONFIG,
      payload: false,
    });
    store.dispatch({
      type: UIconfigActionType.UPDATE_HOME_PAGE_CONFIG,
      payload: response.data?.data ? response.data.data[0] : {},
    });
    return response;
  } catch (error: any) {
    store.dispatch({
      type: UIconfigActionType.UPDATE_LOADING_UICONFIG,
      payload: false,
    });
  }
};

export const updateUIconfigData = (data: { name: string; value: any }) => {
  store.dispatch({
    type: UIconfigActionType.UPDATE_UICONFIG_DATA,
    payload: data,
  });
};

export const updateBranchs = (data: { name: string; value: any }) => {
  const listBranchs = store.getState((state) => state.branchs?.branchs || []);
  store.dispatch({
    type: UIconfigActionType.UPDATE_UICONFIG_DATA,
    payload: data,
  });
  store.dispatch({
    type: UIconfigActionType.UPDATE_UICONFIG_DATA,
    payload: {
      name: "branchsDataList",
      value: listBranchs.filter((item) =>
        (data.value || []).includes(item._id)
      ),
    },
  });
};
