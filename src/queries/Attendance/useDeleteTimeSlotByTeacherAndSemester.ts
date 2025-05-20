import { ApiResponseType, responseWrapper } from '@queries/helpers';
import { useMutation, UseMutationOptions } from 'react-query';
import { DeleteTimeSlotRequest } from './types';
import { attendanceApis } from '.';
import { API_ATTENDANCE_QUERIES } from './keys';

const useDeleteTimeSlotByTeacherIdAndTimeSlotId = (
  options?: UseMutationOptions<ApiResponseType<void>, Error, DeleteTimeSlotRequest>,
) => {
  const {
    mutate: onRemoveTimeSlot,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<void>, Error, DeleteTimeSlotRequest>({
    mutationFn: (request) =>
      responseWrapper(attendanceApis.deleteTimeSlotByTeacherIdAndTimeSlotId, [request]),
    meta: {
      invalidates: [API_ATTENDANCE_QUERIES.DELETE_TIME_SLOT_BY_TEACHER_AND_TIME_SLOT_ID],
    },
    ...options,
  });

  return {
    onRemoveTimeSlot,
    isDeleteLoading: isLoading,
    isDeleteSuccess: isSuccess,
    isDeleteError: isError,
    deleteError: error,
  };
};

export default useDeleteTimeSlotByTeacherIdAndTimeSlotId;
