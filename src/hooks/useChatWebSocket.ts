import { useEffect, useState, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Callback } from '@/utils/helpers';

interface ChatUser {
  userId: string | number;
  fullName?: string;
  status?: string;
  avatar?: string;
  [key: string]: any;
}
interface MessageWithSource {
  source: string;
  data: any;
}

interface UseChatWebSocketOptions {
  userId?: string;
  token: string;
  serverUrl: string;
  subscriptionChannels: string[];
  onMessage: (message: any) => void;
  onConnected?: Callback;
}

export const useChatWebSocket = ({
  userId,
  token,
  serverUrl,
  subscriptionChannels,
  onMessage,
  onConnected,
}: UseChatWebSocketOptions) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId || !token || !serverUrl) return;

    const socket = new SockJS(serverUrl);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: () => {},
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        handleConnect(client);
        setIsConnected(true);
        onConnected && onConnected();
      },
      onStompError: (frame) => {
        console.error('❌ Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        setIsConnected(false);
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
      setStompClient(null);
      setIsConnected(false);
    };
  }, [userId, token, serverUrl]);

  const handleConnect = useCallback(
    (client: Client) => {
      if (!client) return;

      subscriptionChannels.forEach((channel) => {
        client.subscribe(channel, (payload) => {
          try {
            const parsedMessage = JSON.parse(payload.body);

            onMessage({
              source: channel,
              data: parsedMessage,
            });
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });
      });
    },
    [subscriptionChannels, onMessage],
  );

  const sendMessage = useCallback(
    (destination: string, body: any) => {
      if (stompClient && isConnected) {
        stompClient.publish({
          destination,
          body: JSON.stringify(body),
        });
        return true;
      }
      return false;
    },
    [stompClient, isConnected],
  );

  const addUserToChat = useCallback(
    (userData: ChatUser) => {
      return sendMessage('/app/user.addUser', userData);
    },
    [sendMessage],
  );

  const disconnectUserFromChat = useCallback(
    (userId: string | number) => {
      return sendMessage('/app/user.disconnectUser', { userId });
    },
    [sendMessage],
  );

  return {
    stompClient,
    isConnected,
    sendMessage,
    addUserToChat,
    disconnectUserFromChat,
  };
};
