import { backendHttpClient } from "./httpClient";

export const createCategory = async (data) => {
  return await backendHttpClient.post(`/api/categories/create`, data);
};

export const searchCategories = async (data) => {
  return await backendHttpClient.post(`/api/categories/search`, data);
};

export const updateCategory = async (data) => {
  return await backendHttpClient.post(`/api/categories/update`, data);
};

export const deleteCategory = async (id) => {
  return await backendHttpClient.post(`/api/categories/delete`, { id });
};

export const getDetailCategory = async (id) => {
  return await backendHttpClient.post(`/api/categories/detail`, { id });
};
