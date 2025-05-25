import { ApiResponseType, responseWrapper } from '@queries/helpers';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { timeTableStatusApi } from '.';
import { API_TIMETABLES_QUERIES } from './keys';
import { TimetableResponse } from './types';

export const useGetStudentCalendarByStudentIdAndSemesterId = (
  options?: UseQueryOptions<ApiResponseType<TimetableResponse[]>, Error> & {
    semesterId: string;
    studentId: string;
  },
) => {
  const {
    data,
    isError,
    isLoading,
    isFetching,
    error,
    refetch: onGetTeacherTimetables,
  } = useQuery<ApiResponseType<TimetableResponse[]>, Error>(
    [API_TIMETABLES_QUERIES.TIMETABLES_BY_STUDENT_ID, options?.semesterId, options?.studentId],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<TimetableResponse[]>>(
        timeTableStatusApi.getStudentCalendarByStudentIdAndSemesterId,
        params,
      );
    },
    {
      keepPreviousData: true,
      enabled: !!options?.semesterId && !!options?.studentId,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateTimetables = () => {
    queryClient.invalidateQueries([
      API_TIMETABLES_QUERIES.TIMETABLES_BY_STUDENT_ID,
      options?.semesterId,
      options?.studentId,
    ]);
  };

  return {
    studentSchedule: data?.result || [],
    isPending: isLoading || isFetching,
    isError,
    error,
    onGetTeacherTimetables,
    handleInvalidateTimetables,
  };
};
