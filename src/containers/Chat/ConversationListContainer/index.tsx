import { Avatar, Conversation, ConversationList, Search } from '@chatscope/chat-ui-kit-react';
import { useConversationListContainer } from './useConversationListContainer';

const ConversationListContainer = () => {
  const {
    states: { conversations, user },
    handlers: { handleChangeActiveConversation, isActive },
  } = useConversationListContainer();

  return (
    <>
      <Search placeholder="Search..." />
      <ConversationList>
        {conversations?.map((conversation) => (
          <Conversation
            active={isActive(conversation?.userId)}
            info={conversation?.lastMessage?.content}
            key={conversation.id}
            lastSenderName={
              String(conversation?.lastMessage?.senderId) === String(user?.id)
                ? 'You'
                : conversation.fullName
            }
            name={conversation.fullName}
            onClick={() => handleChangeActiveConversation(conversation?.userId)}
          >
            <Avatar name={conversation.fullName} src={conversation?.avatar} status={'dnd'} />
          </Conversation>
        ))}
      </ConversationList>
    </>
  );
};

export default ConversationListContainer;
