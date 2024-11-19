import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { LoginPayload } from '@/queries/Auth/types';
import { API_URLS } from '../keys';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';

const useApi = (baseURL = API_URLS._IDENTITY) => {
  
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const authenticate = async (payload: LoginPayload) => {
    try {
      const response = await publicApi.post('/api/v1/auth/token', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  };

  const getUserInfo = () => {
    return privateApi.get('/api/v1/users/myInfo');
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
