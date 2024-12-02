import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { studentsApi } from '.';

export function useUploadStudents(
  options?: UseMutationOptions<ApiResponseType<void>, Error, FormData>,
) {
  const {
    mutate: onUploadStudents,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, FormData>({
    mutationFn: (payload) => {
      return responseWrapper(studentsApi.uploadBulkStudent, [payload]);
    },
    ...options,
  });

  return {
    onUploadStudents,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
