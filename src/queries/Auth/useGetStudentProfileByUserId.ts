import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';

import { ApiResponseType } from '../helpers';

import { isEmpty } from '@/utils';
import { authApi } from '.';
import { responseWrapper } from '../helpers';
import { StudentResponse } from '../Students/types';
import { API_AUTH_QUERIES } from './keys';

export function useGetStudentProfileByUserId(
  options?: UseQueryOptions<ApiResponseType<StudentResponse>, Error> & {
    id: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetStudentProfile,
  } = useQuery<ApiResponseType<StudentResponse>, Error>(
    [API_AUTH_QUERIES.STUDENT_PROFILE_BY_USER_ID, { id: options?.id }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<StudentResponse>>(authApi.getStudentProfileById, [
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

  const handleInvalidStudentById = () =>
    queryClient.invalidateQueries([
      API_AUTH_QUERIES.STUDENT_PROFILE_BY_USER_ID,
      { id: options?.id },
    ]);

  const { result: student } = data || {};

  return {
    student,
    error,
    isFetching,
    onGetStudentProfile,
    handleInvalidStudentById,
  };
}
