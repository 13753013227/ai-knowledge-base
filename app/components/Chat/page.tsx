'use client';

import { Button } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
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


  const barAvatar: React.CSSProperties = {
    color: '#fff',
    backgroundColor: '#87d068',
  };
  
  const handleNewConversation = () => {
    // TODO: 实现新建对话逻辑
    console.log('新建对话');
  };

  const [conversationId, setConversationId] = useState<string>('');

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
        conversation_id: conversationId,
        files: [],
        query: inputMessage,
        inputs: {},
        parent_message_id: null
      };
      // const response = await sendMessage(assistantId, params); // TODO: 实现发送消息逻辑
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: '',
        timestamp: new Date().toISOString(),
        sender: 'ai'
      };
      setCurrentMessages(prev => [...prev, aiMessage]);

      console.log('9999999999999999999999999999',currentMessages);
      

      const response = await fetch(`http://192.168.8.100/console/api/installed-apps/${assistantId}/chat-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('console_token')}`
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is null');
      }

      let buffer = '';
      let accumulatedAnswer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += new TextDecoder().decode(value);
        
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          
          const dataMatch = line.match(/^data: (.+)$/);
          if (!dataMatch) continue;
          
          try {
            const data = JSON.parse(dataMatch[1]);
            if (data.event === 'message') {
              if (data.conversation_id) {
                setConversationId(data.conversation_id);
              }
              if (data.answer) {
                const decodedAnswer = decodeURIComponent(data.answer);
                accumulatedAnswer += decodedAnswer;
                setCurrentMessages(prev => {
                  const updatedMessages = [...prev];
                  const aiMessageIndex = updatedMessages.findIndex(msg => msg.id === aiMessage.id);
                  if (aiMessageIndex !== -1) {
                    updatedMessages[aiMessageIndex] = {
                      ...updatedMessages[aiMessageIndex],
                      content: accumulatedAnswer
                    };
                  }
                  return updatedMessages;
                });
              }
            }
          } catch (error) {
            console.error('Failed to parse message:', error);
          }
        }
      }

      reader.releaseLock();
    } catch (error) {
      console.error('Failed to send message:', error);
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
            className="w-60"
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
      <div className="flex-1 flex flex-col h-[600px]">
        {/* 聊天标题 */}
        <AssistantInfo />

        {/* 消息列表 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {currentMessages.map((message) => (
              <Bubble
                key={message.id}
                placement={message.sender === 'user' ? 'end' : 'start'}
                content={message.content}
                avatar={{ icon: <UserOutlined />, style: barAvatar }}
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
