import { ApiResponseType, responseWrapper } from '@/queries/helpers';
import { API_QUERIES } from '@/queries/keys';
import { User } from '@/zustand/auth/types';
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { authApi } from '@/queries/Auth';

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
  } = useQuery<ApiResponseType<User>, Error, User>([API_QUERIES._IDENTITY], {
    queryFn: () => {
      return responseWrapper<ApiResponseType<User>>(authApi.getUserInfo);
    },
    select: (data) => data?.result || {},
    notifyOnChangeProps: ['data', 'isFetching'],
    enabled: options?.enabled,
    keepPreviousData: true,
    ...options,
  });
  const queryClient = useQueryClient();

  const handleInvalidateUserInfo = () => queryClient.invalidateQueries(API_QUERIES._IDENTITY);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetUserInfo,
    handleInvalidateUserInfo,
  };
}
