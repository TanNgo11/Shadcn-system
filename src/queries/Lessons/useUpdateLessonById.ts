import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { useMutation, UseMutationOptions } from 'react-query';
import { LessonsApis } from '.';
import { UpdateLessonPayload } from './types';

export function useUpdateLessonById(
  options?: UseMutationOptions<ApiResponseType<UpdateLessonPayload>, Error, UpdateLessonPayload>,
) {
  const {
    mutate: onUpdateLessonById,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<UpdateLessonPayload>, Error, UpdateLessonPayload>({
    mutationFn: (payload: UpdateLessonPayload) =>
      responseWrapper(LessonsApis.updateLessonsByCourseId, [payload]),
    ...options,
  });

  return {
    onUpdateLessonById,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
