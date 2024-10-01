import { backendHttpClient } from "./httpClient";

export const createProduct = async ({ _id, ...data }) => {
  return await backendHttpClient.post(`/api/products/create`, data);
};

export const searchProducts = async (data) => {
  return await backendHttpClient.post(`/api/products/search`, data);
};

export const updateProduct = async (data) => {
  return await backendHttpClient.post(`/api/products/update`, data);
};

export const deleteProduct = async (id) => {
  return await backendHttpClient.post(`/api/products/delete`, { id });
};

export const deleteProducts = async (ids) => {
  return await backendHttpClient.post(`/api/products/batchdelete`, { ids });
};

export const getDetailProduct = async (id) => {
  return await backendHttpClient.post(`/api/products/detail`, { id });
};

export const replaceProductContent = async (data) => {
  return await backendHttpClient.post("/api/products/batchupdate", data);
};
