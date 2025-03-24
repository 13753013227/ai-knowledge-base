'use client';

import { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Space, Divider, message } from 'antd';
import { useRouter } from 'next/navigation';
import { login } from '../api/user';
import {
  ContainerOutlined,
  UserOutlined,
  LockOutlined,
  WechatOutlined,
  MobileOutlined,
  TeamOutlined,
} from '@ant-design/icons';

interface LoginForm {
  email: string;
  password: string;
  remember_me: boolean;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      const response: any = await login({
        ...values,
        remember_me: true,
        language: 'zh-Hans',
      });

      
      if (response.result === 'success') {
        // 保存用户信息和token
        localStorage.setItem('console_token', response.data.access_token);
        localStorage.setItem('refresponseh_token', response.data.refresh_token);
        message.success('登录成功');
        router.replace('/');
      } else {
        message.error(response.data);
      }
    } catch (error: any) {
      message.error(error.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {contextHolder}
      {/* 左侧品牌展示区 */}
      <div className="flex-1 bg-gradient-to-b from-blue-500 to-blue-700 p-12 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="space-y-4">
          <h1 className="text-3xl font-light mb-2">logo</h1>
          <h2 className="text-4xl font-bold">知识的力量，尽在掌握</h2>
          <p className="text-lg opacity-80">打造企业知识管理体系，提升团队协作效率</p>
        </div>
        <div className="space-y-8 mb-15">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <ContainerOutlined />
              </div>
              <h3 className="text-xl font-semibold">知识沉淀</h3>
            </div>
            <p className="text-white/80">系统化管理企业知识资产，让知识传承更高效</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <TeamOutlined />
              </div>
              <h3 className="text-xl font-semibold">协同共享</h3>
            </div>
            <p className="text-white/80">打破信息孤岛，实现团队无缝协作</p>
          </div>
        </div>
        <div className="absolute bottom-8 left-12 text-white/60 text-sm">
          © 2024 Knowledge Base. All rights reserved.
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-96 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">欢迎回来</h2>
            <p className="text-gray-500">请使用您的账号密码登录系统</p>
          </div>
          <h2 className="text-2xl font-bold text-center mb-8">账号登录</h2>
          <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} size="large">
            <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱' }]}>
              <Input prefix={<UserOutlined />} placeholder="邮箱" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between">
                <Form.Item name="remember_me" valuePropName="checked" noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
                <a className="text-blue-600">忘记密码？</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-600"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>

            <Divider>其他登录方式</Divider>

            <Space className="w-full justify-center">
              <Button icon={<WechatOutlined />} shape="circle" />
              <Button icon={<MobileOutlined />} shape="circle" />
              <Button icon={<TeamOutlined />} shape="circle" />
            </Space>
          </Form>
        </Card>
      </div>
    </div>
  );
}
