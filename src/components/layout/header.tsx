
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
import React, { useState, useEffect } from 'react';
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
  Users, // Users icon was missing, added back
  Mail,
  Play,
  User,
  Search,
  Award, // Added Award for Coupe de Tunisie
} from 'lucide-react';
import {useTranslation} from 'react-i18next';

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
   {
    label: 'Académie',
    icon: GraduationCap,
     href: '/academie', 
    subItems: [ 
       { href: '/academie', label: 'Présentation', icon: GraduationCap, description: 'Le centre de formation.' },
    ]
   },
   {
    label: 'Autres sports',
    icon: Activity,
    subItems: [
      { href: '/sections/handball', label: 'Handball', icon: Hand, description: 'Section handball de l\'ESS.' },
      { href: '/sections/basketball', label: 'Basketball', icon: Dribbble, description: 'Section basketball de l\'ESS.' },
      { href: '/sections/volleyball', label: 'Volleyball', icon: Volleyball, description: 'Section volleyball de l\'ESS.' },
    ],
  },
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
  const {t, i18n} = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage && (storedLanguage === 'fr' || storedLanguage === 'ar')) {
      setCurrentLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
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
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Row */}
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
             <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/52/Blason_%C3%A9toile_du_sahel.svg/1200px-Blason_%C3%A9toile_du_sahel.svg.png"
                alt="Etoile Sportive Du Sahel Logo"
                width={45} 
                height={45}
                className="object-contain"
                data-ai-hint="club logo"
                priority 
              />
             </Link>
             <span className="text-xs text-muted-foreground">Media Center</span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Button variant="ghost" size="sm" className="text-xs hidden md:inline-flex">
              <Play className="h-4 w-4 mr-1" /> Chaîne en direct
            </Button>
             <div className="flex items-center gap-1 text-xs">
                <Button
                    variant="link"
                    size="sm"
                    className="text-xs px-1 text-muted-foreground hover:text-primary"
                    onClick={toggleLanguage}
                  >
                    {currentLanguage === 'fr' ? 'العربية' : 'FR'}
                </Button>
             </div>
             {/* Mobile Menu Trigger */}
             <Sheet>
               <SheetTrigger asChild className="md:hidden">
                 <Button variant="outline" size="icon">
                   <Menu className="h-5 w-5" />
                   <span className="sr-only">Ouvrir le menu</span>
                 </Button>
               </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto p-4">
                  {/* Mobile Menu Content */}
                   <nav className="flex flex-col gap-4 mt-8">
                       <Link href="/" className="flex items-center gap-2 mb-4 border-b pb-4">
                         <Image
                           src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/52/Blason_%C3%A9toile_du_sahel.svg/1200px-Blason_%C3%A9toile_du_sahel.svg.png"
                           alt="Etoile Sportive Du Sahel Logo"
                           width={30}
                           height={30}
                           className="object-contain"
                         />
                         <span className="font-bold text-lg text-primary">ESS Live</span>
                       </Link>
                       {/* Flatten structure for mobile */}
                       <p className="font-semibold px-2 py-1 text-muted-foreground flex items-center gap-2"><Swords className="h-4 w-4" /> Football</p>
                       <Link href="/sections/football" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent pl-6"><Users className="h-4 w-4" /> Équipe Première</Link>
                       <Link href="/calendrier" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent pl-6"><CalendarDays className="h-4 w-4" /> Calendrier</Link>
                       <Link href="/sections/football/classement" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent pl-6"><BarChart3 className="h-4 w-4" /> Classement</Link>
                       <Link href="/sections/football/coupe-de-tunisie" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent pl-6"><Award className="h-4 w-4" /> Parcours Coupe</Link>
                       <Separator />
                       <Link href="/actualites" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"><Newspaper className="h-4 w-4" /> Actualités</Link>
                       <Link href="/media" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"><Video className="h-4 w-4" /> Vidéos</Link>
                       <Separator />
                       <p className="font-semibold px-2 py-1 text-muted-foreground flex items-center gap-2"><Landmark className="h-4 w-4" /> Le club</p>
                       <Link href="/histoire" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent pl-6"><Landmark className="h-4 w-4" /> Histoire</Link>
                       <Link href="/contact" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent pl-6"><Mail className="h-4 w-4" /> Contact</Link>
                       <Separator />
                       <Link href="/academie" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"><GraduationCap className="h-4 w-4" /> Académie</Link>
                       <Separator />
                       <p className="font-semibold px-2 py-1 text-muted-foreground flex items-center gap-2"><Activity className="h-4 w-4" /> Autres sports</p>
                        <Link href="/sections/handball" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent pl-6"><Hand className="h-4 w-4" /> Handball</Link>
                        <Link href="/sections/basketball" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent pl-6"><Dribbble className="h-4 w-4" /> Basketball</Link>
                        <Link href="/sections/volleyball" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent pl-6"><Volleyball className="h-4 w-4" /> Volleyball</Link>
                       <Separator />
                       {/* Mobile specific bottom links */}
                       <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"><Play className="h-4 w-4" /> Chaîne en direct</Link>
                       <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"><User className="h-4 w-4" /> S'identifier</Link>
                       <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"><Search className="h-4 w-4" /> Chercher</Link>
                   </nav>
                </SheetContent>
             </Sheet>
          </div>
        </div>

        <Separator />

        {/* Bottom Row - Navigation */}
        <div className="hidden md:flex h-14 items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.subItems && item.subItems.length > 0 ? ( // Check if subItems exist and is not empty
                    <>
                      <NavigationMenuTrigger className="text-sm font-medium">
                        {item.icon && <item.icon className="h-4 w-4 mr-2 text-primary/80" />}
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
                       <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-sm font-medium")}>
                         {item.icon && <item.icon className="h-4 w-4 mr-2 text-primary/80" />}
                         {item.label}
                       </NavigationMenuLink>
                     </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2"> {/* Reduced gap for denser buttons */}
            <Button variant="ghost" size="sm" className="text-sm px-3"> {/* Adjusted padding */}
               <User className="h-4 w-4 mr-1" /> S'identifier
            </Button>
             <Button variant="ghost" size="icon" className="text-sm h-9 w-9"> {/* Icon button for search */}
               <Search className="h-4 w-4" />
               <span className="sr-only">Chercher</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

