import { getMatchCalendar, Match } from '@/services/match-calendar';
import { CalendarDays } from 'lucide-react';
import Image from 'next/image';
import MatchCard from '@/components/match-card'; // Import the new component

export const metadata = {
  title: 'Calendrier des Matchs - Etoile Sportive Du Sahel',
};

// Helper to group matches by competition is no longer needed for the new design
// const groupMatchesByCompetition = (matches: Match[]): { [key: string]: Match[] } => { ... };

export default async function CalendarPage() {
  // Fetch all scheduled matches (already filtered in the service)
  const matches = await getMatchCalendar();

  // Define team logo URLs (using existing data)
  const teamLogos: { [key: string]: string } = {
      'Etoile Sahel': 'https://media.api-sports.io/football/teams/990.png',
      'Gafsa': 'https://media.api-sports.io/football/teams/10604.png', // EGS Gafsa
      'Club Africain': 'https://media.api-sports.io/football/teams/988.png',
      'CS Sfaxien': 'https://media.api-sports.io/football/teams/983.png',
      // Keep others for fallback or potential future use
      'Stade Tunisien': 'https://media.api-sports.io/football/teams/991.png',
      'ES Tunis': 'https://media.api-sports.io/football/teams/980.png',
      'US Monastir': 'https://media.api-sports.io/football/teams/992.png',
      // Add more logos as needed
  };

  const getLogo = (teamName: string): string => {
     return teamLogos[teamName] || 'https://picsum.photos/48/48'; // Fallback logo (square)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 border-b pb-4 mb-6">
        <CalendarDays className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Prochains événements</h1>
      </div>

      {/* New Grid Layout for Match Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, index) => (
          <MatchCard key={index} match={match} getLogo={getLogo} />
        ))}
      </div>

       {matches.length === 0 && (
         <p className="text-center text-muted-foreground py-10">Aucun match programmé.</p>
       )}
    </div>
  );
}
