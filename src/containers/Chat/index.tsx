import { ChatMessageResponse } from '@/queries/Chat/types';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  InfoButton,
  MainContainer,
  MessageInput,
  MessageList,
  Sidebar,
  TypingIndicator,
  VideoCallButton,
  VoiceCallButton,
} from '@chatscope/chat-ui-kit-react';
import { Client } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import ConversationListContainer from './ConversationListContainer';
import { MessageListContainer } from './MessageListContainer';
import { useMessageListContainer } from './MessageListContainer/useMessageListContainer';
import './styles.scss';
import NotFoundPage from '../StartupContainers/NotFoundPage';

const ChatPage: React.FC = () => {
  const { user } = useAuthStore();
  const { senderId = '', recipientId = '' } = useParams();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [message, setMessage] = useState<string>('');
  const {
    handlers: { setChatMessageState },
    states: { chatMessagesState },
  } = useMessageListContainer();

  useEffect(() => {
    const socket = new SockJS('http://localhost:8086/chat-svc/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {},
      connectHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImN1c3RvbUNsYWltIjoiY3VzdG9tIiwic2NvcGUiOiJST0xFX0FETUlOIiwiaXNzIjoidGhhbmh0YW4uY29tIiwiZXhwIjoyMDk5NDY4MTE1LCJpYXQiOjE3Mzk0NjgxMTUsImp0aSI6ImQ3Mzg0ZmRkLTc5MDItNDhiYS1iNDY2LTc1N2IxODRhMjJhNyJ9.5WAqwR_IbuY5cBng7eJAfhf7LprBGPOJCYhuUf3H02YLyKU1LtA4-a5hOCmA6aHqY8P6OMykcPw3k_9fi2mYbg`, // Add token here
      },
      onConnect: () => {
        onConnected(client);
      },
      onStompError: (frame) => {
        console.error('❌ Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const onConnected = (client: Client) => {
    client.subscribe(`/user/${user?.id}/queue/messages`, onMessageReceived);
    client.subscribe(`/user/public`, onMessageReceived);
  };

  const onMessageReceived = (payload: any) => {
    const newMessage = JSON.parse(payload.body);
    setChatMessageState((prev) => [...prev, newMessage]);
  };

  const sendMessage = () => {
    if (stompClient && message.trim()) {
      const chatMessage = {
        senderId: user?.id || '',
        recipientId,
        content: message,
      };
      stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(chatMessage),
      });
      setMessage('');
      setChatMessageState((prev) => [...prev, chatMessage as ChatMessageResponse]);
    }
  };

  if (String(senderId) !== String(user?.id)) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <MainContainer
        responsive
        style={{
          height: '600px',
        }}
      >
        <Sidebar position="left">
          <ConversationListContainer />
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar name="Zoe" src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg" />
            <ConversationHeader.Content info="Active 10 mins ago" userName="Zoe" />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
            <MessageListContainer data={chatMessagesState} />
          </MessageList>
          <MessageInput
            value={message}
            onChange={setMessage}
            onSend={sendMessage}
            placeholder="Type message here"
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatPage;
