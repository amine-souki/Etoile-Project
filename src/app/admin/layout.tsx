
import type { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/admin-sidebar';
// AdminHeader will be part of each page content for now, or could be integrated here if layout structure changes

export const metadata = {
  title: 'ESS Admin - Panneau d\'administration',
  description: 'Panneau d\'administration pour Etoile Sportive Du Sahel',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-[hsl(var(--admin-content-background))]">
      <AdminSidebar />
      <div className="flex flex-col flex-1 sm:ml-64"> {/* Add margin to offset sidebar */}
        {/* AdminHeader would typically be rendered here or within each page's content area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
