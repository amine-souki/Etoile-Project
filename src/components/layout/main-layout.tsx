'use client'; // Convert to Client Component

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use App Router's useRouter
import Header from './header';
import Footer from './footer';
// Removed SidebarProvider import
import NewsletterSignup from './newsletter-signup'; // Added import
import PageLoader from '@/components/ui/page-loader'; // Import the new loader component

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // No longer needs router object itself for events

  // Note: App Router doesn't have direct router events like Pages Router.
  // A common pattern is to use a combination of Suspense and potentially
  // NProgress or a similar library integrated with Suspense boundaries
  // for a more robust loading indicator.
  //
  // For a *very basic* simulation based on navigation start/end,
  // we can try patching navigation functions, but this is brittle.
  // A better approach often involves Suspense boundaries in layouts/pages.
  //
  // Let's stick to a simpler approach for now: show loader briefly on link clicks.
  // This won't cover all loading states perfectly but adds a basic visual cue.

  // This is a simplified example and might not cover all loading scenarios perfectly.
  // Consider using Next.js's built-in loading.js or Suspense for better integration.

  useEffect(() => {
    // Simulate loading start on link clicks (attach to document)
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      // Check if it's an internal navigation link
      if (anchor && anchor.href && anchor.target !== '_blank' && new URL(anchor.href).origin === window.location.origin) {
         // Check if it's not just a hash link on the same page
         const currentPath = window.location.pathname + window.location.search + window.location.hash;
         const targetPath = anchor.pathname + anchor.search + anchor.hash;
         if (currentPath !== targetPath) {
            setIsLoading(true);
         }
      }
    };

    // Simulate loading end (might need refinement)
    // A simple timeout or listening to specific component mounts could work,
    // but it's hard to make generic. Let's use a short timeout for demonstration.
    let timer: NodeJS.Timeout;
    if (isLoading) {
       timer = setTimeout(() => {
         setIsLoading(false); // Hide loader after a delay
       }, 1500); // Adjust delay as needed
    }


    document.addEventListener('click', handleLinkClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleLinkClick);
      if (timer) clearTimeout(timer);
       // Ensure loader is hidden if component unmounts while loading
       setIsLoading(false);
    };
  }, [isLoading]); // Rerun effect if isLoading changes


  // Alternative using router events (if available/re-introduced or via a library)
  /*
  useEffect(() => {
    const handleStart = (url: string) => setIsLoading(true);
    const handleComplete = (url: string) => setIsLoading(false);
    const handleError = (err: any) => setIsLoading(false);

    // Need to find equivalent in App Router or use a library
    // router.events?.on('routeChangeStart', handleStart);
    // router.events?.on('routeChangeComplete', handleComplete);
    // router.events?.on('routeChangeError', handleError);

    return () => {
      // router.events?.off('routeChangeStart', handleStart);
      // router.events?.off('routeChangeComplete', handleComplete);
      // router.events?.off('routeChangeError', handleError);
    };
  }, [router]); // Dependency array includes router
  */


  return (
    // SidebarProvider removed
    <div className="flex flex-col min-h-screen">
      {isLoading && <PageLoader />} {/* Conditionally render loader */}
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      <NewsletterSignup />
      <Footer />
    </div>
  );
}
