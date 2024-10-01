import { backendHttpClient } from "./httpClient";

export const createOrder = async (data) => {
  return await backendHttpClient.post(`/api/orders/create`, data);
};

export const searchOrders = async (data) => {
  return await backendHttpClient.post(`/api/orders/search`, data);
};

export const updateOrder = async (data) => {
  return await backendHttpClient.post(`/api/orders/update`, data);
};
