import { UseMutationOptions, useMutation } from 'react-query';
import { courseApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';

export default function useUploadImageInCourse(
  options?: UseMutationOptions<
    ApiResponseType<void>,
    Error,
    { departmentId: string; courseId: string; file: File }
  >,
) {
  const { mutate: onUploadImageInCourse, ...rest } = useMutation<
    ApiResponseType<void>,
    Error,
    { departmentId: string; courseId: string; file: File }
  >({
    mutationFn: ({ departmentId, courseId, file }) =>
      responseWrapper(courseApis.uploadImageInCourse, [departmentId, courseId, file]),
    ...options,
  });

  return {
    onUploadImageInCourse,
    ...rest,
  };
}
