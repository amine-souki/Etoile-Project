import Link from 'next/link';
import Image from 'next/image';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="md:hidden">
          {/* Removed asChild and nested Button. SidebarTrigger renders its own button. */}
          <SidebarTrigger>
             {/* Use Menu icon directly if needed, or rely on SidebarTrigger's default PanelLeft */}
             {/* <Menu /> */}
             {/* <span className="sr-only">Toggle Sidebar</span> */}
          </SidebarTrigger>
        </div>
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
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Add any additional header elements like search or user profile here */}
        </div>
      </div>
    </header>
  );
}
