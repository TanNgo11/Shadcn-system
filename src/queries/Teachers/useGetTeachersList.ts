import { useState } from 'react';
import { useQuery, UseQueryOptions, useQueryClient } from 'react-query';

import { ApiResponseType, PaginationResponseType, TableParams } from '../helpers';

import { isEmpty } from '@/utils';
import { responseWrapper } from '../helpers';
import { API_TEACHERS_QUERIES } from './keys';
import { TeacherResponse } from './types';
import { teachersApi } from '.';

export function useGetTeachersList(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<TeacherResponse[]>>, Error> & {
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetTeachersList,
  } = useQuery<ApiResponseType<PaginationResponseType<TeacherResponse[]>>, Error>(
    [API_TEACHERS_QUERIES.TEACHERS_LIST, { ...params }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<TeacherResponse[]>>>(
        teachersApi.getTeachersList,
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

  const handleInvalidateTeachersList = (params: TableParams) =>
    queryClient.invalidateQueries([API_TEACHERS_QUERIES.TEACHERS_LIST, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: teachers = [] } = {} } = data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    teachers,
    error,
    isFetching,
    onGetTeachersList,
    setParams,
    handleInvalidateTeachersList,
  };
}
