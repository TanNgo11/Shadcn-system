import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { adminsApi } from '.';
import { ApiResponseType, responseWrapper } from '../helpers';
import { API_ADMINS_QUERIES } from './keys';
import { AdminResponse } from './types';

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
