import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { courseApis } from '.';
import { UpdateConstrainPayload } from './types';
import { API_COURSE_QUERIES } from './keys';

export function useUpdateConstraint(
  options?: UseMutationOptions<ApiResponseType<void>, Error, UpdateConstrainPayload>,
) {
  const {
    mutate: onUpdateConstraint,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, UpdateConstrainPayload>({
    mutationFn: (payload: UpdateConstrainPayload) =>
      responseWrapper(courseApis.updateConstraint, [payload]),
    meta: {
      invalidates: [API_COURSE_QUERIES.GET_COURSE_LIST_BY_SEMESTER],
    },
    ...options,
  });

  return {
    onUpdateConstraint,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
