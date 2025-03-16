import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { LoginPayload } from '@/queries/Auth/types';
import { API_URLS } from '../keys';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';

const useApi = (baseURL = API_URLS.IDENTITY) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const authenticate = (payload: LoginPayload) => {
    return publicApi.post('/api/v1/auth/token', payload);
  };

  const getUserInfo = () => {
    return privateApi.get('/api/v1/users/me');
  };

  const getRefreshToken = () => {
    return publicApi.post('/api/v1/auth/refresh');
  };

  const getStudentProfileById = (userId: string) => {
    return privateApi.get(`/api/v1/users/students/profile/${userId}`);
  };
  const getProfileByUserId = (userId: string) => {
    return privateApi.get(`/api/v1/users/admins/profile/${userId}`);
  };

  return {
    getProfileByUserId,
    getStudentProfileById,
    authenticate,
    getUserInfo,
    getRefreshToken,
  };
};

export default useApi;
