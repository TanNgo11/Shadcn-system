import { useRefreshToken } from '@/queries/Auth/useRefreshToken';
import axios, { AxiosInstance } from 'axios';

export const useHttpPrivateRequest = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: 30000,
  });

  // Request interceptor to add Authorization header
  apiInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor to handle 401 errors and refresh token
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error;
      const originalRequest = error.config;
      if (response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useRefreshToken({
          onSuccess: (data) => {
            localStorage.setItem('accessToken', data.result.accessToken);
            localStorage.setItem('refreshToken', data.result.refreshToken);
          },
        });
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        return apiInstance(originalRequest);
      }

      return Promise.reject(error);
    },
  );

  return apiInstance;
};
