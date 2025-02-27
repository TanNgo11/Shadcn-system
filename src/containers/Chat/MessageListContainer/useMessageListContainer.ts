import { ChatMessageResponse } from '@/queries/Chat/types';
import { useGetChatMessages } from '@/queries/Chat/useGetChatMessages';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useMessageListContainer = () => {
  const { senderId = '', recipientId = '' } = useParams();
  const { user } = useAuthStore();
  const [chatMessagesState, setChatMessageState] = useState<ChatMessageResponse[]>([]);

  const { chatMessages, handleInvalidateChatMessages } = useGetChatMessages({
    senderId,
    recipientId,
  });

  useEffect(() => {
    if (chatMessages) {
      setChatMessageState(chatMessages);
    }
  }, [chatMessages]);

  return {
    states: {
      chatMessages,
      senderId,
      recipientId,
      user,
      chatMessagesState,
    },
    handlers: { handleInvalidateChatMessages, setChatMessageState },
  };
};
