import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';

import { ApiResponseType, PaginationResponseType, responseWrapper, TableParams } from '../helpers';

import { semesterApi } from '.';
import { API_KEY } from './keys';
import { SemesterResponse } from './types';
import { isEmpty } from '@/utils';

export function useGetSemesterList(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<SemesterResponse[]>>, Error> & {
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams);

  const {
    data,
    error,
    isFetching,
    refetch: onGetSemesterList,
  } = useQuery<ApiResponseType<PaginationResponseType<SemesterResponse[]>>, Error>(
    [API_KEY.SEMESTER_LIST, { ...params }],
    async ({ queryKey }) => {
      const [, ...queryParams] = queryKey as [string, TableParams];
      return responseWrapper<ApiResponseType<PaginationResponseType<SemesterResponse[]>>>(
        semesterApi.getSemesterList,
        queryParams,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(params?.academicYearId),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateSemesterList = (invalidateParams: TableParams) =>
    queryClient.invalidateQueries([API_KEY.SEMESTER_LIST, { ...invalidateParams }]);

  const { result: { current, totalPages, pageSize, totalElements, data: semesters = [] } = {} } =
    data || {};

  return {
    current,
    totalElements,
    pageSize,
    totalPages,
    semesters,
    error,
    isFetching,
    onGetSemesterList,
    setParams,
    handleInvalidateSemesterList,
  };
}
