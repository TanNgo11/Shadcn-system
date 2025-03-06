import { Avatar, Conversation, ConversationList, Search } from '@chatscope/chat-ui-kit-react';
import { useConversationListContainer } from './useConversationListContainer';
import Title from 'antd/es/typography/Title';

const ConversationListContainer = () => {
  const {
    states: { conversations, user },
    handlers: { handleChangeActiveConversation, isActive, checkIsOnline },
  } = useConversationListContainer();

  return (
    <>
      <Title style={{ padding: '4px 10px', marginBottom: '4px' }} level={3}>
        Conversations
      </Title>
      <Search placeholder="Search..." />
      <ConversationList>
        {conversations?.map((conversation) => (
          <Conversation
            active={isActive(conversation?.userId)}
            info={conversation?.lastMessage?.content}
            key={`${conversation.id}-${conversation.userId}`}
            lastSenderName={
              String(conversation?.lastMessage?.senderId) === String(user?.id)
                ? 'You'
                : conversation.fullName
            }
            name={conversation.fullName}
            onClick={() => handleChangeActiveConversation(conversation?.userId)}
          >
            <Avatar
              name={conversation.fullName}
              src={conversation?.avatar}
              status={checkIsOnline(conversation?.status)}
            />
          </Conversation>
        ))}
      </ConversationList>
    </>
  );
};

export default ConversationListContainer;
