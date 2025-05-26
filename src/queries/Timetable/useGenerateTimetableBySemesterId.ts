import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { useMutation, UseMutationOptions } from 'react-query';
import { timeTableStatusApi } from '.';

export function useGenerateTimetableBySemesterId(
  options?: UseMutationOptions<ApiResponseType<any>, Error, any>,
) {
  const {
    mutate: onGenerateTimetableBySemesterId,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<any>, Error, any>({
    mutationFn: (payload: any) =>
      responseWrapper(timeTableStatusApi.generateTimetableBySemesterId, [payload]),
    ...options,
  });

  return {
    onGenerateTimetableBySemesterId,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
