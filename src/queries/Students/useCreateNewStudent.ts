import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { CRUStudentPayload } from './types';
import { studentsApi } from '.';

export function useCreateNewStudent(
  options?: UseMutationOptions<ApiResponseType<CRUStudentPayload>, Error, CRUStudentPayload>,
) {
  const {
    mutate: onCreateStudent,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CRUStudentPayload>, Error, CRUStudentPayload>({
    mutationFn: (payload: CRUStudentPayload) =>
      responseWrapper(studentsApi.createStudent, [payload]),
    ...options,
  });

  return {
    onCreateStudent,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
