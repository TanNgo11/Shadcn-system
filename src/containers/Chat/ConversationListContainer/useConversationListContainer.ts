import { useGetConversationList } from '@/queries/Chat/useGetConversationList';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { useNavigate, useParams } from 'react-router-dom';

export const useConversationListContainer = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { conversations } = useGetConversationList();
  const { senderId = '', recipientId: currentRecipientId = '' } = useParams();

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
    handlers: { handleChangeActiveConversation, isActive },
  };
};
