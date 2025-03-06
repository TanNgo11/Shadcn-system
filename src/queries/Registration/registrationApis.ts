import { TableParams } from './../helpers';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS } from '../keys';
import { StudentRegisterCoursePayload } from '@/containers/Student/helpers';
import { GetCoursePropertiesParams } from './types';
import { customStringify } from '@/utils/customStringify';

const useApi = (baseURL = API_URLS.COURSE) => {
  const coursePrivateApi = useHttpPrivateRequest(baseURL);

  const registerCourse = (payload: StudentRegisterCoursePayload) => {
    return coursePrivateApi.post('/api/v1/registrations/student-registrations', payload);
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
    getCourseParams: GetCoursePropertiesParams,
    tableParams: TableParams,
  ) => {
    return coursePrivateApi.get(
      `/api/v1/registrations/student-unregistered-courses?${customStringify(
        getCourseParams,
      )}&${customStringify(tableParams)}`,
    );
  };

  return {
    getAllUnregisteredCoursesInSemesterByDepartmentForStudent,
    getAllRegisteredCoursesInSemesterByDepartmentForStudent,
    registerCourse,
  };
};

export default useApi;
