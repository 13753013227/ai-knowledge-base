'use client';

import { Layout } from 'antd';
import ContentComponent from './components/Content/page';
import HomePage from './home/page';

const { Content } = Layout;

const Home = () => {
  return (
    <Layout className="min-h-screen ">
      <Content className="bg-white  p-8 pt-24">
        {/* <ContentComponent /> */}
        <HomePage />
      </Content>
    </Layout>
  );
};

export default Home;
