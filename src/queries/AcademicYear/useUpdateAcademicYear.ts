import { AcademicYearPayload } from './types';
import { academicYearApis } from './index';
import { responseWrapper, ApiResponseType } from '../helpers';
import { useMutation, UseMutationOptions } from 'react-query';
import { UpdateAcademicYearVariables } from './types';

export function useUpdateAcademicYear(
  options?: UseMutationOptions<
    ApiResponseType<AcademicYearPayload>,
    Error,
    UpdateAcademicYearVariables
  >,
) {
  const mutation = useMutation<
    ApiResponseType<AcademicYearPayload>,
    Error,
    UpdateAcademicYearVariables
  >({
    mutationFn: ({ id, data }) => responseWrapper(academicYearApis.updateAcademicYear, [id, data]),
    ...options,
  });

  return {
    onUpdateAcademicYear: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
