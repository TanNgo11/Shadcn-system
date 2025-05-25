import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { stringify } from '@/utils';
import { GetPropertiesParams } from '../helpers';
import { API_URLS } from '../keys';

const useApi = (baseURL = API_URLS.COURSE) => {
  const api = useHttpPrivateRequest(baseURL);

  const getSemesterList = (params: GetPropertiesParams) => {
    return api.get(`/api/v1/semesters?${stringify(params)}`);
  };

  const getOpenCourseList = (params: GetPropertiesParams) => {
    return api.get(`/api/v1/semesters/open-courses?${stringify(params)}`);
  };

  const addOpenCourse = (semesterId: number, courseIds: number[]) => {
    return api.post(`/api/v1/semesters/add-open-courses/${semesterId}`, courseIds);
  };

  const getUnOpenedBaseCoursesInDepartmentById = (
    semesterId: string,
    departmentId: string,
    params: GetPropertiesParams,
  ) => {
    return api.get(
      `/api/v1/departments/unopened-base-courses?semesterId=${semesterId}&departmentId=${departmentId}&${stringify(
        params,
      )}`,
    );
  };

  const getOpenCoursesInDepartmentById = (
    semesterId: string,
    departmentId: string,
    params: GetPropertiesParams,
  ) => {
    return api.get(
      `/api/v1/semesters/open-courses-department?semesterId=${semesterId}&departmentId=${departmentId}&${stringify(
        params,
      )}`,
    );
  };

  const getCurrentOpenSemester = () => {
    return api.get(`/api/v1/semesters/current-open-semester`);
  };

  const getCurrentOpenSemesterByDate = () => {
    return api.get(`/api/v1/semesters/current-open-semester-by-date`);
  };

  const addBaseCourseToSemester = (payload: { semesterId: number; ids: number[] }) => {
    return api.post(`/api/v1/semesters/add-open-courses/${payload.semesterId}`, payload.ids);
  };

  const deleteCoursesByIds = (courseIds: number[]) => {
    return api.delete(`/api/v1/semesters/delete-opened-courses/`, {
      data: { courseIds: courseIds },
    });
  };
  return {
    getUnOpenedBaseCoursesInDepartmentById,
    getOpenCoursesInDepartmentById,
    getSemesterList,
    getOpenCourseList,
    addOpenCourse,
    addBaseCourseToSemester,
    getCurrentOpenSemester,
    deleteCoursesByIds,
    getCurrentOpenSemesterByDate,
  };
};
export default useApi;
