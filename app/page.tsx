'use client';

import { Layout } from 'antd';
import SiderComponent from './components/Sider/page';
import RightSider from './components/RightSider/page';
import ContentComponent from './components/Content/page';

const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* <SiderComponent /> */}
      <Content className="p-8 pt-24">
        <ContentComponent />
      </Content>
      {/* <RightSider /> */}
    </Layout>
  );
};

export default Home;
