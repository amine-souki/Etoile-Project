import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // URLs for sections links (matching sidebar structure)
  const sectionLinks = [
    { href: '/sections/football', label: 'Football' },
    { href: '/sections/handball', label: 'Handball' },
    { href: '/sections/basketball', label: 'Basketball' },
    { href: '/sections/volleyball', label: 'Volleyball' },
    { href: '/academie', label: 'Académie' },
  ];

  // URLs for quick links (matching sidebar structure)
  const quickLinks = [
    { href: '/actualites', label: 'Actualités' },
    { href: '/calendrier', label: 'Calendrier' },
    { href: '/boutique', label: 'Boutique' },
    { href: '/billetterie', label: 'Billetterie' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Column 1: Logo and Description */}
        <div className="space-y-4">
           <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/52/Blason_%C3%A9toile_du_sahel.svg/1200px-Blason_%C3%A9toile_du_sahel.svg.png"
                alt="Etoile Sportive Du Sahel Logo"
                width={50}
                height={50}
                className="object-contain" // Removed rounded-full
              />
              <span className="font-bold text-xl text-white">
                Etoile Sportive Du Sahel
              </span>
          </Link>
          <p className="text-sm text-slate-400">
            Fondé en 1925, l'ESS est l'un des clubs les plus titrés de Tunisie avec une riche histoire sportive.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Liens rapides</h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Sections */}
        <div>
          <h4 className="font-semibold text-white mb-4">Sections</h4>
          <ul className="space-y-2">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
             <li className="flex items-start gap-2">
               <MapPin size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
               <span>Stade Olympique, Sousse, Tunisie</span>
             </li>
             <li className="flex items-center gap-2">
               <Phone size={16} className="text-slate-400 flex-shrink-0" />
               <a href="tel:+21673225000" className="hover:text-primary transition-colors">+216 73 225 000</a>
             </li>
             <li className="flex items-center gap-2">
               <Mail size={16} className="text-slate-400 flex-shrink-0" />
               <a href="mailto:contact@etoile-du-sahel.com" className="hover:text-primary transition-colors">contact@etoile-du-sahel.com</a>
             </li>
          </ul>
           {/* Social Icons */}
           <div className="flex gap-4 mt-4">
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
      </div>

      <Separator className="bg-slate-700 my-6" />

      {/* Bottom Footer */}
      <div className="container mx-auto text-center text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {currentYear} Etoile Sportive Du Sahel. Tous droits réservés.</p>
        <nav className="flex justify-center gap-4 flex-wrap">
          <Link href="/legal" className="hover:text-primary transition-colors">
            Mentions légales
          </Link>
          <span className="hidden md:inline">|</span>
          {/* Add Privacy Policy link if needed */}
          <Link href="/legal/privacy" className="hover:text-primary transition-colors">
            Politique de confidentialité
          </Link>
          <span className="hidden md:inline">|</span>
           {/* Add Terms link if needed */}
          <Link href="/legal/terms" className="hover:text-primary transition-colors">
            Conditions générales
          </Link>
        </nav>
      </div>
    </footer>
  );
}
