'use client';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface ChatProps {
  title: string;
}

export default function ChatComponent({ title }: ChatProps) {
  const [conversations, setConversations] = useState<any[]>([]);

  const handleNewConversation = () => {
    // TODO: 实现新建对话逻辑
    console.log('新建对话');
  };

  return (
      <div className="flex flex-col h-full">
        {/* 新建对话按钮 */}
        <div className="p-4 border-b border-gray-200">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleNewConversation}
            className="w-full"
          >
            开启新对话
          </Button>
        </div>

        {/* 历史对话列表 */}
        <div className="flex-1 overflow-y-auto p-4">
          {conversations.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              暂无历史对话
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conversation, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  {/* TODO: 展示对话内容 */}
                  <div className="text-sm text-gray-600">
                    最近一条对话内容
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    2024-01-01 12:00:00
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}
