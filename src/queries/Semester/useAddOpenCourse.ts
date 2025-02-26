import { useMutation, UseMutationOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { semesterApi } from '.';
import { API_KEY } from './keys';

export function useAddOpenCourse(
  options?: UseMutationOptions<
    ApiResponseType<void>,
    Error,
    { semesterId: number; courseIds: number[] }
  >,
) {
  const {
    mutate: onAddOpenCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, { semesterId: number; courseIds: number[] }>({
    mutationFn: ({ semesterId, courseIds }) =>
      responseWrapper(semesterApi.addOpenCourse, [semesterId, courseIds]),
    meta: {
      invalidates: [API_KEY.SEMESTER_LIST],
    },
    ...options,
  });

  return {
    onAddOpenCourse,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
