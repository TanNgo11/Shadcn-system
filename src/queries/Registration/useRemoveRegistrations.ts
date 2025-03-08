import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { API_STUDENTS_QUERIES } from '../Students/keys';
import { StudentRegisterCoursePayload } from '../Students/types';
import { registrationApis } from '.';
import { RemovalRegisterCourseForStudentPayload } from '@/containers/Student/helpers';

export function useRemoveRegistrations(
  options?: UseMutationOptions<
    ApiResponseType<void>,
    Error,
    RemovalRegisterCourseForStudentPayload
  >,
) {
  const {
    mutate: onRemoveRegistrations,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, RemovalRegisterCourseForStudentPayload>({
    mutationFn: (payload) => responseWrapper(registrationApis.removeRegistrations, [payload]),
    meta: {
      invalidates: [API_STUDENTS_QUERIES.REMOVE_REGISTERED_COURSE],
    },
    ...options,
  });

  return {
    onRemoveRegistrations,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
