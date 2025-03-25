import request from '../utils/request';

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'ai';
}

export interface ChatMessagesResponse {
  messages: Message[];
  total: number;
}

export interface SendMessageParams {
  response_mode: string;
  conversation_id: string;
  files: any[];
  query: string;
  inputs: Record<string, any>;
  parent_message_id: string | null;
}


// 发送消息
export const sendMessage = (assistantId: string, params: SendMessageParams) => {
  return request.post<Message>(`/installed-apps/${assistantId}/chat-messages`, params);
};

// 获取聊天历史记录
export const getChatMessages = (assistantId: string, params: SendMessageParams, page = 1, pageSize = 20) => {
  return request.post<ChatMessagesResponse>(`/installed-apps/${assistantId}/chat-messages`, {
    ...params,
    page,
    pageSize
  });
};
export interface Conversation {
  id: string;
  name: string;
  created_at: string;
  pinned: boolean;
}

export interface ConversationsResponse {
  conversations: Conversation[];
  total: number;
}

// 获取会话列表
export const getConversations = (assistantId: string, limit = 100, pinned = false) => {
  return request.get<ConversationsResponse>(`/installed-apps/${assistantId}/conversations`, {
    params: {
      limit,
      pinned
    }
  });
};
