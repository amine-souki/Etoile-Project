// src/app/sections/football/coupe-de-tunisie/page.tsx
import { getTeamCupFixtures, type Fixture } from '@/services/api-football';
import MatchCard from '@/components/match-card';
import { Award } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Parcours Coupe de Tunisie - Etoile Sportive Du Sahel',
};

const ETOILE_SAHEL_TEAM_ID = 990;
const TUNISIAN_CUP_ID = 511; // Coupe de Tunisie ID from API Sports
const CURRENT_SEASON = new Date().getFullYear(); // Or a fixed season like 2024 for consistency

export default async function CoupeDeTunisiePage() {
  const fixtures: Fixture[] = await getTeamCupFixtures(ETOILE_SAHEL_TEAM_ID, TUNISIAN_CUP_ID, CURRENT_SEASON);

  const upcomingFixtures = fixtures.filter(f => ['Scheduled', 'Live', 'Postponed', 'Other'].includes(f.matchStatus));
  const pastFixtures = fixtures.filter(f => ['Finished', 'Cancelled'].includes(f.matchStatus));


  const renderFixtureList = (fixtureList: Fixture[], title: string) => {
    if (fixtureList.length === 0) {
      return (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Aucun match {title.toLowerCase()} pour le moment.
          </CardContent>
        </Card>
      );
    }
    return (
      <section>
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fixtureList.map((fixture) => (
            <MatchCard
              key={fixture.id}
              match={{ // Adapting Fixture to Match type expected by MatchCard
                competition: fixture.league.name,
                round: fixture.league.round,
                dateTime: fixture.dateTime,
                homeTeam: fixture.teams.home.name,
                // homeLogoUrl will be resolved by getLogo
                awayTeam: fixture.teams.away.name,
                // awayLogoUrl will be resolved by getLogo
                stadium: fixture.venue.name || 'N/A',
                status: fixture.matchStatus as 'Scheduled' | 'Finished' | 'Live', // Cast, ensure MatchCard handles other states or filter them
                homeScore: fixture.goals.home,
                awayScore: fixture.goals.away,
                date: fixture.dateTime, 
                time: fixture.time,
              }}
              getLogo={(teamName: string) => {
                  if (teamName === fixture.teams.home.name) return fixture.teams.home.logo || 'https://picsum.photos/48/48?team=home';
                  if (teamName === fixture.teams.away.name) return fixture.teams.away.logo || 'https://picsum.photos/48/48?team=away';
                  return 'https://picsum.photos/48/48?default'; // fallback
              }}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-3 border-b pb-4 mb-8">
        <Award className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Parcours Coupe de Tunisie</h1>
      </div>

      {fixtures.length === 0 ? (
        <Card>
            <CardContent className="p-10 text-center">
                <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                    Aucune donnée de match de coupe trouvée pour l'Etoile Sportive du Sahel pour la saison {CURRENT_SEASON}.
                </p>
            </CardContent>
        </Card>
      ) : (
        <>
          {renderFixtureList(upcomingFixtures, 'Prochains Matchs de Coupe')}
          {upcomingFixtures.length > 0 && pastFixtures.length > 0 && <hr className="my-10 border-border" />}
          {renderFixtureList(pastFixtures, 'Matchs Joués en Coupe')}
        </>
      )}
    </div>
  );
}
