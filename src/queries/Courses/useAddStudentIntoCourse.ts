import { useMutation, UseMutationOptions, UseQueryOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { courseApis } from '.';
import { CourseActionPayload } from './types';

export function useAddStudentsIntoCourse(
  options: UseMutationOptions<ApiResponseType<void>, Error, CourseActionPayload>,
) {
  const { mutate: onAddStudentsIntoCourse, ...rest } = useMutation<
    ApiResponseType<void>,
    Error,
    CourseActionPayload
  >({
    mutationFn: (payload: CourseActionPayload) =>
      responseWrapper(courseApis.addStudentIntoCourse, [payload]),
    ...options,
  });

  return {
    onAddStudentsIntoCourse,
    ...rest,
  };
}
