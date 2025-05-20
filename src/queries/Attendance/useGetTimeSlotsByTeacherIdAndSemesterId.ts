import { responseWrapper, ApiResponseType } from '@queries/helpers';
import { API_QUERIES } from '@queries/keys';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { attendanceApis } from '.';
import { TimeSlotResponse } from './types';
import { API_ATTENDANCE_QUERIES } from './keys';

export default function useGetTimeSlotsByTeacherIdAndSemesterId(
  options?: UseQueryOptions<ApiResponseType<TimeSlotResponse[]>, Error> & {
    teacherId: number | string;
    semesterId: number | string;
  },
) {
  const {
    data,
    error,
    isFetching,
    isLoading,
    isError,
    refetch: onGetTimeSlotsByTeacherIdAndSemesterId,
  } = useQuery<ApiResponseType<TimeSlotResponse[]>, Error>(
    [
      API_ATTENDANCE_QUERIES.TIME_SLOT_BY_TEACHER_AND_SEMESTER,
      options?.teacherId,
      options?.semesterId,
    ],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<TimeSlotResponse[]>>(
        attendanceApis.getTimeSlotsByTeacherIdAndSemesterId,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !!options?.teacherId && !!options?.semesterId,
      ...options,
    },
  );

  const queryClient = useQueryClient();
  const handleInvalidateTimeSlotsByTeacherIdAndSemesterId = () =>
    queryClient.invalidateQueries([
      API_ATTENDANCE_QUERIES.TIME_SLOT_BY_TEACHER_AND_SEMESTER,
      options?.teacherId,
      options?.semesterId,
    ]);

  return {
    timeSlots: data?.result || [],
    error,
    isError,
    isPending: isLoading || isFetching,
    onGetTimeSlotsByTeacherIdAndSemesterId,
    handleInvalidateTimeSlotsByTeacherIdAndSemesterId,
  };
}
