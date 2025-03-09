import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';
import { useState } from 'react';
import { API_COURSE_QUERIES } from './keys';
import { courseApis } from '.';
import { isEmpty } from '@/utils';
import { RegisteredCourseResponse } from './types';

export function useGetStudentRegistrations(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<RegisteredCourseResponse[]>>, Error>,
) {
  const [params, setParams] = useState<TableParams>();
  const {
    data,
    error,
    isFetching,
    refetch: onGetStudentRegistrations,
  } = useQuery<ApiResponseType<PaginationResponseType<RegisteredCourseResponse[]>>, Error>(
    [API_COURSE_QUERIES.GET_STUDENT_REGISTRATION, { ...params }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<RegisteredCourseResponse[]>>>(
        courseApis.getStudentRegistrations,
        params,
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

  const handleInvalidateStudentRegistrationsList = (params: TableParams) =>
    queryClient.invalidateQueries([API_COURSE_QUERIES.GET_STUDENT_REGISTRATION, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: registrations = [] } = {} } = data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    registrations,
    error,
    isFetching,
    onGetStudentRegistrations,
    setParams,
    handleInvalidateStudentRegistrationsList,
  };
}
