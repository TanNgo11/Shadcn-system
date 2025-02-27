import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { API_URLS } from '../keys';
import { GetPropertiesParams } from '../helpers';
import { BaseCourseResponse, CourseActionPayload, FileUploadPayload } from './types';
import { stringify } from '@/utils';

const useApi = (basename = API_URLS.COURSE) => {
  const privateApi = useHttpPrivateRequest(basename);

  const getAllCourses = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/departments/courses?${stringify(params)}`);
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

  return {
    getAllCourses,
    addStudentIntoCourse,
    addTeacherIntoCourse,
    removeStudentFromCourse,
    removeTeacherFromCourse,
    getAllStudentsInCourse,
    getAllTeachersInCourse,
    uploadImageInCourse,
    uploadMultiFileInCourse,
    createBaseCourses,
  };
};

export default useApi;
