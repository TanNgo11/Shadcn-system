import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  InfoButton,
  MainContainer,
  MessageInput,
  MessageList,
  Sidebar,
  VideoCallButton,
  VoiceCallButton,
} from '@chatscope/chat-ui-kit-react';
import React from 'react';
import NotFoundPage from '../StartupContainers/NotFoundPage';
import ConversationListContainer from './ConversationListContainer';
import { MessageListContainer } from './MessageListContainer';
import './styles.scss';
import { useChat } from './useChat';
const ChatPage: React.FC = () => {
  const {
    handlers: { handleSendMessage, setMessage },
    states: { chatMessagesState, user, senderId, message, chatUserInfo },
  } = useChat();

  if (String(senderId) !== String(user?.id)) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <MainContainer
        responsive
        style={{
          height: '92vh',
        }}
      >
        <Sidebar position="left">
          <ConversationListContainer />
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar name={chatUserInfo?.fullName} src={chatUserInfo?.avatar} />
            <ConversationHeader.Content
              info="Active 10 mins ago"
              userName={chatUserInfo?.fullName}
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            <MessageListContainer data={chatMessagesState} />
          </MessageList>
          <MessageInput
            value={message}
            onChange={setMessage}
            onSend={handleSendMessage}
            placeholder="Type message here"
            onAttachClick={() => {}}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatPage;
