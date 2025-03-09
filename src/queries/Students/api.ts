import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { CRUStudentPayload, StudentRegisterCoursePayload } from './types';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';
import { API_URLS } from '../keys';

const useApi = (baseURL = API_URLS.IDENTITY) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);
  const studentPrivateApi = useHttpPrivateRequest(API_URLS.PROFILE);
  const identityPrivateApi = useHttpPrivateRequest(API_URLS.IDENTITY);
  const coursePrivateApi = useHttpPrivateRequest(API_URLS.COURSE);

  const createStudent = (payload: CRUStudentPayload) => {
    return publicApi.post('/api/v1/users/student/registration', payload);
  };
  const updateStudent = (id: number, payload: CRUStudentPayload) => {
    return studentPrivateApi.put(`/api/v1/users/student/${id}`, payload);
  };

  const getStudentsList = (params: GetPropertiesParams) => {
    return studentPrivateApi.get(`/api/v1/users/students?${stringify(params)} `);
  };

  const getStudentById = (studentId: string) => {
    return studentPrivateApi.get(`/api/v1/users/students/${studentId}`);
  };
  const updateStatusStudentByListId = (ids: number[], status: string) => {
    return privateApi.patch(`/api/v1/users/students/status`, { ids, status });
  };

  const uploadBulkStudent = (payload: FormData) => {
    return identityPrivateApi.post(`/api/v1/users/students/import`, payload);
  };

  const getStudentInfo = () => {
    return privateApi.get('/api/v1/users/me');
  };

  const registerCourse = (payload: StudentRegisterCoursePayload) => {
    return coursePrivateApi.post('/api/v1/registrations/student-registrations', payload);
  };

  const deleteStudentByUsernames = (studentUsernames: string[]) => {
    return privateApi.delete(`/api/v1/users/students/delete`, {
      data: { studentUsernames: studentUsernames },
    });
  };

  return {
    uploadBulkStudent,
    getStudentById,
    createStudent,
    getStudentsList,
    getStudentInfo,
    updateStudent,
    updateStatusStudentByListId,
    deleteStudentByUsernames,
    registerCourse,
  };
};

export default useApi;
