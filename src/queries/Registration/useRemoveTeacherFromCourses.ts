import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { API_STUDENTS_QUERIES } from '../Students/keys';
import { registrationApis } from '.';
import { RemovalTeacherFromCoursePayload } from './types';

export function useRemoveTeacherFromCourses(
  options?: UseMutationOptions<
    ApiResponseType<void>,
    Error,
    RemovalTeacherFromCoursePayload
  >,
) {
  const {
    mutate: onRemoveTeacherFromCourses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, RemovalTeacherFromCoursePayload>({
    mutationFn: (payload) => responseWrapper(registrationApis.removeTeacherFromCourse, [payload]),
    meta: {
      invalidates: [API_STUDENTS_QUERIES.REMOVE_REGISTERED_COURSE],
    },
    ...options,
  });

  return {
    onRemoveTeacherFromCourses,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
