import { useState } from 'react';
import { useQuery, UseQueryOptions, useQueryClient } from 'react-query';

import { ApiResponseType, PaginationResponseType, TableParams } from '../helpers';

import { isEmpty } from '@/utils';
import { responseWrapper } from '../helpers';
import { API_ADMINS_QUERIES } from './keys';
import { AdminResponse } from './types';
import { adminsApi } from '.';

export function useGetAdminById(
  options?: UseQueryOptions<ApiResponseType<AdminResponse>, Error> & {
    id: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetAdminsList,
  } = useQuery<ApiResponseType<AdminResponse>, Error>(
    [API_ADMINS_QUERIES.ADMIN_BY_ID, { id: options?.id }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<AdminResponse>>(adminsApi.getAdminById, [options?.id]);
    },

    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options?.id),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidAdminById = () =>
    queryClient.invalidateQueries([API_ADMINS_QUERIES.ADMIN_BY_ID, { id: options?.id }]);
  const { result: admin } = data || {};

  return {
    admin,
    error,
    isFetching,
    onGetAdminsList,
    handleInvalidAdminById,
  };
}
