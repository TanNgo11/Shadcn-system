import { useMutation, UseMutationOptions, UseQueryOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { courseApis } from '.';
import { CourseActionPayload } from './types';

export function useAddTeachersIntoCourse(
  options: UseMutationOptions<ApiResponseType<void>, Error, CourseActionPayload>,
) {
  const { mutate: onAddTeachersIntoCourse, ...rest } = useMutation<
    ApiResponseType<void>,
    Error,
    CourseActionPayload
  >({
    mutationFn: (payload: CourseActionPayload) =>
      responseWrapper(courseApis.addTeacherIntoCourse, [payload]),
    ...options,
  });

  return {
    onAddTeachersIntoCourse,
    ...rest,
  };
}
