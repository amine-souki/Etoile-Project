import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground py-6 px-4 md:px-6 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="text-center md:text-left">
          <p>&copy; {currentYear} Etoile Sportive Du Sahel. Tous droits réservés.</p>
        </div>
        <nav className="flex justify-center gap-4">
          <Link href="/legal" className="text-sm hover:text-primary transition-colors">
            Mentions Légales
          </Link>
          <Separator orientation="vertical" className="h-4 self-center bg-border" />
          <Link href="/contact" className="text-sm hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex justify-center md:justify-end gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Facebook size={20} />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Twitter size={20} />
             <span className="sr-only">Twitter</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Instagram size={20} />
             <span className="sr-only">Instagram</span>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <Youtube size={20} />
             <span className="sr-only">YouTube</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
