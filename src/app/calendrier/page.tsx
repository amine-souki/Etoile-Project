import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMatchCalendar, Match } from '@/services/match-calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarDays, Pin, Star } from 'lucide-react'; // Star is kept for header, removed from rows
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
// Removed TunisiaFlag import

export const metadata = {
  title: 'Calendrier des Matchs - Etoile Sportive Du Sahel',
};

// Helper to group matches by competition remains the same
const groupMatchesByCompetition = (matches: Match[]): { [key: string]: Match[] } => {
  return matches.reduce((acc, match) => {
    const competition = match.competition;
    if (!acc[competition]) {
      acc[competition] = [];
    }
    acc[competition].push(match);
    return acc;
  }, {} as { [key: string]: Match[] });
};

export default async function CalendarPage() {
  // Fetch the filtered matches from the service
  const matches = await getMatchCalendar();
  const groupedMatches = groupMatchesByCompetition(matches);

  // Define team logo URLs (using existing data)
  const teamLogos: { [key: string]: string } = {
      'Etoile Sahel': 'https://media.api-sports.io/football/teams/990.png',
      'Gafsa': 'https://media.api-sports.io/football/teams/10604.png', // EGS Gafsa
      'Club Africain': 'https://media.api-sports.io/football/teams/988.png',
      'CS Sfaxien': 'https://media.api-sports.io/football/teams/983.png',
      'Stade Tunisien': 'https://media.api-sports.io/football/teams/991.png',
      // ES Tunis and US Monastir removed as per request, but kept here for potential future use
      'ES Tunis': 'https://media.api-sports.io/football/teams/980.png',
      'US Monastir': 'https://media.api-sports.io/football/teams/992.png',
      // Add more logos as needed
  };

  const getLogo = (teamName: string): string => {
     return teamLogos[teamName] || 'https://picsum.photos/20/20'; // Fallback logo
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 border-b pb-4 mb-6">
        <CalendarDays className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Calendrier des Matchs</h1>
      </div>

      {Object.entries(groupedMatches).map(([competition, competitionMatches]) => (
        <Card key={competition} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-muted/50 rounded-t-lg p-3 flex flex-row items-center justify-between">
             <div className="flex items-center gap-2">
                {/* <Star className="h-4 w-4 text-yellow-500" /> */} {/* Star icon can be kept or removed based on desired header style */}
                {/* Removed TunisiaFlag component */}
                <CardTitle className="text-sm font-semibold flex items-center gap-1">
                   {competition} {/* Removed "TUNISIE:" */}
                   <Pin className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
             </div>
             <Link href={competition === 'Ligue 1' ? '/sections/football/classement' : '#'} className="text-xs text-primary hover:underline">
                {competition === 'Ligue 1' ? 'Classement' : 'Tableau'}
             </Link>
          </CardHeader>
          <CardContent className="p-0">
            {competitionMatches.map((match, index) => (
              <div key={index} className="grid grid-cols-12 items-center p-3 border-b last:border-b-0 hover:bg-muted/20 transition-colors duration-150 text-sm">
                 {/* Date and Time */}
                 <div className="col-span-2 text-muted-foreground text-xs flex flex-col items-center text-center">
                    {/* Removed Star icon */}
                    <span>{format(match.dateTime, 'dd.MM.')}</span>
                    <span>{format(match.dateTime, 'HH:mm')}</span>
                 </div>

                 {/* Home Team */}
                 <div className="col-span-4 flex items-center justify-end gap-2">
                    <span className={`font-medium ${match.homeTeam === 'Etoile Sahel' ? 'font-bold' : ''}`}>
                        {match.homeTeam}
                    </span>
                    <Image
                      src={getLogo(match.homeTeam)}
                      alt={`${match.homeTeam} logo`}
                      width={16}
                      height={16}
                      className="object-contain"
                      data-ai-hint="football team logo"
                    />
                 </div>

                 {/* Score / Separator */}
                 <div className="col-span-2 text-center font-semibold text-muted-foreground">
                    {match.status === 'Finished' ? (
                        <Badge variant={ (match.homeScore ?? 0) > (match.awayScore ?? 0) ? (match.homeTeam === 'Etoile Sahel' ? 'default' : 'destructive') : ( (match.homeScore ?? 0) < (match.awayScore ?? 0) ? (match.awayTeam === 'Etoile Sahel' ? 'default' : 'destructive') : 'secondary')}
                               className="px-2 py-0.5 text-xs">
                          {match.homeScore} - {match.awayScore}
                        </Badge>
                    ) : (
                      <span>-</span> // Show dash for scheduled games
                    )}
                 </div>

                 {/* Away Team */}
                 <div className="col-span-4 flex items-center gap-2">
                    <Image
                      src={getLogo(match.awayTeam)}
                      alt={`${match.awayTeam} logo`}
                      width={16}
                      height={16}
                      className="object-contain"
                       data-ai-hint="football team logo"
                    />
                     <span className={`font-medium ${match.awayTeam === 'Etoile Sahel' ? 'font-bold' : ''}`}>
                        {match.awayTeam}
                    </span>
                 </div>

              </div>
            ))}
          </CardContent>
        </Card>
      ))}

       {matches.length === 0 && (
         <p className="text-center text-muted-foreground">Aucun match programmé.</p>
       )}
    </div>
  );
}
