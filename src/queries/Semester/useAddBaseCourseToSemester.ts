import { useMutation, UseMutationOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { semesterApi } from '.';
import { API_KEY } from './keys';

export function useAddBaseCourseToSemester(
  options?: UseMutationOptions<ApiResponseType<void>, Error, { semesterId: number; ids: number[] }>,
) {
  const {
    mutate: onAddBaseCourseToSemester,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, { semesterId: number; ids: number[] }>({
    mutationFn: ({ semesterId, ids }) =>
      responseWrapper(semesterApi.addBaseCourseToSemester, [{ semesterId, ids }]),
    meta: {
      invalidates: [API_KEY.OPEN_COURSES_DEPARTMENT],
    },
    ...options,
  });

  return {
    onAddBaseCourseToSemester,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
