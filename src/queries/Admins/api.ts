import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { CRUAdminPayload } from './types';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';
import { API_URLS } from '../keys';

const useApi = (baseURL = API_URLS.IDENTITY) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);
  const adminPrivateApi = useHttpPrivateRequest(API_URLS.PROFILE);

  const createAdmin = (payload: CRUAdminPayload) => {
    return privateApi.post('/api/v1/users/admin/registration', payload);
  };
  const updateAdmin = (id: number, payload: CRUAdminPayload) => {
    return adminPrivateApi.put(`/api/v1/users/admin/${id}`, payload);
  };
  const getAdminsList = (params: GetPropertiesParams) => {
    return adminPrivateApi.get(`/api/v1/users/admin?${stringify(params)} `);
  };

  const getAdminById = (adminId: string) => {
    return adminPrivateApi.get(`/api/v1/users/admin/${adminId}`);
  };
  const updateStatusAdminByListId = (ids: number[], status: string) => {
    return privateApi.patch(`/api/v1/users/admins/status`, { ids, status });
  };
  return {
    getAdminById,
    createAdmin,
    getAdminsList,
    updateAdmin,
    updateStatusAdminByListId,
  };
};

export default useApi;
