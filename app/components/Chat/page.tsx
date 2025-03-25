'use client';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Sender, Bubble } from '@ant-design/x';
import { useState } from 'react';
import { sendMessage, Message as ApiMessage, SendMessageParams } from '../../api/chat';
import AssistantInfo from './AssistantInfo';

interface ChatProps {
  title: string;
  assistantId: string;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

type Message = ApiMessage;

export default function ChatComponent({ title, assistantId }: ChatProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleNewConversation = () => {
    // TODO: 实现新建对话逻辑
    console.log('新建对话');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      timestamp: new Date().toISOString(),
      sender: 'user'
    };

    setCurrentMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const params: SendMessageParams = {
        response_mode: 'streaming',
        conversation_id: 'default',
        files: [],
        query: inputMessage,
        inputs: {},
        parent_message_id: null
      };

      const response = await sendMessage(assistantId, params);
      setCurrentMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // TODO: 添加错误提示
    }
  };

  return (
    <div className="flex h-full">
      {/* 左侧历史对话列表 */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-center">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleNewConversation}
            className="w-64 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 rounded-md py-1.5"
          >
            开启新对话
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {conversations.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              暂无历史对话
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="text-base font-medium mb-2">{conversation.title}</div>
                  <div className="text-sm text-gray-600">
                    {conversation.lastMessage}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    {conversation.timestamp}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 右侧聊天区域 */}
      <div className="flex-1 flex flex-col">
        {/* 聊天标题 */}
        <AssistantInfo />

        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto p-4 h-[600px]">
          <div className="space-y-4">
            {currentMessages.map((message) => (
              <Bubble
                key={message.id}
                type={message.sender === 'user' ? 'primary' : 'secondary'}
                placement={message.sender === 'user' ? 'right' : 'left'}
                content={message.content}
              />
            ))}
          </div>
        </div>

        {/* 输入框 */}
        <div className="p-4 border-t border-gray-200">
          <Sender
            value={inputMessage}
            onChange={setInputMessage}
            onSubmit={handleSendMessage}
            placeholder="输入消息..."
          />
        </div>
      </div>
    </div>
  );
}
