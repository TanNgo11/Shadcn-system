import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';

import { ApiResponseType, PaginationResponseType, TableParams, responseWrapper } from '../helpers';

import { isEmpty } from '@/utils';
import { semesterApi } from '.';
import { API_KEY } from './keys';
import { CourseResponse } from './types';

export function useGetOpenCoursesInDepartmentById(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error> & {
    defaultParams?: TableParams;
    semesterId: string | undefined;
    departmentId: string;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetOpenCoursesInDepartmentById,
  } = useQuery<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error>(
    [
      API_KEY.OPEN_COURSES_DEPARTMENT,
      { ...params, semesterId: options?.semesterId, departmentId: options?.departmentId },
    ],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<CourseResponse[]>>>(
        semesterApi.getOpenCoursesInDepartmentById,
        [options?.semesterId, options?.departmentId, ...params],
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

  const handleInvalidateSemesterList = (params: TableParams) =>
    queryClient.invalidateQueries([API_KEY.SEMESTER_LIST, { ...params }]);

  const { result: { current, totalPages, pageSize, totalElements, data: semesters = [] } = {} } =
    data || {};

  return {
    current,
    totalElements,
    pageSize,
    totalPages,
    semesters,
    error,
    isFetching,
    setParams,
    handleInvalidateSemesterList,
    onGetOpenCoursesInDepartmentById
  };
}
