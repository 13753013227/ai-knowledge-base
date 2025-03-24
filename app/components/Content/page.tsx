'use client';

import { useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import MessageStream from '../MessageStream/page';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export default function ContentComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    // TODO: 实现与后端的通信
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: '我是远禾大模型助手，很高兴为您服务。您可以询问我关于公司制度的任何问题。'
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-6">欢迎使用远禾大模型助手</h1>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">使用说明</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  <p>AI 可以回答与公司制度相关的问题，包括但不限于：公司规章制度、工作流程、人事制度等。</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  <p>人事管理制度：包括考勤、请假、加班、调休等相关规定。</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  <p>点击下方输入框，输入您的问题即可开始对话。</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MessageStream messages={messages} isThinking={isThinking} />
        )}
      </div>
      <div className="border-t p-4 bg-white">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input.TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入您的问题..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!input.trim()}
          />
        </div>
      </div>
    </div>
  );
}
