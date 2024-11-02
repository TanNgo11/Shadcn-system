import { useState } from 'react';
import { useQuery, UseQueryOptions, useQueryClient } from 'react-query';

import { ApiResponseType, PaginationResponseType, TableParams } from '../helpers';

import { isEmpty } from '@/utils';
import { responseWrapper } from '../helpers';
import { API_STUDENTS_QUERIES } from './keys';
import { StudentResponse } from './types';
import { studentsApi } from '.';

export function useGetStudentById(
  options?: UseQueryOptions<ApiResponseType<StudentResponse>, Error> & {
    id: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetStudentsList,
  } = useQuery<ApiResponseType<StudentResponse>, Error>(
    [API_STUDENTS_QUERIES.STUDENT_BY_ID, { id: options?.id }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<StudentResponse>>(studentsApi.getStudentById, [
        options?.id,
      ]);
    },

    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options?.id),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateStudentsList = () =>
    queryClient.invalidateQueries([API_STUDENTS_QUERIES.STUDENT_BY_ID, { id: options?.id }]);

  const { result: student } = data || {};

  return {
    student,
    error,
    isFetching,
    onGetStudentsList,
    handleInvalidateStudentsList,
  };
}
