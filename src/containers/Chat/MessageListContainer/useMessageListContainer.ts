import {useChatWebSocket} from '@/hooks/useChatWebSocket';
import {ChatMessageResponse} from '@/queries/Chat/types';
import {useGetChatMessages} from '@/queries/Chat/useGetChatMessages';
import {useAuthStore} from '@/zustand/auth/useAuthStore';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

export const useMessageListContainer = () => {
	const {senderId = '', recipientId = ''} = useParams();
	const {user, accessTokenState} = useAuthStore();
	const [message, setMessage] = useState<string>('');
	const [chatMessagesState, setChatMessagesState] = useState<ChatMessageResponse[]>([]);

	const {chatMessages, handleInvalidateChatMessages} = useGetChatMessages({
		senderId,
		recipientId,
	});

	const {sendMessage} = useChatWebSocket({
		userId: user?.id?.toString(),
		token: String(accessTokenState),
		serverUrl: 'http://localhost:8086/chat-svc/ws',
		subscriptionChannels: [`/user/${user?.id}/queue/messages`, '/user/public'],
		onMessage: (message) => {
			if (message.source === `/user/${user?.id}/queue/messages`)
				setChatMessagesState((prev) => [...prev, message.data] as ChatMessageResponse[]);
			else if (message.source === '/user/public') { /* empty */
			}
		},
	});

	const handleSendMessage = () => {
		if (message.trim()) {
			const chatMessage = {
				senderId: user?.id ?? '',
				recipientId: recipientId,
				content: message,
			};

			const sent = sendMessage('/app/chat', chatMessage);
			if (sent) {
				setMessage('');
				setChatMessagesState((prev) => [...prev, chatMessage] as ChatMessageResponse[]);
			}
		}
	};

	useEffect(() => {
		if (chatMessages) {
			setChatMessagesState(chatMessages);
		}
	}, [chatMessages]);

	return {
		states: {
			message,
			chatMessages,
			senderId,
			recipientId,
			user,
			chatMessagesState,
		},
		handlers: {
			handleInvalidateChatMessages,
			setChatMessagesState,
			handleSendMessage,
			setMessage,
		},
	};
};
