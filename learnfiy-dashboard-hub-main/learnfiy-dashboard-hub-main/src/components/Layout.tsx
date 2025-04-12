
import React from 'react';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { AppHeader } from './AppHeader';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className={`flex-1 ${isMobile ? 'ml-0' : 'ml-64'} transition-all duration-300`}>
        <div className="container mx-auto p-4 md:p-6">
          <AppHeader title={title} />
          {children}
        </div>
      </main>
    </div>
  );
};
