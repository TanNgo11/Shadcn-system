import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { useMutation, UseMutationOptions } from 'react-query';
import { LessonsApis } from '.';

export function useUpdateLessonById(
  options?: UseMutationOptions<ApiResponseType<FormData>, Error, FormData>,
) {
  const {
    mutate: onUpdateLessonById,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<FormData>, Error, FormData>({
    mutationFn: (payload: FormData) =>
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
