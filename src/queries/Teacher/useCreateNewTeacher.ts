import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { CreateTeacherPayload } from './types';
import { teacherAPI } from '.';

export function useCreateNewTeacher(
  options?: UseMutationOptions<ApiResponseType<CreateTeacherPayload>, Error, CreateTeacherPayload>,
) {
  const {
    mutate: onCreateTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<CreateTeacherPayload>, Error, CreateTeacherPayload>({
    mutationFn: (payload: CreateTeacherPayload) =>
      responseWrapper(teacherAPI.createteacher, [payload]),
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
