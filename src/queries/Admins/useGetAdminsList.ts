import { useState } from 'react';
import { useQuery, UseQueryOptions, useQueryClient } from 'react-query';

import { ApiResponseType, PaginationResponseType, TableParams } from '../helpers';

import { isEmpty } from '@/utils';
import { responseWrapper } from '../helpers';
import { API_ADMINS_QUERIES } from './keys';
import { AdminResponse } from './types';
import { adminsApi } from '.';

export function useGetAdminsList(
  options?: UseQueryOptions<ApiResponseType<PaginationResponseType<AdminResponse[]>>, Error> & {
    defaultParams?: TableParams;
  },
) {
  const [params, setParams] = useState<TableParams>(options?.defaultParams || {});
  const {
    data,
    error,
    isFetching,
    refetch: onGetAdminsList,
  } = useQuery<ApiResponseType<PaginationResponseType<AdminResponse[]>>, Error>(
    [API_ADMINS_QUERIES.ADMINS_LIST, { ...params }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<PaginationResponseType<AdminResponse[]>>>(
        adminsApi.getAdminsList,
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

  const handleInvalidateAdminsList = (params?: TableParams) =>
    queryClient.invalidateQueries([API_ADMINS_QUERIES.ADMINS_LIST, { ...params }]);

  const { result: { totalPages, pageSize, totalElements, data: admins = [] } = {} } = data || {};

  return {
    totalElements,
    pageSize,
    totalPages,
    admins,
    error,
    isFetching,
    onGetAdminsList,
    setParams,
    handleInvalidateAdminsList,
  };
}
