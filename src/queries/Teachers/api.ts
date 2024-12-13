import { Delete } from 'lucide-react';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { CrudTeacherPayload } from './types';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';

const useApi = (baseURL = 'http://localhost:8080/identity') => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);
  const teacherPrivateApi = useHttpPrivateRequest('http://localhost:8081/profile');

  const createTeacher = (payload: CrudTeacherPayload) => {
    return privateApi.post('/api/v1/users/teacher/registration', payload);
  };

  const getTeachersList = (params: GetPropertiesParams) => {
    return teacherPrivateApi.get(`/api/v1/users/teachers?${stringify(params)} `);
  };

  const getTeacherById = (teacherId: string) => {
    return teacherPrivateApi.get(`/api/v1/users/teacher/public/${teacherId}`);
  };

  const updateTeacher = (teacherId: string, payload: CrudTeacherPayload) => {
    return teacherPrivateApi.put(`/api/v1/users/teacher/${teacherId}`, payload);
  };

  const deleteTeacher = (teacherIds: string[]) => {
    return privateApi.delete(`/api/v1/users/teachers/delete`, { data: { teacherIds: teacherIds } });
  };

  const deleteTeacherById = (teacherId: string) => {
    return privateApi.delete(`/api/v1/users/teachers/delete/${teacherId}`);
  };

  const deleteTeacherByUsernames = (teacherUsernames: string[]) => {
    return privateApi.delete(`/api/v1/users/teachers/delete`, {
      data: { teacherIds: teacherUsernames },
    });
  };

  return {
    createTeacher,
    getTeachersList,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    deleteTeacherById,
    deleteTeacherByUsernames,
  };
};

export default useApi;
