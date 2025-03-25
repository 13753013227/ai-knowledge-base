'use client';

import { Layout } from 'antd';
import { useEffect } from 'react';

const { Content } = Layout;

export default function Home() {
  return (
    <Layout className="min-h-screen">
      <Content className="bg-white p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">欢迎使用 AI 知识库</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">快速开始</h2>
              <p className="text-gray-600">选择左侧的AI助手开始对话，或创建新的知识库开始你的AI之旅。</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">最近更新</h2>
              <p className="text-gray-600">查看最新的AI助手和知识库更新，了解系统的最新功能。</p>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
