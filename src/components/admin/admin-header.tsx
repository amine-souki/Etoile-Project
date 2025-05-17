
'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AdminSidebar from './admin-sidebar'; // For mobile view
import { Menu } from 'lucide-react';

export default function AdminHeader({ pageTitle, pageSubtitle }: { pageTitle: string, pageSubtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-[hsl(var(--admin-header-background))] px-4 md:px-6">
      <div className="flex items-center md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[264px] p-0"> {/* Match sidebar width */}
            <AdminSidebar />
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
        {pageSubtitle && <p className="text-sm text-muted-foreground">{pageSubtitle}</p>}
      </div>

      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
        {/* Notification badge example */}
        <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span>
      </Button>
      <Avatar className="h-9 w-9">
        <AvatarImage src="https://placehold.co/100x100.png" alt="Admin Avatar" data-ai-hint="man portrait" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
      <div className="hidden md:flex flex-col items-end">
        <span className="text-sm font-medium text-foreground">Admin ESS</span>
        <span className="text-xs text-muted-foreground">admin@etoilesportive.tn</span>
      </div>
    </header>
  );
}
