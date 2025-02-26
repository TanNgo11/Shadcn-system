import { useState } from 'react';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';

import { ApiResponseType, PaginationResponseType, TableParams, responseWrapper } from '../helpers';

import { isEmpty } from '@/utils';
import { semesterApi } from '.';
import { API_KEY } from './keys';
import { SemesterResponse } from './types';

export function useGetSemesterList(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<SemesterResponse[]>>, Error> & {
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetSemesterList,
  } = useQuery<ApiResponseType<PaginationResponseType<SemesterResponse[]>>, Error>(
    [API_KEY.SEMESTER_LIST, { ...params }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<SemesterResponse[]>>>(
        semesterApi.getSemesterList,
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

  const handleInvalidateSemesterList = (params: TableParams) =>
    queryClient.invalidateQueries([API_KEY.SEMESTER_LIST, { ...params }]);

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
