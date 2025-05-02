import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getTickets, Ticket } from '@/services/ticketing';
import { Ticket as TicketIcon, ExternalLink, CalendarDays, Tag, CircleDollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Billetterie - Etoile Sportive Du Sahel',
};

export default async function BilletteriePage() {
  const tickets = await getTickets();

  // Group tickets by match if needed, or display as a list
  // For simplicity, displaying as a list here

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <TicketIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Billetterie</h1>
      </div>

      <p className="text-muted-foreground">
        Achetez vos billets pour les prochains matchs de l'Etoile Sportive du Sahel.
        Cliquez sur "Acheter le Billet" pour accéder à la plateforme de vente.
      </p>

      {tickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
            <Card key={index} className="flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  {ticket.match}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 pt-1">
                    <Tag className="h-4 w-4" /> Catégorie: <Badge variant="secondary" className="ml-1">{ticket.category}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <Separator className="mb-3"/>
                 <p className="text-xl font-bold text-primary flex items-center gap-2">
                     <CircleDollarSign className="h-5 w-5"/> {ticket.price.toFixed(2)} TND
                 </p>
                 {/* Add more details if available, like date/time */}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href={ticket.buyUrl} target="_blank" rel="noopener noreferrer">
                    Acheter le Billet <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-10 text-center">
            <TicketIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun billet n'est actuellement en vente. Consultez cette page régulièrement pour les mises à jour.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
