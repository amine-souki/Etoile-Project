import type { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './app-sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
