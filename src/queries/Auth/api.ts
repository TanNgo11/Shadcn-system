/* eslint-disable react-hooks/rules-of-hooks */
import useHttpPrivateRequest from '@/services/useHttpPrivateRequest';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';

const create = (baseURL = 'http://localhost:8080/identity') => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const authenticate = (username: string, password: string) => {
    return publicApi.post('/api/v1/auth/token', { username, password });
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

export type Apis = ReturnType<typeof create>;

export default {
  create,
};
