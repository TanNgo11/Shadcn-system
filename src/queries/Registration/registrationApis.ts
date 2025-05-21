import { GetPropertiesParams, TableParams } from './../helpers';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS } from '../keys';
import {
  RemovalRegisterCourseForStudentPayload,
  StudentRegisterCoursePayload,
} from '@/containers/Student/helpers';
import {
  ApproveRegistrationsPayload,
  AssignTeacherPayload,
  GetCoursePropertiesParams,
  RegistrationTeacherRoleRequest,
  RemovalStudentsPayload,
  RemovalTeacherFromCoursePayload,
} from './types';
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

  const removeTeacherFromCourse = (payload: RemovalTeacherFromCoursePayload) => {
    return coursePrivateApi.delete('/api/v1/registrations/remove-teacher', { data: payload });
  };

  const removeStudentFromCourse = (payload: RemovalStudentsPayload) => {
    return coursePrivateApi.delete('/api/v1/registrations/remove-student', { data: payload });
  };

  const getAllRegistrationsInSemester = (params: GetPropertiesParams) => {
    return coursePrivateApi.get(
      `/api/v1/registrations/semester-registrations?${stringify(params)}`,
    );
  };

  const approveRegistrations = (payload: ApproveRegistrationsPayload) => {
    return coursePrivateApi.post('/api/v1/registrations/approve-registrations', payload);
  };

  const assignTeacherRoleToCourse = (payload: RegistrationTeacherRoleRequest) => {
    return coursePrivateApi.put('/api/v1/registrations/assign-teacher-role', payload);
  };

  return {
    getAllUnregisteredCoursesInSemesterByDepartmentForStudent,
    getAllRegisteredCoursesInSemesterByDepartmentForStudent,
    registerCourse,
    getApprovedCoursesForStudentByStudentId,
    removeRegistrations,
    assignTeacherToCourse,
    removeTeacherFromCourse,
    removeStudentFromCourse,
    getAllRegistrationsInSemester,
    approveRegistrations,
    assignTeacherRoleToCourse,
  };
};

export default useApi;
