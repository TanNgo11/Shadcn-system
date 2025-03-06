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
import type { UploadProps } from 'antd';
import { Flex, message as messageAntd } from 'antd';
import React from 'react';
import NotFoundPage from '../StartupContainers/NotFoundPage';
import ConversationListContainer from './ConversationListContainer';
import { MessageListContainer } from './MessageListContainer';
import './styles.scss';
import { useChat } from './useChat';
import CustomMessageInput from './CustomMessageInput';
const ChatPage: React.FC = () => {
  const {
    handlers: { handleSendMessage, setMessage },
    states: { chatMessagesState, user, senderId, message, chatUserInfo },
  } = useChat();

  if (String(senderId) !== String(user?.id)) {
    return <NotFoundPage />;
  }
  const props: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        messageAntd.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        messageAntd.error(`${info.file.name} file upload failed.`);
      }
    },
  };

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
          {/* <MessageInput
            value={message}
            onChange={setMessage}
            onSend={handleSendMessage}
            placeholder="Type message here"
            onAttachClick={() => {}}
          /> */}
          <span style={{ color: 'red', fontSize: '20px' }}>ngothanhtan</span>
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatPage;
