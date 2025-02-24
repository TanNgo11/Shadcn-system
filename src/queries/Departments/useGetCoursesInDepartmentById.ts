import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';
import { useState } from 'react';
import { isEmpty } from '@/utils';
import { API_DEPARTMENT } from './keys';
import { departmentApis } from '.';
import { CourseResponse } from '@/containers/Admin/University/DepartmentManagement/ViewCoursesDepartment/helpers';

export function useGetCoursesInDepartmentById(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error> & {
    id: string;
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetCoursesInDepartment,
  } = useQuery<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error>(
    [API_DEPARTMENT.COURSES_IN_DEPARTMENT, { ...params, id: options?.id }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<CourseResponse[]>>>(
        departmentApis.getCoursesInDepartment,
        [options?.id, ...params],
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(params),
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateCoursesInDepartment = (params?: TableParams) =>
    queryClient.invalidateQueries([API_DEPARTMENT.COURSES_IN_DEPARTMENT, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: courses = [] } = {} } = data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    courses,
    error,
    isFetching,
    onGetCoursesInDepartment,
    setParams,
    handleInvalidateCoursesInDepartment,
  };
}
