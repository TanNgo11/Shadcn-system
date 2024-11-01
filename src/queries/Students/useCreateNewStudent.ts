import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { CreateStudentPayload } from './types';
import { studentsApi } from '.';

export function useCreateNewStudent(
  options?: UseMutationOptions<ApiResponseType<CreateStudentPayload>, Error, CreateStudentPayload>,
) {
  const {
    mutate: onCreateStudent,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CreateStudentPayload>, Error, CreateStudentPayload>({
    mutationFn: (payload: CreateStudentPayload) =>
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
