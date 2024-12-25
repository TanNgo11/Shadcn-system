import { useQuery, UseQueryOptions, useQueryClient } from 'react-query';

import { ApiResponseType } from '../helpers';

import { responseWrapper } from '../helpers';
import { API_ADMINS_QUERIES } from './keys';
import { AdminResponse } from './types';
import { adminsApi } from '.';

export function useGetCurrentAdminInfo(
  options?: UseQueryOptions<ApiResponseType<AdminResponse>, Error>,
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetCurrentAdminInfo,
  } = useQuery<ApiResponseType<AdminResponse>, Error>(
    [API_ADMINS_QUERIES.CURRENT_ADMIN, {}],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<AdminResponse>>(adminsApi.getCurrentAdminInfo, []);
    },

    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: true,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidCurrentAdmin = () =>
    queryClient.invalidateQueries([API_ADMINS_QUERIES.CURRENT_ADMIN]);
  const { result: admin } = data || {};

  return {
    admin,
    error,
    isFetching,
    onGetCurrentAdminInfo,
    handleInvalidCurrentAdmin,
  };
}
