import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';

import { ApiResponseType } from '../helpers';

import { studentsApi } from '.';
import { responseWrapper } from '../helpers';
import { API_STUDENTS_QUERIES } from './keys';
import { StudentProfileResponse } from './types';

export function useGetCurrentStudentInfo(
  options?: UseQueryOptions<ApiResponseType<StudentProfileResponse>, Error>,
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetCurrentStudentInfo,
  } = useQuery<ApiResponseType<StudentProfileResponse>, Error>(
    [API_STUDENTS_QUERIES.STUDENT_INFO, {}],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<StudentProfileResponse>>(
        studentsApi.getStudentInfo,
        [],
      );
    },

    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: true,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidCurrentAdmin = () =>
    queryClient.invalidateQueries([API_STUDENTS_QUERIES.STUDENT_INFO]);
  const { result: student } = data || {};

  return {
    student,
    error,
    isFetching,
    onGetCurrentStudentInfo,
    handleInvalidCurrentAdmin,
  };
}
