import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, Home, Newspaper, CalendarDays, Image as ImageIcon, Users, GraduationCap, Landmark, ShoppingCart, Ticket, Swords, Hand, Dribbble, Volleyball } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from 'react';

// Define menu items here (moved from app-sidebar)
const menuItems = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/actualites', label: 'Actualités', icon: Newspaper },
  { href: '/calendrier', label: 'Calendrier', icon: CalendarDays },
  { href: '/media', label: 'Galerie Média', icon: ImageIcon },
  {
    label: 'Sections Sportives',
    icon: Swords,
    subItems: [
      { href: '/sections/football', label: 'Football', icon: Swords },
      { href: '/sections/handball', label: 'Handball', icon: Hand },
      { href: '/sections/basketball', label: 'Basketball', icon: Dribbble },
      { href: '/sections/volleyball', label: 'Volleyball', icon: Volleyball },
    ],
  },
  { href: '/academie', label: 'Académie', icon: GraduationCap },
  { href: '/histoire', label: 'Histoire du Club', icon: Landmark },
  { href: '/boutique', label: 'Boutique', icon: ShoppingCart },
  { href: '/billetterie', label: 'Billetterie', icon: Ticket },
  { href: '/contact', label: 'Contact', icon: Users }, // Added Contact
];

// ListItem component for NavigationMenu dropdowns
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Image
            src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/52/Blason_%C3%A9toile_du_sahel.svg/1200px-Blason_%C3%A9toile_du_sahel.svg.png"
            alt="Etoile Sportive Du Sahel Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="hidden font-bold sm:inline-block text-lg text-primary">
            Etoile Sportive Du Sahel
          </span>
          <span className="sm:hidden font-bold text-lg text-primary">ESS Live</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.subItems ? (
                  <>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {item.subItems.map((subItem) => (
                           <ListItem
                              key={subItem.label}
                              title={subItem.label}
                              href={subItem.href}
                           >
                             {/* Optional: Add description here */}
                           </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={item.href} passHref legacyBehavior>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation Trigger */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
               <Link href="/" className="flex items-center gap-2 mb-4">
                 <Image
                   src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/52/Blason_%C3%A9toile_du_sahel.svg/1200px-Blason_%C3%A9toile_du_sahel.svg.png"
                   alt="Etoile Sportive Du Sahel Logo"
                   width={30}
                   height={30}
                   className="object-contain"
                 />
                 <span className="font-bold text-lg text-primary">ESS Live</span>
               </Link>
              {menuItems.map((item) => (
                item.subItems ? (
                  <div key={item.label}>
                     <p className="font-semibold px-2 py-1 text-muted-foreground">{item.label}</p>
                     <div className="flex flex-col pl-4">
                        {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                            >
                              <subItem.icon className="h-4 w-4" />
                              {subItem.label}
                            </Link>
                        ))}
                     </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
