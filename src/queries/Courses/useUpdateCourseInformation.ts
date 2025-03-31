import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { courseApis } from '.';
import { UpdateCourseInformationPayload } from './types';

export function useUpdateCourseInformation(
  options?: UseMutationOptions<
    ApiResponseType<UpdateCourseInformationPayload>,
    Error,
    UpdateCourseInformationPayload
  >,
) {
  const {
    mutate: onUpdateCourseInformation,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<
    ApiResponseType<UpdateCourseInformationPayload>,
    Error,
    UpdateCourseInformationPayload
  >({
    mutationFn: (payload: UpdateCourseInformationPayload) =>
      responseWrapper(courseApis.updateCourseInformation, [payload]),
    ...options,
  });

  return {
    onUpdateCourseInformation,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
