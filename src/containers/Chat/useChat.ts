import { useGetChatUserInfo } from '@/queries/Chat/useGetChatUserInfo';
import { useMessageListContainer } from './MessageListContainer/useMessageListContainer';

export const useChat = () => {
  const {
    handlers: { handleSendMessage, setMessage },
    states: { chatMessagesState, user, senderId, message, recipientId },
  } = useMessageListContainer();

  const { chatUserInfo, handleInvalidateChatUserInfo } = useGetChatUserInfo({
    userId: recipientId,
  });

  return {
    states: {
      chatMessagesState,
      user,
      senderId,
      message,
      chatUserInfo,
    },
    handlers: {
      handleSendMessage,
      setMessage,
      handleInvalidateChatUserInfo,
    },
  };
};
