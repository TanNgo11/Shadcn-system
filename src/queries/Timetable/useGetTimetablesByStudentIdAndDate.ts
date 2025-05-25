import { isEmpty } from '@/utils';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { timeTableStatusApi } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_TIMETABLES_QUERIES } from './keys';
import { TimetableResponse } from './types';

export function useGetTimetablesByStudentIdAndDate(
  options?: UseQueryOptions<ApiResponseType<TimetableResponse[]>, Error> & {
    studentId: string;
    date: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetTimetables,
  } = useQuery<ApiResponseType<TimetableResponse[]>, Error>(
    [API_TIMETABLES_QUERIES.TIMETABLES_BY_STUDENT_ID, options],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<TimetableResponse[]>>(
        timeTableStatusApi.getStudentTimetable,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options?.studentId) && !isEmpty(options?.date),
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateTimetables = () =>
    queryClient.invalidateQueries([API_TIMETABLES_QUERIES.TIMETABLES_BY_STUDENT_ID, options]);

  const timetables = data?.result || [];

  return {
    timetables,
    error,
    isFetching,
    onGetTimetables,
    handleInvalidateTimetables,
  };
}
