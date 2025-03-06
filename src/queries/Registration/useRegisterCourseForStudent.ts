import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { API_STUDENTS_QUERIES } from '../Students/keys';
import { StudentRegisterCoursePayload } from '../Students/types';
import { registrationApis } from '.';

export function useRegisterCourseForStudent(
  options?: UseMutationOptions<ApiResponseType<void>, Error, StudentRegisterCoursePayload>,
) {
  const {
    mutate: onRegisterCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, StudentRegisterCoursePayload>({
    mutationFn: (payload) => responseWrapper(registrationApis.registerCourse, [payload]),
    meta: {
      invalidates: [API_STUDENTS_QUERIES.REGISTER_COURSE],
    },
    ...options,
  });

  return {
    onRegisterCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
