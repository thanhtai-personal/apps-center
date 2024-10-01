import { backendHttpClient } from "./httpClient";

export const createUser = async (data) => {
  return await backendHttpClient.post(`/api/users/create`, data);
};

export const searchUsers = async (data) => {
  return await backendHttpClient.post(`/api/users/search`, data);
};

export const updateUser = async (data) => {
  return await backendHttpClient.post(`/api/users/update`, data);
};
