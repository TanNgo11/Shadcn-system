import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { API_URLS } from '../keys';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';
import { AcademicYearPayload } from './types';

const useApi = (baseURL = API_URLS.COURSE) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const getAcademicYearList = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/academic-years?${stringify(params)}`);
  };

  const createAcademicYear = (payload: AcademicYearPayload) => {
    return privateApi.post('/api/v1/academic-years', payload);
  };

  const updateAcademicYear = (id: number, payload: AcademicYearPayload) => {
    return privateApi.put(`/api/v1/academic-years/${id}`, payload);
  };

  const deleteAcademicYear = (id: number) => {
    return privateApi.delete(`/api/v1/academic-years/${id}`);
  };

  return {
    getAcademicYearList,
    createAcademicYear,
    updateAcademicYear,
    deleteAcademicYear,
  };
};

export default useApi;
