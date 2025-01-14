import { useMutation, UseMutationOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { CourseActionPayload } from './types';
import { courseApis } from '.';

export default function useRemoveTeachersFromCourse(
  options?: UseMutationOptions<ApiResponseType<void>, Error, CourseActionPayload>,
) {
  const { mutate: onRemoveTeachersFromCourse, ...rest } = useMutation<
    ApiResponseType<void>,
    Error,
    CourseActionPayload
  >({
    mutationFn: (payload: CourseActionPayload) =>
      responseWrapper(courseApis.removeTeacherFromCourse, [payload]),
    ...options,
  });

  return {
    onRemoveTeachersFromCourse,
    ...rest,
  };
}
