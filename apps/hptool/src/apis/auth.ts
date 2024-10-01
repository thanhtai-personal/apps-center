import { backendHttpClient } from "./httpClient";

export const login = async (data) => {
  return await backendHttpClient.post(`/api/auth/login`, data);
};

export const signup = async (data) => {
  return await backendHttpClient.post(`/api/auth/signup`, data);
};

export const getAuth = async () => {
  return await backendHttpClient.get(`/api/auth/token`);
};

export const refreshToken = async () => {
  return await backendHttpClient.post(`/api/auth/refreshToken`, {
    refreshToken: localStorage.getItem("refresh_token"),
  });
};
