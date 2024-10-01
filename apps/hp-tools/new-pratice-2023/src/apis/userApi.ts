import { backendHttpClient } from "./httpClient";

export const getUser = async (data) => {
  return await backendHttpClient.get(`/users/test`);
};

export const getAuth = async () => {
  return await backendHttpClient.get(`/users/auth`);
};

export const login = async (data) => {
  return await backendHttpClient.post(`/users/login`, data);
};

export const signup = async (data) => {
  return await backendHttpClient.post(`/users/signup`, data);
};
