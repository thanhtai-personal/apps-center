import { backendHttpClient } from "./httpClient";

export const createBranch = async (data) => {
  return await backendHttpClient.post(`/api/branchs/create`, data);
};

export const searchBranchs = async (data) => {
  return await backendHttpClient.post(`/api/branchs/search`, data);
};

export const updateBranch = async (data) => {
  return await backendHttpClient.post(`/api/branchs/update`, data);
};

export const deleteBranch = async (id) => {
  return await backendHttpClient.post(`/api/branchs/delete`, { id });
};

export const getDetailBranch = async (id) => {
  return await backendHttpClient.post(`/api/branchs/detail`, { id });
};
