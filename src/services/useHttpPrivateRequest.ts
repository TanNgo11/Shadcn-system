import { useAuthStore } from '@/zustand/auth/useAuthStore';
import axios, { AxiosInstance } from 'axios';

const useHttpPrivateRequest = (baseURL: string): AxiosInstance => {
  const { refreshToken, accessTokenState } = useAuthStore();

  const apiInstance = axios.create({
    baseURL,
  });

  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error;
      const originalRequest = error.config;

      if (response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshToken();

        if (accessTokenState) {
          originalRequest.headers['Authorization'] = `Bearer ${accessTokenState}`;
          return apiInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    },
  );

  return apiInstance;
};

export default useHttpPrivateRequest;
