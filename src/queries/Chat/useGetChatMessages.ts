import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';

import { ApiResponseType } from '../helpers';

import { chatApi } from '.';
import { responseWrapper } from '../helpers';
import { API_CHAT_QUERIES } from './keys';
import { ChatMessageResponse } from './types';

export function useGetChatMessages(
  options?: UseQueryOptions<ApiResponseType<ChatMessageResponse[]>, Error> & {
    senderId: string;
    recipientId: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetChatMessages,
  } = useQuery<ApiResponseType<ChatMessageResponse[]>, Error>(
    [API_CHAT_QUERIES.CHAT_MESSAGES, options?.senderId, options?.recipientId],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<ChatMessageResponse[]>>(
        chatApi.getChatMessagesBySenderIdAndRecipientId,
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

  const handleInvalidateChatMessages = () =>
    queryClient.invalidateQueries([API_CHAT_QUERIES.CHAT_MESSAGES]);

  const { result: chatMessages } = data || {};

  return {
    chatMessages,
    error,
    isFetching,
    onGetChatMessages,
    handleInvalidateChatMessages,
  };
}
