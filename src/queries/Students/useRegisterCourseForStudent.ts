import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { studentsApi } from '.';
import { API_STUDENTS_QUERIES } from './keys';
import { StudentRegisterCoursePayload } from './types';

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
    mutationFn: (payload) => responseWrapper(studentsApi.registerCourse, [payload]),
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
