import { Delete } from 'lucide-react';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { CrudTeacherPayload } from './types';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';
import { API_URLS } from '../keys';

const useApi = (baseURL = API_URLS.IDENTITY) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);
  const teacherPrivateApi = useHttpPrivateRequest(API_URLS.PROFILE);
  const teacherCoursePrivateApi = useHttpPrivateRequest(API_URLS.COURSE);

  const createTeacher = (payload: CrudTeacherPayload) => {
    return privateApi.post('/api/v1/users/teacher/registration', payload);
  };

  const getTeachersList = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/users/teachers?${stringify(params)} `);
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

  const getAllTeachersHaveCourseInSemester = (
    semesterId: string | number,
    params: GetPropertiesParams,
  ) => {
    return teacherCoursePrivateApi.get(
      `/api/v1/references/teachers/semesters/${semesterId}?${stringify(params)}`,
    );
  };

  return {
    createTeacher,
    getTeachersList,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    deleteTeacherById,
    deleteTeacherByUsernames,
    getAllTeachersHaveCourseInSemester,
  };
};

export default useApi;
