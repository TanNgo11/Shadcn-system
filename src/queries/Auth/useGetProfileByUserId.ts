import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { isEmpty } from '@/utils';
import { authApi } from '.';
import { StudentResponse } from '../Students/types';
import { API_AUTH_QUERIES } from './keys';

export function useGetProfileByUserId<T = StudentResponse>(
  options?: UseQueryOptions<ApiResponseType<T>, Error> & {
    id: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetProfileByUserId,
  } = useQuery<ApiResponseType<T>, Error>(
    [API_AUTH_QUERIES.PROFILE_BY_USER_ID, { id: options?.id }],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<T>>(authApi.getProfileByUserId, [options?.id]);
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options?.id),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidProfileByUserId = () =>
    queryClient.invalidateQueries([API_AUTH_QUERIES.PROFILE_BY_USER_ID, { id: options?.id }]);

  const { result: profile } = data || {};

  return {
    profile: profile,
    error,
    isFetching,
    onGetProfileByUserId,
    handleInvalidProfileByUserId,
  };
}
