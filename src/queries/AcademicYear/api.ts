import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { API_URLS } from '../keys';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';

const useApi = (baseURL = API_URLS.COURSE) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const getAcademicYearList = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/academic-years?${stringify(params)}`);
  };

  return {
    getAcademicYearList,
  };
};

export default useApi;
