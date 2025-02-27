import { useGetCoursesInDepartmentById } from '@/queries/Departments/useGetCoursesInDepartmentById';
import useHttpPublicRequest from '@/services/useHttpPublicRequest';
import { API_URLS } from '../keys';
import { useHttpPrivateRequest } from '@/services/useHttpPrivateRequest';
import { GetPropertiesParams } from '../helpers';
import { stringify } from '@/utils';

const useApi = (baseURL = API_URLS.COURSE) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const getSemesterList = (params: GetPropertiesParams) => {
    return privateApi.get(`/api/v1/?${stringify(params)}`);
  };

  const useGetOpenCoursesInDepartmentById = (semesterId:string, departmentId:string, params: GetPropertiesParams) => {
    return privateApi.get(
      `/api/v1/semesters/open-courses-department?semesterId=${semesterId}&departmentId=${departmentId}&${stringify(params)}`,
    );
  };
  

  return {
    getSemesterList,
    useGetCoursesInDepartmentById,
  };
};

export default useApi;
