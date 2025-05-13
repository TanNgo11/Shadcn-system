import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { TeacherCheckAttendance } from './types';
import { attendanceApis } from '.';
import { API_ATTENDANCE_QUERIES } from './keys';

export default function useCheckAttendanceForTeacher(
  options?: UseMutationOptions<ApiResponseType<void>, Error, TeacherCheckAttendance>,
) {
  const {
    mutate: onCheckAttendance,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, TeacherCheckAttendance>({
    mutationFn: (payload: TeacherCheckAttendance) =>
      responseWrapper(attendanceApis.teacherCheckAttendance, [payload]),
    ...options,
  });

  return {
    onCheckAttendance,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
