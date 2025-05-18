
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Separator } from '@/components/ui/separator';
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Newspaper,
  Video,
  Landmark,
  GraduationCap,
  Activity,
  Swords,
  Hand,
  Dribbble,
  Volleyball,
  BarChart3,
  CalendarDays,
  Mail,
  Users, // Added Users import
  Search,
  Award,
  Ticket as TicketIcon, // Renamed to avoid conflict with 'Tickets' menu item
  ShoppingCart,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Globe,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Updated menu items based on the new design image
const mainNavItems = [
  {
    label: 'Football',
    icon: Swords,
    subItems: [
      { href: '/sections/football', label: 'Équipe Première', icon: Users, description: "L'effectif, staff et actualités." },
      { href: '/calendrier', label: 'Calendrier', icon: CalendarDays, description: 'Matchs à venir et résultats.' },
      { href: '/sections/football/classement', label: 'Classement', icon: BarChart3, description: 'Classement de la Ligue 1.' },
      { href: '/sections/football/coupe-de-tunisie', label: 'Parcours Coupe de Tunisie', icon: Award, description: 'Le parcours en Coupe de Tunisie.' },
    ],
  },
  { href: '/actualites', label: 'Actualités', icon: Newspaper },
  { href: '/media', label: 'Vidéos', icon: Video },
  {
    label: 'Le club',
    icon: Landmark,
    subItems: [
      { href: '/histoire', label: 'Histoire', icon: Landmark, description: 'Découvrez la riche histoire du club.' },
      { href: '/contact', label: 'Contact', icon: Mail, description: 'Contactez le club.' },
    ],
  },
  { href: '/academie', label: 'Académie', icon: GraduationCap },
  {
    label: 'Autres sports',
    icon: Activity,
    subItems: [
      { href: '/sections/handball', label: 'Handball', icon: Hand, description: 'Section handball de l\'ESS.' },
      { href: '/sections/basketball', label: 'Basketball', icon: Dribbble, description: 'Section basketball de l\'ESS.' },
      { href: '/sections/volleyball', label: 'Volleyball', icon: Volleyball, description: 'Section volleyball de l\'ESS.' },
    ],
  },
  { href: '/boutique', label: 'Boutique', icon: ShoppingCart },
  { href: '/billetterie', label: 'Tickets', icon: TicketIcon }, // Used TicketIcon for tickets
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType }
>(({ className, title, icon: IconComponent, children, ...props }, ref) => {
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
          <div className="flex items-center gap-2">
            {IconComponent && <IconComponent className="h-4 w-4 text-primary" />}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pl-6">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";


export default function Header() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage && (storedLanguage === 'fr' || storedLanguage === 'ar')) {
      setCurrentLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }

    const handleScroll = () => {
      if (headerRef.current) {
        // Adjust this value based on the height of your top bar or when you want the effect to trigger
        const scrollThreshold = 50; 
        setIsScrolled(window.scrollY > scrollThreshold);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [i18n]);


  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'fr' ? 'ar' : 'fr';
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    if (isMounted) {
      localStorage.setItem('i18nextLng', newLanguage);
    }
  };

  if (!isMounted) {
    return null; // Or a loading skeleton for the header
  }


  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "shadow-lg" : "shadow-sm"
      )}
    >
      {/* Top Bar */}
      <div className={cn(
        "bg-header-top-bg text-white transition-all duration-300",
        isScrolled ? "h-0 overflow-hidden opacity-0" : "h-10 opacity-100"
      )}>
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            {/* Placeholder for "Open preview in new tab" if needed, or remove */}
            <Link href="#" className="hover:underline">Media Center</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="#" aria-label="Facebook" className="hover:text-primary-foreground/80"><Facebook size={16} /></Link>
            <Link href="#" aria-label="Twitter" className="hover:text-primary-foreground/80"><Twitter size={16} /></Link>
            <Link href="#" aria-label="Instagram" className="hover:text-primary-foreground/80"><Instagram size={16} /></Link>
            <Link href="#" aria-label="YouTube" className="hover:text-primary-foreground/80"><Youtube size={16} /></Link>
            <Separator orientation="vertical" className="h-4 bg-white/30 mx-2" />
            <Button
              variant="link"
              size="sm"
              className="text-xs px-1 text-white hover:text-white/80 flex items-center gap-1"
              onClick={toggleLanguage}
            >
              <Globe size={14} />
              {currentLanguage === 'fr' ? 'العربية' : 'Français'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation and Logo */}
      <div className={cn(
        "bg-header-main-bg text-white relative",
        isScrolled ? "fixed top-0 left-0 right-0 shadow-lg" : ""
      )}>
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Left Navigation */}
          <NavigationMenu className="hidden md:flex flex-1 justify-start">
            <NavigationMenuList>
              {mainNavItems.slice(0, 4).map((item) => ( // Football, Actualités, Vidéos, Le Club
                <NavigationMenuItem key={item.label}>
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <NavigationMenuTrigger className="text-sm font-semibold bg-transparent hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className={`grid gap-3 p-4 md:w-[400px] ${item.subItems.length > 2 ? 'lg:w-[500px] lg:grid-cols-2' : 'lg:w-[300px]'}`}>
                          {item.subItems.map((subItem) => (
                            <ListItem
                              key={subItem.label}
                              title={subItem.label}
                              href={subItem.href}
                              icon={subItem.icon}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href || '#'} passHref legacyBehavior>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-sm font-semibold bg-transparent hover:bg-white/10 focus:bg-white/10")}>
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Logo - Centered and Overlapping */}
          <div className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
            isScrolled ? "scale-75 top-[calc(50%-10px)]" : "scale-100" 
            // Adjust 'top' value in scrolled state if overlap is not perfect
          )} style={{ zIndex: 51}}> {/* Ensure logo is above nav items */}
            <Link href="/" className="block">
              <Image
                src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/52/Blason_%C3%A9toile_du_sahel.svg/1200px-Blason_%C3%A9toile_du_sahel.svg.png"
                alt="Etoile Sportive Du Sahel Logo"
                width={isScrolled ? 75 : 100} // Adjust sizes as needed
                height={isScrolled ? 75 : 100}
                className="object-contain transition-all duration-300"
                data-ai-hint="club logo"
                priority
              />
            </Link>
          </div>

          {/* Right Navigation */}
          <NavigationMenu className="hidden md:flex flex-1 justify-end">
            <NavigationMenuList>
              {mainNavItems.slice(4).map((item) => ( // Académie, Autres Sports, Boutique, Tickets
                <NavigationMenuItem key={item.label}>
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <NavigationMenuTrigger className="text-sm font-semibold bg-transparent hover:bg-white/10 focus:bg-white/10 data-[state=open]:bg-white/10">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className={`grid gap-3 p-4 md:w-[400px] ${item.subItems.length > 2 ? 'lg:w-[500px] lg:grid-cols-2' : 'lg:w-[300px]'}`}>
                          {item.subItems.map((subItem) => (
                            <ListItem
                              key={subItem.label}
                              title={subItem.label}
                              href={subItem.href}
                              icon={subItem.icon}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href || '#'} passHref legacyBehavior>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-sm font-semibold bg-transparent hover:bg-white/10 focus:bg-white/10")}>
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex-1 flex justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 focus:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[320px] bg-header-main-bg text-white p-4 overflow-y-auto">
                <nav className="flex flex-col gap-2 mt-8">
                  <Link href="/" className="flex items-center gap-3 mb-6 border-b border-white/20 pb-4">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/52/Blason_%C3%A9toile_du_sahel.svg/1200px-Blason_%C3%A9toile_du_sahel.svg.png"
                      alt="Etoile Sportive Du Sahel Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <span className="font-bold text-xl">ESS Mobile</span>
                  </Link>
                  {mainNavItems.map((item) => (
                    <React.Fragment key={item.label}>
                      {item.subItems ? (
                        <>
                          <p className="font-semibold px-2 py-2 text-sm flex items-center gap-2 text-white/70 mt-2">
                            {item.icon && <item.icon className="h-4 w-4" />} {item.label}
                          </p>
                          {item.subItems.map(subItem => (
                            <Link key={subItem.href} href={subItem.href} className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 text-sm pl-8">
                              {subItem.icon && <subItem.icon className="h-4 w-4" />} {subItem.label}
                            </Link>
                          ))}
                        </>
                      ) : (
                        <Link href={item.href || '#'} className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 text-sm">
                          {item.icon && <item.icon className="h-4 w-4" />} {item.label}
                        </Link>
                      )}
                       <Separator className="bg-white/10 my-1" />
                    </React.Fragment>
                  ))}
                   {/* Mobile specific bottom links */}
                  <Button variant="ghost" className="text-white justify-start mt-4 hover:bg-white/10">
                     <Search className="h-4 w-4 mr-2" /> Chercher
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* Thin gold accent line */}
        <div className="h-1 bg-header-accent-gold"></div>
      </div>
    </header>
  );
}
