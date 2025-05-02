'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Newspaper,
  CalendarDays,
  Image as ImageIcon,
  Users,
  GraduationCap,
  Landmark,
  ShoppingCart,
  Ticket,
  Swords,
  Hand,
  Dribbble,
  Volleyball,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import React from 'react';

const menuItems = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/actualites', label: 'Actualités', icon: Newspaper },
  { href: '/calendrier', label: 'Calendrier', icon: CalendarDays },
  { href: '/media', label: 'Galerie Média', icon: ImageIcon },
  {
    label: 'Sections Sportives',
    icon: Swords,
    subItems: [
      { href: '/sections/football', label: 'Football', icon: Swords }, // Re-using Swords for Football
      { href: '/sections/handball', label: 'Handball', icon: Hand },
      { href: '/sections/basketball', label: 'Basketball', icon: Dribbble },
      { href: '/sections/volleyball', label: 'Volleyball', icon: Volleyball },
    ],
  },
  { href: '/academie', label: 'Académie', icon: GraduationCap },
  { href: '/histoire', label: 'Histoire du Club', icon: Landmark },
  { href: '/boutique', label: 'Boutique', icon: ShoppingCart },
  { href: '/billetterie', label: 'Billetterie', icon: Ticket },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const isSubmenuOpen = (label: string) => openSubmenu === label;

  const isParentActive = (subItems?: typeof menuItems[0]['subItems']) => {
     if (!subItems) return false;
     return subItems.some(item => pathname.startsWith(item.href));
  }; // Added semicolon

  return (
    <Sidebar side="left" collapsible="icon" className="border-r">
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              {item.subItems ? (
                 <>
                 <SidebarMenuButton
                   onClick={() => handleSubmenuToggle(item.label)}
                   isActive={isParentActive(item.subItems)}
                   tooltip={{children: item.label}}
                 >
                   <item.icon />
                   <span>{item.label}</span>
                 </SidebarMenuButton>
                  {isSubmenuOpen(item.label) && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <li key={subItem.href}>
                         <Link href={subItem.href} passHref>
                          <SidebarMenuSubButton
                            isActive={pathname === subItem.href}
                            onClick={() => setOpenMobile(false)}
                          >
                            <subItem.icon />
                            <span>{subItem.label}</span>
                          </SidebarMenuSubButton>
                         </Link>
                        </li>
                      ))}
                    </SidebarMenuSub>
                   )}
                 </>

              ) : (
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    onClick={() => setOpenMobile(false)}
                     tooltip={{children: item.label}}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
