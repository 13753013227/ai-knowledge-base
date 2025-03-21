'use client';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import "./globals.css";
import Navbar from './components/Navbar/page';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavbar = pathname !== '/login';

  return (
    <html lang="zh-CN">
      <body>
        <ConfigProvider locale={zhCN}>
          {showNavbar && <Navbar />}
          <main className={showNavbar ? 'pt-16' : ''}>
            {children}
          </main>
        </ConfigProvider>
      </body>
    </html>
  );
}
