import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { CreateTeacherPayload } from './types';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';
import { API_URLS } from '../keys';

const useTeacherAPI = (baseURL = API_URLS.IDENTITY) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);
  const teacherPrivateApi = useHttpPrivateRequest(API_URLS.PROFILE);

  const createteacher = (payload: CreateTeacherPayload) => {
    return publicApi.post('/api/v1/users/teacher/registration', payload);
  };

  const getTeachersList = (params: GetPropertiesParams) => {
    return teacherPrivateApi.get(`/api/v1/users/teachers?${stringify(params)} `);
  };

  const getTeacherById = (teacherId: string) => {
    return teacherPrivateApi.get(`/api/v1/users/teachers/${teacherId}`);
  };

  return {
    getTeacherById,
    createteacher,
    getTeachersList,
  };
};

export default useTeacherAPI;
