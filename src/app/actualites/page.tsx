import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestNews } from '@/services/club-news';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight, Newspaper } from 'lucide-react';

export const metadata = {
  title: 'Actualités - Etoile Sportive Du Sahel',
};

export default async function NewsPage() {
  const newsItems = await getLatestNews();

  // Sort news items by date, most recent first (assuming getLatestNews might not guarantee order)
  const sortedNews = newsItems.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 border-b pb-4 mb-6">
         <Newspaper className="h-6 w-6 text-primary" />
         <h1 className="text-3xl font-bold">Fil d'actualités</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNews.map((item, index) => (
          <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-lg border">
             {item.imageUrl && (
               <div className="relative h-52 w-full">
                 <Image
                   src={item.imageUrl}
                   alt={item.title}
                   layout="fill"
                   objectFit="cover"
                   data-ai-hint="football action news tunisia"
                 />
               </div>
             )}
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold leading-tight line-clamp-2">{item.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground pt-1">
                {format(item.date, 'eeee d MMMM yyyy', { locale: fr })}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-muted-foreground line-clamp-4 mb-4">{item.excerpt}</p>
              <Button variant="link" asChild className="p-0 h-auto text-primary self-start mt-auto">
                <Link href={item.link} target="_blank" rel="noopener noreferrer">
                  Lire l'article complet <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       {sortedNews.length === 0 && (
         <p className="text-center text-muted-foreground">Aucune actualité disponible pour le moment.</p>
       )}
    </div>
  );
}
