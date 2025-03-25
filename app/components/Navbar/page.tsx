'use client';

import { Layout, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const { Header } = Layout;

export default function Navbar() {
  const [userInfo, setUserInfo] = useState({
    avatar: '',
    username: '管理员'
  });

  useEffect(() => {
    // 从localStorage获取用户信息
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    router.push('/login');
  };

  const userMenuItems:any = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout
    },
  ];

  return (
    <div className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] h-16 px-8 flex items-center justify-between fixed w-full z-10">
      <div className="flex items-center">
        <Link href="/home" className="flex items-center gap-3">
          <span className="text-2xl font-bold text-blue-600 tracking-tight">logo</span>
          <span className="text-lg font-medium text-gray-800">远禾大模型知识库</span>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Dropdown
          menu={{
            items: userMenuItems,
            className: 'mt-1 min-w-[160px]'
          }}
          placement="bottomRight"
          arrow
        >
          <Space className="cursor-pointer hover:bg-gray-50 py-2 px-3 rounded-lg transition-colors">
            <Avatar
              src={userInfo.avatar || undefined}
              icon={!userInfo.avatar && <UserOutlined />}
              className="bg-blue-100"
              size={32}
            />
            <span className="text-gray-700">{userInfo.username}</span>
          </Space>
        </Dropdown>
      </div>
    </div>
  );
}
