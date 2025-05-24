import { isEmpty } from '@/utils';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { timeTableStatusApi } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_TIMETABLES_QUERIES } from './keys';
import { TimetableResponse } from './types';

export function useGetTimetablesByCourseId(
  options?: UseQueryOptions<ApiResponseType<TimetableResponse[]>, Error> & { courseId: string },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetTimetables,
  } = useQuery<ApiResponseType<TimetableResponse[]>, Error>(
    [API_TIMETABLES_QUERIES.TIMETABLES_BY_COURSE_ID, options?.courseId],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<TimetableResponse[]>>(
        timeTableStatusApi.getTimetablesByCourseId,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options?.courseId),
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateTimetables = () =>
    queryClient.invalidateQueries([
      API_TIMETABLES_QUERIES.TIMETABLES_BY_COURSE_ID,
      options?.courseId,
    ]);

  const timetables = data?.result || [];

  return {
    timetables,
    error,
    isFetching,
    onGetTimetables,
    handleInvalidateTimetables,
  };
}
