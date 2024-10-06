import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { LoginPayload } from '@/queries/Auth/types';

const useApi = (baseURL = 'http://localhost:8080/identity') => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const authenticate = (payload: LoginPayload) => {
    return publicApi.post('/api/v1/auth/token', payload);
  };

  const getUserInfo = () => {
    return privateApi.get('/api/v1/myInfo');
  };

  const getRefreshToken = () => {
    return publicApi.post('/api/v1/auth/refresh');
  };

  return {
    authenticate,
    getUserInfo,
    getRefreshToken,
  };
};

export default useApi;
