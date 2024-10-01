import { backendHttpClient } from "./httpClient";

export const createRole = async (data) => {
  return await backendHttpClient.post(`/api/roles/create`, data);
};

export const searchRoles = async (data) => {
  return await backendHttpClient.post(`/api/roles/search`, data);
};

export const updateRole = async (data) => {
  return await backendHttpClient.post(`/api/roles/update`, data);
};
