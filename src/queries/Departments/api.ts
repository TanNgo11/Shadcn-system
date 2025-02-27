import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { API_URLS } from '../keys';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';

const useApi = (baseURL = API_URLS.COURSE) => {
  const privateApi = useHttpPrivateRequest(baseURL);

  const getDepartmentList = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/departments?${stringify(params)}`);
  };

  // This is no api endpoint
  const getDepartmentById = (id: string) => {
    return privateApi.get(`/api/v1/departments/${id}`);
  };

  const getCoursesInDepartment = (id: string, params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/departments/${id}/courses?${stringify(params)}`);
  };

  const getBaseCoursesInDepartment = (id: string, params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/departments/${id}/base-courses?${stringify(params)}`);
  };

  return {
    getDepartmentList,
    getDepartmentById,
    getCoursesInDepartment,
    getBaseCoursesInDepartment,
  };
};

export default useApi;
