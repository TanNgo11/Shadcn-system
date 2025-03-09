import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';

import {
  ApiResponseType,
  GetPropertiesParams,
  PaginationResponseType,
  responseWrapper,
} from '../helpers';

import { isEmpty } from '@/utils';
import { semesterApi } from '.';
import { API_KEY } from './keys';
import { CourseResponse } from './types';

export function useGetOpenCoursesInDepartmentById(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error> & {
    defaultParams?: GetPropertiesParams;
    semesterId: string;
    departmentId: string;
  },
) {
  const [params, setParams] = useState<GetPropertiesParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetOpenCoursesInDepartmentById,
  } = useQuery<ApiResponseType<PaginationResponseType<CourseResponse[]>>, Error>(
    [
      API_KEY.OPEN_COURSES_DEPARTMENT,
      { semesterId: options?.semesterId, departmentId: options?.departmentId, ...params },
    ],
    async ({ queryKey }) => {
      const [, params] = queryKey;
      const { semesterId, departmentId, ...rest } = params as {
        semesterId: string;
        departmentId: string;
        [key: string]: any;
      };

      return responseWrapper<ApiResponseType<PaginationResponseType<CourseResponse[]>>>(
        semesterApi.getOpenCoursesInDepartmentById,
        [options?.semesterId, options?.departmentId, rest],
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options?.semesterId) && !isEmpty(options?.departmentId),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateSemesterList = () =>
    queryClient.invalidateQueries([
      API_KEY.OPEN_COURSES_DEPARTMENT,
      {
        semesterId: options?.semesterId,
        departmentId: options?.departmentId,
        ...params,
      },
    ]);

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
    onGetOpenCoursesInDepartmentById,
  };
}
