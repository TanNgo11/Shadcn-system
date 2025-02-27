export interface ConversationResponse {
  id: string;
  userId: string;
  fullName: string;
  status: string;
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
