import type { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
// Removed SidebarProvider import as the sidebar component file no longer exists.
// import { SidebarProvider } from '@/components/ui/sidebar';
import NewsletterSignup from './newsletter-signup'; // Added import

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    // Removed SidebarProvider wrapper
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Removed flex container and AppSidebar */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      <NewsletterSignup /> {/* Added Newsletter Signup */}
      <Footer />
    </div>
  );
}

