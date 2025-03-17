import { authApi } from '@/queries/Auth';
import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { User } from '@/zustand/auth/types';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { API_AUTH_QUERIES } from './keys';

export function useGetUserInfo(
  options?: UseQueryOptions<ApiResponseType<User>, Error, User> & {
    enabled?: boolean;
  },
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetUserInfo,
  } = useQuery<ApiResponseType<User>, Error, User>(
    [API_AUTH_QUERIES.USER_INFO],
    () => responseWrapper<ApiResponseType<User>>(authApi.getUserInfo),
    {
      select: (data) => data?.result,
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: options?.enabled,
      keepPreviousData: true,
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateUserInfo = () => queryClient.invalidateQueries(API_AUTH_QUERIES.USER_INFO);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetUserInfo,
    handleInvalidateUserInfo,
  };
}
