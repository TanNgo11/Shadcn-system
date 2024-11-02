import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { CreateStudentPayload } from './types';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';

const useApi = (baseURL = 'http://localhost:8080/identity') => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);
  const studentPrivateApi = useHttpPrivateRequest('http://localhost:8081/profile');

  const createStudent = (payload: CreateStudentPayload) => {
    return publicApi.post('/api/v1/users/student/registration', payload);
  };

  const getStudentsList = (params: GetPropertiesParams) => {
    return studentPrivateApi.get(`/api/v1/users/students?${stringify(params)} `);
  };

  const getStudentById = (studentId: string) => {
    return studentPrivateApi.get(`/api/v1/users/students/${studentId}`);
  };

  return {
    getStudentById,
    createStudent,
    getStudentsList,
  };
};

export default useApi;
