import { ApiResponseType, responseWrapper } from '../helpers';
import { UseMutationOptions, useMutation } from 'react-query';
import { AcademicYearPayload, DeleteAcademicYearVariables } from './types';
import { academicYearApis } from '.';

export function useDeleteAcademicYears(
  options?: UseMutationOptions<
    ApiResponseType<AcademicYearPayload>,
    Error,
    DeleteAcademicYearVariables
  >,
) {
  const { mutate: onDeleteAcademicYear, isLoading: isDeletingAcademicYear } = useMutation<
    ApiResponseType<AcademicYearPayload>,
    Error,
    DeleteAcademicYearVariables
  >({
    mutationFn: ({ id }) => responseWrapper(academicYearApis.deleteAcademicYear, [id]),
    ...options,
  });

  return {
    onDeleteAcademicYear,
    isDeletingAcademicYear,
  };
}
