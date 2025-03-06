import { ONLINE_STATUS } from '@/zustand/auth/types';

export interface ConversationResponse {
  id: string;
  userId: string;
  fullName: string;
  status: ONLINE_STATUS;
  avatar: string;
  lastMessage: ChatMessageResponse;
}
export interface ChatMessageResponse {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
}

export type ChatUserInfoResponse = {
  id: string;
  userId: string;
  fullName: string;
  status: ONLINE_STATUS;
  avatar: string;
};
