import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { courseApis } from '.';
import { UpdateTeacherReferencePayload } from './types';

export function useUpdateTeacherReference(
  options?: UseMutationOptions<
    ApiResponseType<UpdateTeacherReferencePayload>,
    Error,
    UpdateTeacherReferencePayload
  >,
) {
  const {
    mutate: onUpdateTeacherReference,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<
    ApiResponseType<UpdateTeacherReferencePayload>,
    Error,
    UpdateTeacherReferencePayload
  >({
    mutationFn: (payload: UpdateTeacherReferencePayload) =>
      responseWrapper(courseApis.updateTeacherReference, [payload]),
    ...options,
  });

  return {
    onUpdateTeacherReference,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
