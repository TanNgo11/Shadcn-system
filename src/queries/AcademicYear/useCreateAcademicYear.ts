import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { AcademicYearPayload } from './types';
import { academicYearApis } from './index';

export function useCreateAcademicYear(
  options?: UseMutationOptions<ApiResponseType<AcademicYearPayload>, Error, AcademicYearPayload>,
) {
  const mutation = useMutation<ApiResponseType<AcademicYearPayload>, Error, AcademicYearPayload>({
    mutationFn: (payload) => responseWrapper(academicYearApis.createAcademicYear, [payload]),
    ...options,
  });

  return {
    onCreateAcademicYear: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
