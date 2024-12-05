import { message } from 'antd';
import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

import { getAccessTokenInfo, handleExpire } from 'src/util';
import { TOKEN_KEY } from '../constants/storage';

const DEFAULT_ERROR_MESSAGE = 'Có lỗi xảy ra. Vui lòng thử lại sau!';

let isRefreshing = false; // Flag to indicate if a token refresh is in progress
let refreshSubscribers: ((token: string) => void)[] = []; // Queue to hold subscribers waiting for token refresh

// Notify all subscribers once the token is refreshed
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Handle refresh token logic
const handleRefreshToken = async () => {
  const { refreshToken } = getAccessTokenInfo();

  if (!refreshToken) {
    handleExpire();
    return null;
  }

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_GW_URL}/auth/refresh-token`, {
      token: refreshToken,
    });

    if (res.status === 200) {
      const { accessToken, refreshToken: newRefreshToken } = res.data;
      if (!accessToken || !newRefreshToken) {
        handleExpire();
        return null;
      }
      localStorage.setItem(TOKEN_KEY, JSON.stringify(res.data));
      onRefreshed(accessToken); // Notify subscribers
      return `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.error('Token refresh failed', error);
    handleExpire();
    return null;
  } finally {
    isRefreshing = false; // Reset the refreshing flag
  }
};

// Add interceptors to Axios instance
const applyInterceptors = (axiosInstance: AxiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      //handle stop call api when refreshing token and add to subcriber to call after refreshed token
      if (isRefreshing) {
        // Queue the request and resolve it once the token is refreshed
        return new Promise((resolve) => {
          refreshSubscribers.push((token: string) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(config);
          });
        });
      }

      const { accessToken } = getAccessTokenInfo();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      let errorMsg = DEFAULT_ERROR_MESSAGE;

      if (error?.response?.status) {
        switch (error.response.status) {
          case 400:
            errorMsg = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra và thử lại.';
            break;
          case 401:
            errorMsg = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
            break;
          case 403:
            errorMsg = 'Bạn không có quyền thực hiện thao tác này.';
            break;
          case 404:
            errorMsg = 'Không tìm thấy tài nguyên yêu cầu.';
            break;
          case 500:
            errorMsg = 'Có lỗi xảy ra trên hệ thống. Vui lòng thử lại sau.';
            break;
          default:
            errorMsg = DEFAULT_ERROR_MESSAGE;
            break;
        }
      }

      if (error.response?.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newAccessToken = await handleRefreshToken();

            if (newAccessToken) {
              error.config.headers.Authorization = newAccessToken;
              return axiosInstance(error.config);
            }
          } catch (refreshError) {
            console.error('Token refresh failed. Logging out the user.', refreshError);
            handleExpire();
          }
        } else {
          // Queue requests while refreshing
          return new Promise((resolve) => {
            refreshSubscribers.push((token: string) => {
              error.config.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(error.config));
            });
          });
        }
      }

      message.error(errorMsg);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Axios instances
export const axiosCMSInstance = applyInterceptors(
  axios.create({
    baseURL: `${process.env.REACT_APP_API_GW_URL}/cms`,
    headers: {
      'content-type': 'application/json',
    },
  })
);

export const axiosTTOLInstance = applyInterceptors(
  axios.create({
    baseURL: `${process.env.REACT_APP_API_GW_URL}/ttol`,
    headers: {
      'content-type': 'application/json',
    },
  })
);

export const axiosDocServiceInstance = applyInterceptors(
  axios.create({
    baseURL: `${process.env.REACT_APP_KAPI_URL}/documents-service`,
    headers: {
      'content-type': 'application/json',
    },
  })
);

export const apigwHttpClient: AxiosInstance = applyInterceptors(
  axios.create({
    baseURL: `${process.env.REACT_APP_API_GW_URL}`,
    headers: {
      'content-type': 'application/json',
    },
  })
);

export const kapiHttpClient: AxiosInstance = applyInterceptors(
  axios.create({
    baseURL: `${process.env.REACT_APP_KAPI_URL}`,
    headers: {
      'content-type': 'application/json',
    },
  })
);

const axiosInstance: AxiosInstance = applyInterceptors(
  axios.create({
    baseURL: `${process.env.REACT_APP_KAPI_URL}/econtract-service`,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
);

export default axiosInstance;
