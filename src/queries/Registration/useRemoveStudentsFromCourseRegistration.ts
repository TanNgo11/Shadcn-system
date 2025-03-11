import { ApiResponseType, responseWrapper } from '@queries/helpers';
import { API_STUDENTS_QUERIES } from '@queries/Students/keys';
import { UseMutationOptions, useMutation } from 'react-query';
import { registrationApis } from '.';
import { RemovalStudentsPayload, RemovalTeacherFromCoursePayload } from './types';

export function useRemoveStudentsFromCoursesRegistration(
  options?: UseMutationOptions<ApiResponseType<void>, Error, RemovalStudentsPayload>,
) {
  const {
    mutate: onRemoveStudentsFromCourses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, RemovalStudentsPayload>({
    mutationFn: (payload) => responseWrapper(registrationApis.removeStudentFromCourse, [payload]),
    meta: {
      invalidates: [API_STUDENTS_QUERIES.REMOVE_REGISTERED_COURSE],
    },
    ...options,
  });

  return {
    onRemoveStudentsFromCourses,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
