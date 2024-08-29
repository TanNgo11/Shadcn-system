import axios, { AxiosInstance } from 'axios';

const useHttpPublicRequest = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
  });

  return apiInstance;
};

export default useHttpPublicRequest;
