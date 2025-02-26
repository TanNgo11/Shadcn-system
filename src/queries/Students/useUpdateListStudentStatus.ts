import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { studentsApi } from '.';
import { API_STUDENTS_QUERIES } from './keys';
import { StudentStatus } from './types';

export function useUpdateListStudentStatus(
  options?: UseMutationOptions<
    ApiResponseType<void>,
    Error,
    { ids: number[]; status: StudentStatus }
  >,
) {
  const {
    mutate: onUpdateStudentStatus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, { ids: number[]; status: StudentStatus }>({
    mutationFn: ({ ids, status }) =>
      responseWrapper(studentsApi.updateStatusStudentByListId, [ids, status]),
    meta: {
      invalidates: [API_STUDENTS_QUERIES.STUDENTS_LIST],
    },
    ...options,
  });

  return {
    onUpdateStudentStatus,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
