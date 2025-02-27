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

  const addBaseCourseToSemester = (payload: { semesterId: number; ids: number[] }) => {
    return api.post(
      `/api/v1/semesters/add-open-courses/${payload.semesterId}`,
      payload.ids,
    );
  };

  return {
    getOpenCoursesInDepartmentById,
    getSemesterList,
    getOpenCourseList,
    addOpenCourse,
    addBaseCourseToSemester,
  };
};
export default useApi;
