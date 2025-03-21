'use client';

import { Layout } from 'antd';
import { BookOutlined, MessageOutlined, GlobalOutlined, RocketOutlined, FileSearchOutlined } from '@ant-design/icons';
import { ReactNode, useState } from 'react';

const { Sider } = Layout;

interface MenuItem {
  icon: ReactNode;
  title: string;
  active: boolean;
}

// 模拟后端API返回的数据
const mockApiResponse = (): MenuItem[] => [
  {
    icon: <BookOutlined />,
    title: '公司制度 AI 助手',
    active: true
  },
  {
    icon: <MessageOutlined />,
    title: '智能聊天 AI 助手',
    active: false
  },
  {
    icon: <GlobalOutlined />,
    title: '国际标准 AI 助手',
    active: false
  },
  {
    icon: <RocketOutlined />,
    title: '法律法规 AI 助手',
    active: false
  },
  {
    icon: <FileSearchOutlined />,
    title: '知识搜索 AI 助手',
    active: false
  }
];

export default function SiderComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const menuItems = mockApiResponse();

  const handleMenuClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Sider theme="light" width={280} className="fixed left-0 top-0 h-[calc(100vh-64px)] border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuClick(index)}
            className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${index === activeIndex ? 'bg-blue-50 text-blue-600 scale-[1.02]' : 'hover:bg-gray-50 hover:scale-[1.01]'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-base font-medium">{item.title}</span>
          </div>
        ))}
      </div>
    </Sider>
  );
}
