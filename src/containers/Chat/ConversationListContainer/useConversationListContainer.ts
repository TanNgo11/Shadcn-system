import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import { ConversationResponse } from '@/queries/Chat/types';
import { useGetConversationList } from '@/queries/Chat/useGetConversationList';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ONLINE_STATUS } from '../../../zustand/auth/types';

export const useConversationListContainer = () => {
  const navigate = useNavigate();
  const { user, accessTokenState } = useAuthStore();
  const { senderId = '', recipientId: currentRecipientId = '' } = useParams();
  const [conversations, setConversations] = useState<ConversationResponse[]>();
  useGetConversationList({
    onSuccess: (data) => {
      setConversations(data.result || []);
    },
  });

  useChatWebSocket({
    userId: user?.id?.toString(),
    token: String(accessTokenState),
    serverUrl: 'http://localhost:8086/chat-svc/ws',
    subscriptionChannels: [`/user/${user?.id}/queue/messages`, '/user/public'],
    onMessage: (message) => {
      if (message.source === '/user/public') {
        console.log('Public message received:', message.data);
        setConversations((currentConversations) => {
          const filteredConversations = (currentConversations || []).filter(
            (conversation) => String(conversation.userId) !== String(message.data.userId),
          );
          return [...filteredConversations, message.data];
        });
      }
    },
  });

  const checkIsOnline = (status: ONLINE_STATUS) => {
    if (status === ONLINE_STATUS.ONLINE) return 'available';
    return 'invisible';
  };

  const handleChangeActiveConversation = (recipientId: string) => {
    navigate(`/chat/${user?.id}/${recipientId}`);
  };
  const isActive = (recipientId: string) => {
    return recipientId === currentRecipientId;
  };

  return {
    states: {
      conversations,
      user,
    },
    handlers: { handleChangeActiveConversation, isActive, checkIsOnline },
  };
};
