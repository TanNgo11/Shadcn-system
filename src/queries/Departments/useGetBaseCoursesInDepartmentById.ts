import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';
import { useState } from 'react';
import { isEmpty } from '@/utils';
import { API_DEPARTMENT } from './keys';
import { departmentApis } from '.';
import { BaseCourseResponse } from '../Courses/types';

export function useGetBaseCoursesInDepartmentById(
  options?: UseQueryOptions<
    ApiResponseType<PaginationResponseType<BaseCourseResponse[]>>,
    Error
  > & {
    id: string;
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetBaseCoursesInDepartment,
  } = useQuery<ApiResponseType<PaginationResponseType<BaseCourseResponse[]>>, Error>(
    [API_DEPARTMENT.BASE_COURSES_IN_DEPARTMENT, { ...params, id: options?.id }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<BaseCourseResponse[]>>>(
        departmentApis.getBaseCoursesInDepartment,
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

  const handleInvalidateBaseCoursesInDepartment = () =>
    queryClient.invalidateQueries([
      API_DEPARTMENT.BASE_COURSES_IN_DEPARTMENT,
      { ...params, id: options?.id },
    ]);

  const { result: { totalPages, pageSize, totalElements, data: baseCourses = [] } = {} } =
    data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    baseCourses,
    error,
    isFetching,
    onGetBaseCoursesInDepartment,
    setParams,
    handleInvalidateBaseCoursesInDepartment,
  };
}
