// src/hooks/useUpdateStudent.ts

import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { CRUStudentPayload, StudentStatus } from './types';
import { studentsApi } from '.';

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
