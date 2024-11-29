import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { CrudTeacherPayload } from './types';
import { teachersApi } from '.';

export function useCreateNewTeacher(
  options?: UseMutationOptions<ApiResponseType<CrudTeacherPayload>, Error, CrudTeacherPayload>,
) {
  const {
    mutate: onCreateTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CrudTeacherPayload>, Error, CrudTeacherPayload>({
    mutationFn: (payload: CrudTeacherPayload) =>
      responseWrapper(teachersApi.createTeacher, [payload]),
    ...options,
  });

  return {
    onCreateTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
