import { Message, MessageSeparator } from '@chatscope/chat-ui-kit-react';
import { useMessageListContainer } from './useMessageListContainer';
import { ChatMessageResponse } from '@/queries/Chat/types';

type MessageListContainerProps = {
  data: ChatMessageResponse[];
};

export const MessageListContainer = ({ data }: MessageListContainerProps) => {
  const {
    states: { recipientId, user },
  } = useMessageListContainer();

  return (
    <>
      <MessageSeparator content="Saturday, 30 November 2019" />
      {data?.map((message) => (
        <Message
          key={message.id}
          model={{
            direction: String(message.senderId) === String(user?.id) ? 'outgoing' : 'incoming',
            message: message.content,
            position: 'single',
            sender: message.senderId === recipientId ? 'Patrik' : 'Zoe',
            sentTime: '15 mins ago',
          }}
        />
      ))}
    </>
  );
};
