import { ApiResponseType, responseWrapper } from '@queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { registrationApis } from '.';
import { REGISTER_COURSE_API_KEY } from './keys';
import { AssignTeacherPayload, RegistrationTeacherRoleRequest } from './types';

export function useAssignTeacherRoleToCourse(
  options?: UseMutationOptions<ApiResponseType<void>, Error, RegistrationTeacherRoleRequest>,
) {
  const {
    mutateAsync: onAssignTeacherRole,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, RegistrationTeacherRoleRequest>({
    mutationFn: (payload) => responseWrapper(registrationApis.assignTeacherRoleToCourse, [payload]),
    meta: {
      invalidates: [REGISTER_COURSE_API_KEY.ASSIGN_TEACHER_ROLE],
    },
    ...options,
  });

  return {
    onAssignTeacherRole,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
