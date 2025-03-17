import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { semesterApi } from '.';
import { ApiResponseType, PaginationResponseType, responseWrapper } from '../helpers';
import { API_KEY } from './keys';
import { SemesterResponse } from './types';

export function useGetCurrentOpenSemester(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<SemesterResponse>>, Error>,
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetCurrentOpenSemester,
  } = useQuery<ApiResponseType<SemesterResponse>, Error>(
    [API_KEY.CURRENT_OPEN_SEMESTER, options],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<SemesterResponse>>(semesterApi.getCurrentOpenSemester);
    },
    {
      enabled: true,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidCurrentOpenSemester = () =>
    queryClient.invalidateQueries([API_KEY.CURRENT_OPEN_SEMESTER, { ...options }]);

  const { result: semester = {} as SemesterResponse } = data || {};

  return {
    semester,
    error,
    isFetching,
    onGetCurrentOpenSemester,
    handleInvalidCurrentOpenSemester,
  };
}
