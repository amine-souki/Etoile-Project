import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestNews, NewsItem } from '@/services/club-news';
import { getMatchCalendar, Match } from '@/services/match-calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight, CalendarDays, Newspaper } from 'lucide-react';

// Helper to get the next upcoming match
const getNextMatch = (matches: Match[]): Match | null => {
  const upcoming = matches
    .filter((match) => match.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  return upcoming.length > 0 ? upcoming[0] : null;
};

export default async function Home() {
  const newsItems = await getLatestNews();
  const matches = await getMatchCalendar();
  const latestNews = newsItems.slice(0, 3); // Show latest 3 news items
  const nextMatch = getNextMatch(matches);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
       <section className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src="https://picsum.photos/1200/600"
          alt="Stade Olympique de Sousse"
          layout="fill"
          objectFit="cover"
          data-ai-hint="stadium football tunisia"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40 p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">Bienvenue sur ESS Live</h1>
          <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
            Votre source numéro 1 pour toutes les actualités, matchs et informations sur l'Etoile Sportive du Sahel.
          </p>
           {nextMatch && (
             <div className="mt-6 bg-primary/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
                <p className="text-sm uppercase tracking-wider mb-1">Prochain Match</p>
                <p className="text-xl font-semibold">{nextMatch.opponent}</p>
                <p className="text-sm">{format(nextMatch.date, 'eeee d MMMM yyyy', { locale: fr })} à {nextMatch.time}</p>
                <p className="text-sm">{nextMatch.stadium} ({nextMatch.competition})</p>
                 <Button asChild variant="secondary" className="mt-3">
                    {/* Added legacyBehavior */}
                    <Link href="/calendrier" legacyBehavior>
                      <a>Voir Calendrier <ArrowRight className="ml-2 h-4 w-4" /></a>
                    </Link>
                 </Button>
             </div>
           )}
        </div>
      </section>


      {/* Latest News Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2"><Newspaper className="text-primary"/> Dernières Actualités</h2>
          <Button variant="outline" asChild>
             {/* Added legacyBehavior */}
            <Link href="/actualites" legacyBehavior>
              <a>Voir tout <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              {item.imageUrl && (
                 <div className="relative h-48 w-full">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="football match news"
                    />
                 </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                 <CardDescription>{format(item.date, 'd MMMM yyyy', { locale: fr })}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{item.excerpt}</p>
                <Button variant="link" asChild className="p-0 h-auto text-primary">
                   {/* Added legacyBehavior */}
                  <Link href={item.link} target="_blank" rel="noopener noreferrer" legacyBehavior>
                    <a>Lire la suite <ArrowRight className="ml-1 h-4 w-4" /></a>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>


    </div>
  );
}
