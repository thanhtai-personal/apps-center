import { backendHttpClient } from "./httpClient";

export const createImage = async (data) => {
  return await backendHttpClient.post(`/api/images/create`, data);
};

export const searchImages = async (data) => {
  return await backendHttpClient.post(`/api/images/search`, data);
};

export const updateImage = async (data) => {
  return await backendHttpClient.post(`/api/images/update`, data);
};
