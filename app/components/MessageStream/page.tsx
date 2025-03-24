'use client';

import { Avatar } from 'antd';
import { RobotOutlined, UserOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

interface MessageStreamProps {
  messages: Message[];
  isThinking?: boolean;
}

export default function MessageStream({ messages, isThinking = false }: MessageStreamProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div key={index} className={`flex items-start gap-3 ${message.role === 'assistant' ? 'bg-gray-50' : ''} p-4 rounded-lg`}>
          <Avatar
            icon={message.role === 'assistant' ? <RobotOutlined /> : <UserOutlined />}
            className={message.role === 'assistant' ? 'bg-blue-500' : 'bg-gray-400'}
          />
          <div className="flex-1 prose max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
      ))}
      {isThinking && (
        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
          <Avatar icon={<RobotOutlined />} className="bg-blue-500" />
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}
    </div>
  );
}
