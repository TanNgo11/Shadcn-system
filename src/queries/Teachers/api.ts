import { Delete } from 'lucide-react';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { CreateTeacherPayload } from './types';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';

const useApi = (baseURL = 'http://localhost:8080/identity') => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);
  const studentPrivateApi = useHttpPrivateRequest('http://localhost:8081/profile');

  const createTeacher = (payload: CreateTeacherPayload) => {
    return publicApi.post('/api/v1/users/teacher/registration', payload);
  };

  const getTeachersList = (params: GetPropertiesParams) => {
    return studentPrivateApi.get(`/api/v1/users/teachers?${stringify(params)} `);
  };

  const getTeacherById = (teacherId: string) => {
    return studentPrivateApi.get(`/api/v1/users/teacher/${teacherId}`);
  };

  const updateTeacher = (teacherId: string, payload: CreateTeacherPayload) => {
    return privateApi.put(`/api/v1/users/teacher/${teacherId}`, payload);
  };

  return {
    createTeacher,
    getTeachersList,
    getTeacherById,
  };
};

export default useApi;
