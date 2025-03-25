'use client';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import "./globals.css";
import Navbar from './components/Navbar/page';
import { usePathname } from 'next/navigation';
import Sider from './components/Sider/page';
import RightSider from './components/RightSider/page';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showNavbar = pathname !== '/login';
  const showHomeNavbar = pathname!== '/home';

  return (
    <html lang="zh-CN">
      <body>
        <ConfigProvider locale={zhCN}>
          {showNavbar && <Navbar />}
          <main className={showNavbar ? 'pt-16 flex' : ''}>
            {showNavbar && <Sider />}
            <div className="flex-1">
              {children}
            </div>
            {showNavbar && showHomeNavbar && <RightSider />}
          </main>
        </ConfigProvider>
      </body>
    </html>
  );
}
