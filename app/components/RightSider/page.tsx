'use client';

import { Layout } from 'antd';
import { BookOutlined } from '@ant-design/icons';

const { Sider } = Layout;

interface KnowledgeItem {
  title: string;
  creator: string;
  createTime: string;
}

// 模拟知识库数据
const mockKnowledgeList: KnowledgeItem[] = [
  {
    title: '基础工程设计规范',
    creator: '张建国',
    createTime: '2023-12-01'
  },
  {
    title: '混凝土施工手册',
    creator: '王工',
    createTime: '2023-11-28'
  },
  {
    title: '钢筋工技术指南',
    creator: '王成龙',
    createTime: '2023-11-25'
  },
  {
    title: '绿矿安全生产规则',
    creator: '刘小明',
    createTime: '2023-11-20'
  },
  {
    title: '员工考核评价制度',
    creator: '刘丽萍',
    createTime: '2023-11-14'
  },
  {
    title: '绩效奖金分配办法',
    creator: '刘建文',
    createTime: '2023-11-10'
  },
  {
    title: '矿井通风技术规范',
    creator: '刘伟东',
    createTime: '2023-11-05'
  },
  {
    title: '职场晋升管理办法',
    creator: '陈志远',
    createTime: '2023-10-30'
  }
];

export default function RightSider() {
  return (
    <Sider theme="light" width={280} className="fixed right-0 top-0 h-[calc(100vh-64px)] border-l border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-3">
            <BookOutlined className="text-blue-500" />
            参考知识库
          </h2>
        </div>
        <div className="space-y-4">
          {mockKnowledgeList.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-300"
            >
              <div className="text-base font-medium text-gray-900 mb-2">{item.title}</div>
              <div className="text-sm text-gray-400 flex justify-between">
                <span>创建人：{item.creator}</span>
                <span>{item.createTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sider>
  );
}
