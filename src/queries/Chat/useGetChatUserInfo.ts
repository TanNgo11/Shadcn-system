import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, responseWrapper } from '../helpers';
import { chatApi } from '.';
import { API_CHAT_QUERIES } from './keys';
import { ChatUserInfoResponse } from './types';

export function useGetChatUserInfo(
  options?: UseQueryOptions<ApiResponseType<ChatUserInfoResponse>, Error> & {
    userId: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetChatUserInfo,
  } = useQuery<ApiResponseType<ChatUserInfoResponse>, Error>(
    [API_CHAT_QUERIES.CHAT_USER_INFO, options?.userId],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<ChatUserInfoResponse>>(
        chatApi.getChatUserInformation,
        params,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateChatUserInfo = () =>
    queryClient.invalidateQueries([API_CHAT_QUERIES.CHAT_USER_INFO, options?.userId]);

  const { result: chatUserInfo } = data || {};

  return {
    chatUserInfo,
    error,
    isFetching,
    onGetChatUserInfo,
    handleInvalidateChatUserInfo,
  };
}
