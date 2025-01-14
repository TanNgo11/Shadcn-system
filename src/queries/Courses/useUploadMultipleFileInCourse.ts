import { UseMutationOptions, useMutation } from 'react-query';
import { courseApis } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { FileUploadPayload } from './types';

export default function useUploadMultipleFileInCourse(
  options?: UseMutationOptions<ApiResponseType<void>, Error, FileUploadPayload>,
) {
  const { mutate: onUploadMutilFileInCourse, ...rest } = useMutation<
    ApiResponseType<void>,
    Error,
    FileUploadPayload
  >({
    mutationFn: (fileUploadPayload: FileUploadPayload) =>
      responseWrapper(courseApis.uploadMultiFileInCourse, [fileUploadPayload]),
    ...options,
  });

  return {
    useUploadMultipleFileInCourse,
    ...rest,
  };
}
