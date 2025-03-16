import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { isEmpty } from '@/utils';
import { studentsApi } from '.';
import { responseWrapper, ApiResponseType } from '../helpers';
import { API_STUDENTS_QUERIES } from './keys';
import { StudentResponse } from './types';

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

  const handleInvalidStudentById = () =>
    queryClient.invalidateQueries([API_STUDENTS_QUERIES.STUDENT_BY_ID, { id: options?.id }]);

  const { result: student } = data || {};

  return {
    student,
    error,
    isFetching,
    onGetStudentsList,
    handleInvalidStudentById,
  };
}
