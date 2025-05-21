import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { registrationApis } from '.';
import { AssignTeacherPayload } from './types';
import { REGISTER_COURSE_API_KEY } from './keys';

export function useAssignTeachersToCourse(
  options?: UseMutationOptions<ApiResponseType<void>, Error, AssignTeacherPayload>,
) {
  const {
    mutateAsync: onAssignTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, AssignTeacherPayload>({
    mutationFn: (payload) => responseWrapper(registrationApis.assignTeacherToCourse, [payload]),
    meta: {
      invalidates: [REGISTER_COURSE_API_KEY.ASSIGN_TEACHER],
    },
    ...options,
  });

  return {
    onAssignTeacher,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
