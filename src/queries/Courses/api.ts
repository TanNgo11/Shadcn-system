import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS } from '../keys';
import { GetPropertiesParams, TableParams } from '../helpers';
import {
  BaseCourseResponse,
  CourseActionPayload,
  FileUploadPayload,
  UpdateConstrainPayload,
  UpdateCourseInformationPayload,
  UpdateTeacherReferencePayload,
} from './types';
import { stringify } from '@/utils';

const useApi = (basename = API_URLS.COURSE) => {
  const privateApi = useHttpPrivateRequest(basename);

  const getAllCourses = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/departments/courses?${stringify(params)}`);
  };

  const getAllCoursesBySemesterId = (params: GetPropertiesParams) => {
    const { semesterId, ...restParams } = params;
    return privateApi.get(`/api/v1/semesters/${semesterId}/courses?${stringify(restParams)}`);
  };

  const addTeacherIntoCourse = (payload: CourseActionPayload) => {
    return privateApi.post(`/api/v1/departments/course/add-teachers`, payload);
  };

  const addStudentIntoCourse = (payload: CourseActionPayload) => {
    return privateApi.post(`/api/v1/departments/course/add-students`, payload);
  };

  const removeTeacherFromCourse = (payload: CourseActionPayload) => {
    return privateApi.delete(`/api/v1/departments/course/remove-teachers`, { data: payload });
  };

  const removeStudentFromCourse = (payload: CourseActionPayload) => {
    return privateApi.delete(`/api/v1/departments/course/remove-students`, { data: payload });
  };

  const createBaseCourses = (payload: BaseCourseResponse[]) => {
    return privateApi.post(`api/v1/departments/base-course`, payload);
  };

  const updateConstraint = (payload: UpdateConstrainPayload) => {
    const { courseId, ...restPayload } = payload;
    return privateApi.put(`/api/v1/departments/courses/${courseId}/constraint`, restPayload);
  };

  const getAllTeachersInCourse = (
    departmentId: string,
    courseId: string,
    params: GetPropertiesParams,
  ) => {
    return privateApi.get(
      `/api/v1/departments/${departmentId}/course/${courseId}/teachers`,
      params,
    );
  };

  const getAllStudentsInCourse = (
    departmentId: string,
    courseId: string,
    params: GetPropertiesParams,
  ) => {
    return privateApi.get(
      `/api/v1/departments/${departmentId}/course/${courseId}/students`,
      params,
    );
  };

  const getAllTeachersInCourseByCourseId = (courseId: string, params: TableParams) => {
    return privateApi.get(`/api/v1/departments/course/${courseId}/teachers?${stringify(params)}`);
  };

  const getAllStudentsInCourseByCourseId = (courseId: string, params: TableParams) => {
    return privateApi.get(`/api/v1/departments/course/${courseId}/students?${stringify(params)}`);
  };

  const uploadImageInCourse = (departmentId: string, courseId: string, file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    return privateApi.post(
      `/api/v1/departments/${departmentId}/course/${courseId}/upload-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  };

  const uploadMultiFileInCourse = (fileUploadPayload: FileUploadPayload) => {
    const formData = new FormData();
    fileUploadPayload.file.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    return privateApi.post(
      `/api/v1/departments/${fileUploadPayload.departmentId}/course/${fileUploadPayload.courseId}/upload-file`,
      FormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  };

  const getListCoursesOfTeacherBySemesterId = (semesterId: string) => {
    return privateApi.get(`/api/v1/departments/courses/teacher/semester/${semesterId}`);
  };

  const getCourseDetail = (courseId: string) => {
    return privateApi.get(`/api/v1/departments/courses/${courseId}`);
  };

  const updateTeacherReference = (payload: UpdateTeacherReferencePayload) => {
    return privateApi.put(`/api/v1/references/teachers`, payload);
  };

  const updateCourseInformation = (payload: UpdateCourseInformationPayload) => {
    return privateApi.put(`/api/v1/departments/courses/${payload.courseId}`, payload);
  };

  return {
    updateConstraint,
    updateCourseInformation,
    getAllCourses,
    getCourseDetail,
    updateTeacherReference,
    addStudentIntoCourse,
    addTeacherIntoCourse,
    removeStudentFromCourse,
    removeTeacherFromCourse,
    getAllStudentsInCourse,
    getAllTeachersInCourse,
    uploadImageInCourse,
    uploadMultiFileInCourse,
    createBaseCourses,
    getAllCoursesBySemesterId,
    getListCoursesOfTeacherBySemesterId,
    getAllTeachersInCourseByCourseId,
    getAllStudentsInCourseByCourseId,
  };
};

export default useApi;
