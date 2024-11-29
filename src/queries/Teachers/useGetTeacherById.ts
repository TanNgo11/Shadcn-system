import { useQuery, UseQueryOptions, useQueryClient } from 'react-query';

import { ApiResponseType } from '../helpers';

import { isEmpty } from '@/utils';
import { responseWrapper } from '../helpers';
import { API_TEACHERS_QUERIES } from './keys';
import { TeacherResponse } from './types';
import { teachersApi } from '.';

export function useGetTeacherById(
  options?: UseQueryOptions<ApiResponseType<TeacherResponse>, Error> & {
    id: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetTeachersList,
  } = useQuery<ApiResponseType<TeacherResponse>, Error>(
    [API_TEACHERS_QUERIES.TEACHER_BY_ID, { id: options?.id }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<TeacherResponse>>(teachersApi.getTeacherById, [
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

  const handleInvalidTeacherById = () =>
    queryClient.invalidateQueries([API_TEACHERS_QUERIES.TEACHER_BY_ID, { id: options?.id }]);

  const { result: teacher } = data || {};

  return {
    teacher,
    error,
    isFetching,
    onGetTeachersList,
    handleInvalidTeacherById,
  };
}
