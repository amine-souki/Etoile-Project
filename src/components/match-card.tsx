import { Card } from '@/components/ui/card';
import type { Match } from '@/services/match-calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Image from 'next/image';
import { CalendarDays, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
  getLogo: (teamName: string) => string;
}

// Simple SVG placeholder for the 'vs' separator
const VersusSymbol = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/80">
      <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export default function MatchCard({ match, getLogo }: MatchCardProps) {
  const homeLogo = getLogo(match.homeTeam);
  const awayLogo = getLogo(match.awayTeam);

  return (
    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border">
      {/* Top Section - Teams */}
      <div className="bg-slate-800 text-white p-4 flex items-center justify-around rounded-t-lg">
        {/* Home Team */}
        <div className="flex flex-col items-center text-center w-1/3 px-1">
          <Image
            src={homeLogo}
            alt={`${match.homeTeam} logo`}
            width={48} // Adjusted size
            height={48} // Adjusted size
            className="object-contain mb-2"
            data-ai-hint="football team logo"
          />
          <p className="text-xs sm:text-sm font-medium truncate w-full">{match.homeTeam}</p>
        </div>

        {/* VS Symbol */}
        <div className="flex items-center justify-center w-auto px-2">
          <VersusSymbol />
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center text-center w-1/3 px-1">
          <Image
            src={awayLogo}
            alt={`${match.awayTeam} logo`}
            width={48} // Adjusted size
            height={48} // Adjusted size
            className="object-contain mb-2"
            data-ai-hint="football team logo"
          />
          <p className="text-xs sm:text-sm font-medium truncate w-full">{match.awayTeam}</p>
        </div>
      </div>

      {/* Bottom Section - Details */}
      <div className="bg-card p-4 rounded-b-lg space-y-2">
         {/* <p className="text-xs text-muted-foreground">Football - Ligue 1</p> Example Category */}
        <h3 className="text-base font-semibold text-primary truncate">{match.competition}</h3>
         {match.round && (
           <p className="text-sm font-medium text-muted-foreground">{match.round}</p>
         )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 flex-shrink-0" />
          <span>{format(match.dateTime, 'eeee d MMM, HH:mm', { locale: fr })}</span>
        </div>
         {match.stadium && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{match.stadium}</span>
          </div>
         )}
      </div>
    </Card>
  );
}
