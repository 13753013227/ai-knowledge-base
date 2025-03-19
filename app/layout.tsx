import type { Metadata } from "next";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import "./globals.css";
import Navbar from './components/Navbar';


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <ConfigProvider locale={zhCN}>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </ConfigProvider>
      </body>
    </html>
  );
}
