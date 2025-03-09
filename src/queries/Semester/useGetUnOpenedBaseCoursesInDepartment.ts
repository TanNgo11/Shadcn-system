import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';
import { useState } from 'react';
import { isEmpty } from '@/utils';
import { API_DEPARTMENT } from '../Departments/keys';
import { departmentApis } from '../Departments';
import { BaseCourseResponse } from '../Courses/types';
import { semesterApi } from '.';

export function useGetUnOpenedBaseCoursesInDepartmentById(
  options?: UseQueryOptions<
    ApiResponseType<PaginationResponseType<BaseCourseResponse[]>>,
    Error
  > & {
    semesterId: string;
    departmentId: string;
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetUnOpenedBaseCoursesInDepartment,
  } = useQuery<ApiResponseType<PaginationResponseType<BaseCourseResponse[]>>, Error>(
    [
      API_DEPARTMENT.BASE_COURSES_IN_DEPARTMENT,
      { ...params, semesterId: options?.semesterId, departmentId: options?.departmentId },
    ],
    async ({ queryKey }) => {
      const [, params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<BaseCourseResponse[]>>>(
        semesterApi.getUnOpenedBaseCoursesInDepartmentById,
        [options?.semesterId, options?.departmentId, params],
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

  const handleInvalidateUnOpenedBaseCoursesInDepartment = () =>
    queryClient.invalidateQueries([
      API_DEPARTMENT.BASE_COURSES_IN_DEPARTMENT,
      { ...params, semesterId: options?.semesterId, departmentId: options?.departmentId },
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
    onGetUnOpenedBaseCoursesInDepartment,
    setParams,
    handleInvalidateUnOpenedBaseCoursesInDepartment,
  };
}
