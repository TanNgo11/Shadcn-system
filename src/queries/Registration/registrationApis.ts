import { GetPropertiesParams, TableParams } from './../helpers';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS } from '../keys';
import {
  RemovalRegisterCourseForStudentPayload,
  StudentRegisterCoursePayload,
} from '@/containers/Student/helpers';
import { AssignTeacherPayload, GetCoursePropertiesParams } from './types';
import { customStringify } from '@/utils/customStringify';
import { stringify } from '@/utils';

const useApi = (baseURL = API_URLS.COURSE) => {
  const coursePrivateApi = useHttpPrivateRequest(baseURL);

  const registerCourse = (payload: StudentRegisterCoursePayload) => {
    return coursePrivateApi.post('/api/v1/registrations/student-registrations', payload);
  };

  const removeRegistrations = (payload: RemovalRegisterCourseForStudentPayload) => {
    return coursePrivateApi.delete('/api/v1/registrations/unregister-student', { data: payload });
  };

  const getAllRegisteredCoursesInSemesterByDepartmentForStudent = (
    getCourseParams: GetCoursePropertiesParams,
    tableParams: TableParams,
  ) => {
    return coursePrivateApi.get(
      `/api/v1/registrations/student-registered-courses?${customStringify(
        getCourseParams,
      )}&${customStringify(tableParams)}`,
    );
  };

  const getAllUnregisteredCoursesInSemesterByDepartmentForStudent = (
    params: GetPropertiesParams,
  ) => {
    return coursePrivateApi.get(
      `/api/v1/registrations/student-unregistered-courses?${stringify(params)}`,
    );
  };

  const getApprovedCoursesForStudentByStudentId = ({ id, tableParams }: any) => {
    return coursePrivateApi.get(
      `/api/v1/registrations/student-semester-registrations/${id}?${stringify(tableParams)}`,
    );
  };

  const assignTeacherToCourse = (payload: AssignTeacherPayload) => {
    return coursePrivateApi.post('/api/v1/registrations/assign-teacher', payload);
  };

  const removeTeacherFromCourse = (payload: AssignTeacherPayload) => {
    return coursePrivateApi.delete('/api/v1/registrations/remove-teacher', { data: payload });
  };

  return {
    getAllUnregisteredCoursesInSemesterByDepartmentForStudent,
    getAllRegisteredCoursesInSemesterByDepartmentForStudent,
    registerCourse,
    getApprovedCoursesForStudentByStudentId,
    removeRegistrations,
    assignTeacherToCourse,
    removeTeacherFromCourse
  };
};

export default useApi;
