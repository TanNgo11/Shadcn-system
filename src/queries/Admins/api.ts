import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { CreateAdminPayload } from './types';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';
import { API_URLS } from '../keys';

const useApi = (baseURL = API_URLS.IDENTITY) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);
  const adminPrivateApi = useHttpPrivateRequest(API_URLS.PROFILE);

  const createAdmin = (payload: CreateAdminPayload) => {
    return publicApi.post('/api/v1/users/admin/registration', payload);
  };

  const getAdminsList = (params: GetPropertiesParams) => {
    return adminPrivateApi.get(`/api/v1/users/admin?${stringify(params)} `);
  };

  const getAdminById = (adminId: string) => {
    return adminPrivateApi.get(`/api/v1/users/admin/${adminId}`);
  };

  return {
    getAdminById,
    createAdmin,
    getAdminsList,
  };
};

export default useApi;
