import { useQuery, useQueryClient, UseQueryOptions } from 'react-query';
import { ApiResponseType, TableParams, responseWrapper } from '../helpers';
import { chatApi } from '.';
import { API_CHAT_QUERIES } from './keys';
import { ConversationResponse } from './types';

export function useGetConversationList(
  options?: UseQueryOptions<ApiResponseType<ConversationResponse[]>, Error>,
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetConversationsList,
  } = useQuery<ApiResponseType<ConversationResponse[]>, Error>(
    [API_CHAT_QUERIES.CONVERSATIONS_LIST],
    async ({ queryKey }) => {
      const [, ...params] = queryKey;
      return responseWrapper<ApiResponseType<ConversationResponse[]>>(
        chatApi.getConversationsList,
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

  const handleInvalidateConversationsList = (params?: TableParams) =>
    queryClient.invalidateQueries([API_CHAT_QUERIES.CONVERSATIONS_LIST, { ...params }]);

  const { result: conversations } = data || {};

  return {
    conversations,
    error,
    isFetching,
    onGetConversationsList,
    handleInvalidateConversationsList,
  };
}
