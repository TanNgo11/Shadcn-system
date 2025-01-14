import { UseMutationOptions, useMutation } from 'react-query';
import { courseApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { CourseActionPayload } from './types';

export default function useRemoveStudentsFromCourse(
  options?: UseMutationOptions<ApiResponseType<void>, Error, CourseActionPayload>,
) {
  const { mutate: onRemoveStudentsFromCourse, ...rest } = useMutation<
    ApiResponseType<void>,
    Error,
    CourseActionPayload
  >({
    mutationFn: (payload: CourseActionPayload) =>
      responseWrapper(courseApis.removeStudentFromCourse, [payload]),
    ...options,
  });

  return {
    onRemoveStudentsFromCourse,
    ...rest,
  };
}
