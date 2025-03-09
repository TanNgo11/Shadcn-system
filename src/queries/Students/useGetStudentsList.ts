import { useState } from 'react';
import { useQuery, UseQueryOptions, useQueryClient } from 'react-query';

import { ApiResponseType, PaginationResponseType, TableParams, responseWrapper } from '../helpers';

import { isEmpty } from '@/utils';
import { API_STUDENTS_QUERIES } from './keys';
import { StudentResponse } from './types';
import { studentsApi } from '.';

export function useGetStudentsList(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<StudentResponse[]>>, Error> & {
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetStudentsList,
  } = useQuery<ApiResponseType<PaginationResponseType<StudentResponse[]>>, Error>(
    [API_STUDENTS_QUERIES.STUDENTS_LIST, { ...params }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<StudentResponse[]>>>(
        studentsApi.getStudentsList,
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

  const handleInvalidateStudentsList = () =>
    queryClient.invalidateQueries([API_STUDENTS_QUERIES.STUDENTS_LIST, { ...params }]);

  const { result: { current, totalPages, pageSize, totalElements, data: students = [] } = {} } =
    data || {};

  return {
    current,
    totalElements,
    pageSize,
    totalPages,
    students,
    error,
    isFetching,
    onGetStudentsList,
    setParams,
    handleInvalidateStudentsList,
  };
}
