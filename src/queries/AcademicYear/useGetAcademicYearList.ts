import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';
import { AcademicYearResponse } from './types';
import { useState } from 'react';
import { API_ACADEMIC_YEAR } from './keys';
import { academicYearApis } from '.';
import { isEmpty } from '@/utils';

export function useGetAcademicYearList(
  options?: UseQueryOptions<
    ApiResponseType<PaginationResponseType<AcademicYearResponse[]>>,
    Error
  > & {
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetAcademicYearList,
  } = useQuery<ApiResponseType<PaginationResponseType<AcademicYearResponse[]>>, Error>(
    [API_ACADEMIC_YEAR.ACADEMIC_YEAR_LIST, { ...params }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<AcademicYearResponse[]>>>(
        academicYearApis.getAcademicYearList,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(params),
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateAcademicYearList = (params?: TableParams) =>
    queryClient.invalidateQueries([API_ACADEMIC_YEAR.ACADEMIC_YEAR_LIST, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: academicYears = [] } = {} } =
    data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    academicYears,
    error,
    isFetching,
    onGetAcademicYearList,
    setParams,
    handleInvalidateAcademicYearList,
  };
}
