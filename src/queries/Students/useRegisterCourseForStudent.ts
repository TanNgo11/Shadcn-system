import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { studentsApi } from '.';
import { API_STUDENTS_QUERIES } from './keys';
import { RegisterCoursePayload, StudentStatus } from './types';

export function useRegisterCourseForStudent(
  options?: UseMutationOptions<
    ApiResponseType<void>,
    Error,
    { payload: RegisterCoursePayload}
  >,
) {
  const {
    mutate: onRegisterCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, { payload: RegisterCoursePayload}>({
    mutationFn: ({ ...payload }) =>
      responseWrapper(studentsApi.registerCourse, [payload]),
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
