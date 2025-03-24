'use client';

import { Layout, message } from 'antd';
import { BookOutlined, MessageOutlined, GlobalOutlined, RocketOutlined, FileSearchOutlined } from '@ant-design/icons';
import { ReactNode, useState, useEffect } from 'react';
import { installed } from '../../api/user';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

interface MenuItem {
  icon: ReactNode;
  title: string;
  active: boolean;
  id: string;
}

const iconMap: { [key: string]: ReactNode } = {
  'book': <BookOutlined />,
  'message': <MessageOutlined />,
  'global': <GlobalOutlined />,
  'rocket': <RocketOutlined />,
  'search': <FileSearchOutlined />
};

export default function SiderComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInstalledApps = async () => {
      try {
        const response:any = await installed();
        const apps = response.installed_apps.map((item: any, index: number) => ({
          icon: iconMap[item.app.icon] || <RocketOutlined />,
          title: item.app.name,
          active: false,
          id: item.id,
        }));
        if (apps.length > 0) {
          apps[0].active = true;
        }
        setMenuItems(apps);
      } catch (error) {
        message.error('获取助手列表失败');
        console.error('Failed to fetch installed apps:', error);
      }
    };

    fetchInstalledApps();
  }, []);

  const handleMenuClick = (item:any, index: number) => {
    setActiveIndex(index);
    router.push(`/chat/${item.id}`);
  };

  return (
    <>
      <Sider theme="light" width={280} className="fixed left-0 top-0 h-[calc(100vh-64px)] border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuClick(item,index)}
            className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${index === activeIndex ? 'bg-blue-50 text-blue-600 scale-[1.02]' : 'hover:bg-gray-50 hover:scale-[1.01]'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-base font-medium">{item.title}</span>
          </div>
        ))}
        </div>
      </Sider>
    </>
  );
}
