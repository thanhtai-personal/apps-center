import { backendHttpClient } from "./httpClient";

export const getUser = async (data) => {
  return await backendHttpClient.get(`/api/hello`);
};

export const getAuth = async () => {
  return await backendHttpClient.get(`/api/auth`);
};

export const login = async (data) => {
  return await backendHttpClient.post(`/api/login`, data);
};

export const signup = async (data) => {
  return await backendHttpClient.post(`/api/signup`, data);
};
