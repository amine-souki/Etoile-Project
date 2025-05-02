import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getLatestNews } from '@/services/club-news';
import { getMatchCalendar, Match } from '@/services/match-calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight, Newspaper } from 'lucide-react';
import NextMatchCountdown from '@/components/next-match-countdown'; // Import the new component

// Helper to get the next upcoming match
const getNextMatch = (matches: Match[]): Match | null => {
  const upcoming = matches
    .filter((match) => match.dateTime >= new Date()) // Use dateTime for comparison
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
  return upcoming.length > 0 ? upcoming[0] : null;
};

// Define team logo URLs (move or fetch from a better source later)
const teamLogos: { [key: string]: string } = {
  'Etoile Sahel': 'https://upload.wikimedia.org/wikipedia/fr/thumb/5/52/Blason_%C3%A9toile_du_sahel.svg/1200px-Blason_%C3%A9toile_du_sahel.svg.png', // Use official logo
  'Gafsa': 'https://media.api-sports.io/football/teams/10604.png', // EGS Gafsa
  'Club Africain': 'https://media.api-sports.io/football/teams/988.png',
  'CS Sfaxien': 'https://media.api-sports.io/football/teams/983.png',
  'Stade Tunisien': 'https://media.api-sports.io/football/teams/991.png',
  // Add more logos as needed
  'Default': 'https://picsum.photos/48/48?random=team', // Fallback square logo
};

const getLogo = (teamName: string): string => {
  // Attempt to find a specific logo
  const specificLogo = Object.entries(teamLogos).find(([key]) => teamName.includes(key));
  if (specificLogo) {
    return specificLogo[1];
  }
  // Fallback if no specific logo found
  return teamLogos['Default'];
};


export default async function Home() {
  const newsItems = await getLatestNews();
  const matches = await getMatchCalendar();
  const latestNews = newsItems.slice(0, 3); // Show latest 3 news items
  const nextMatch = getNextMatch(matches);

  // Resolve logo URLs here on the server
  const homeLogoUrl = nextMatch ? getLogo(nextMatch.homeTeam) : teamLogos['Default'];
  const awayLogoUrl = nextMatch ? getLogo(nextMatch.awayTeam) : teamLogos['Default'];

  return (
    <div className="space-y-12"> {/* Increased spacing */}
      {/* Hero Section with Next Match Countdown */}
       <section className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-lg group">
        <Image
          src="https://picsum.photos/1200/700?random=hero" // Slightly different hero image
          alt="Stade Olympique de Sousse"
          layout="fill"
          objectFit="cover"
          data-ai-hint="stadium football tunisia night lights"
          className="brightness-50 group-hover:brightness-[0.4] transition-all duration-300" // Darker on hover
          priority // Load hero image faster
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4">
           {/* Remove the old "Bienvenue" text, replace with Next Match component */}
           {/* <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">Bienvenue sur ESS Live</h1> */}
           {/* <p className="text-lg md:text-xl max-w-2xl drop-shadow-md"> */}
           {/*   Votre source numéro 1 pour toutes les actualités, matchs et informations sur l'Etoile Sportive du Sahel. */}
           {/* </p> */}

           {nextMatch ? (
              // Pass resolved URLs instead of the getLogo function
              <NextMatchCountdown
                 nextMatch={nextMatch}
                 homeLogoUrl={homeLogoUrl}
                 awayLogoUrl={awayLogoUrl}
              />
            ) : (
              <div className="text-center p-10 bg-black/50 rounded-lg">
                 <h2 className="text-2xl font-semibold mb-2">Aucun match à venir</h2>
                 <p className="text-muted-foreground text-white/80">Consultez le calendrier pour les résultats passés.</p>
                 <Button asChild variant="outline" className="mt-4 bg-transparent border-white text-white hover:bg-white hover:text-black">
                   <Link href="/calendrier">
                     Voir le Calendrier <ArrowRight className="ml-2 h-4 w-4" />
                   </Link>
                 </Button>
              </div>
            )}
        </div>
      </section>


      {/* Latest News Section */}
      <section className="container mx-auto px-4 md:px-6"> {/* Added container for centering */}
        <div className="flex justify-between items-center mb-6 border-b pb-4"> {/* Updated style */}
          <h2 className="text-3xl font-bold flex items-center gap-3"><Newspaper className="text-primary h-7 w-7"/> Dernières Actualités</h2> {/* Increased size */}
          <Button variant="outline" asChild>
            <Link href="/actualites">
              Voir tout <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-lg border group"> {/* Added group */}
              {item.imageUrl && (
                 <div className="relative h-52 w-full overflow-hidden"> {/* Added overflow-hidden */}
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="football match news"
                        className="transition-transform duration-300 group-hover:scale-105" // Scale effect
                    />
                 </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">{item.title}</CardTitle> {/* Hover effect */}
                 <CardDescription className="text-sm text-muted-foreground pt-1">{format(item.date, 'eeee d MMMM yyyy', { locale: fr })}</CardDescription> {/* Full date */}
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-sm text-muted-foreground line-clamp-4 mb-4">{item.excerpt}</p>
                <Button variant="link" asChild className="p-0 h-auto text-primary self-start mt-auto">
                  <Link href={item.link} target="_blank" rel="noopener noreferrer">
                    Lire la suite <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
           {latestNews.length === 0 && (
              <p className="text-center text-muted-foreground md:col-span-2 lg:col-span-3 py-10">
                  Aucune actualité à afficher pour le moment.
              </p>
           )}
        </div>
      </section>
    </div>
  );
}
