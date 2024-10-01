import { backendHttpClient } from "./httpClient";

export const createUIconfig = async (data) => {
  return await backendHttpClient.post(`/api/uiconfig/create`, data);
};

export const searchUIconfigs = async (data) => {
  return await backendHttpClient.post(`/api/uiconfig/search`, data);
};

export const updateUIconfig = async (data) => {
  return await backendHttpClient.post(`/api/uiconfig/update`, data);
};
