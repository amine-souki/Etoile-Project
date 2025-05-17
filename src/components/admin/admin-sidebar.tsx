
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Newspaper,
  Users,
  CalendarDays,
  ListOrdered,
  Trophy,
  Shirt,
  Image as ImageIcon,
  Ticket,
  Settings,
  BarChart3,
} from 'lucide-react';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/actualites', label: 'Actualités', icon: Newspaper },
  { href: '/admin/equipes', label: 'Équipes', icon: Users },
  { href: '/admin/matches', label: 'Matches', icon: CalendarDays },
  { href: '/admin/classements', label: 'Classements', icon: BarChart3 },
  { href: '/admin/palmares', label: 'Palmarès', icon: Trophy },
  { href: '/admin/boutique', label: 'Boutique', icon: Shirt },
  { href: '/admin/medias', label: 'Médias', icon: ImageIcon },
  { href: '/admin/billetterie', label: 'Billetterie', icon: Ticket },
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[hsl(var(--admin-sidebar-background))] text-[hsl(var(--admin-sidebar-foreground))] flex flex-col transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex items-center justify-center h-20 border-b border-white/10 px-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Image
            src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/52/Blason_%C3%A9toile_du_sahel.svg/1200px-Blason_%C3%A9toile_du_sahel.svg.png"
            alt="ESS Logo"
            width={40}
            height={40}
            className="bg-white rounded-full p-1"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">ESS Admin</span>
            <span className="text-xs text-[hsl(var(--admin-sidebar-foreground))] opacity-70">Panneau d'administration</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-2 font-medium">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center p-2 rounded-lg hover:bg-[hsl(var(--admin-sidebar-active-background))] hover:text-[hsl(var(--admin-sidebar-active-foreground))] group',
                    isActive
                      ? 'bg-[hsl(var(--admin-sidebar-active-background))] text-[hsl(var(--admin-sidebar-active-foreground))]'
                      : 'text-[hsl(var(--admin-sidebar-foreground))]'
                  )}
                >
                  <item.icon className={cn('h-5 w-5 transition duration-75', isActive ? 'text-[hsl(var(--admin-sidebar-active-foreground))]' : 'text-[hsl(var(--admin-sidebar-foreground))] group-hover:text-[hsl(var(--admin-sidebar-active-foreground))]')} />
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
