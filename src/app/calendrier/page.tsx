import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getMatchCalendar, Match } from '@/services/match-calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarDays, CheckCircle, Clock, MapPin, Trophy, Versus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Calendrier des Matchs - Etoile Sportive Du Sahel',
};

export default async function CalendarPage() {
  const matches = await getMatchCalendar();

  // Sort matches by date, most recent first for past matches, earliest first for upcoming
  const sortedMatches = matches.sort((a, b) => b.date.getTime() - a.date.getTime());
  const upcomingMatches = sortedMatches.filter(match => match.date >= new Date()).reverse();
  const pastMatches = sortedMatches.filter(match => match.date < new Date());

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 border-b pb-4 mb-6">
        <CalendarDays className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Calendrier des Matchs</h1>
      </div>

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Matchs à venir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingMatches.map((match, index) => (
              <Card key={`upcoming-${index}`} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-muted/50 rounded-t-lg p-4">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-primary" />
                      {format(match.date, 'eeee d MMMM yyyy', { locale: fr })}
                    </span>
                    <Badge variant="secondary">{match.competition}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-center text-xl font-medium gap-4">
                      <span>Etoile du Sahel</span>
                      <Versus className="h-5 w-5 text-muted-foreground" />
                      <span>{match.opponent}</span>
                  </div>
                   <Separator />
                   <div className="text-sm text-muted-foreground space-y-1">
                      <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> Heure: {match.time}</p>
                      <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Stade: {match.stadium}</p>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Past Matches */}
      {pastMatches.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Résultats Passés</h2>
          <div className="space-y-4">
            {pastMatches.map((match, index) => (
              <Card key={`past-${index}`} className="shadow-sm">
                <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                     <div className="text-sm text-muted-foreground">
                         <p className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {format(match.date, 'dd/MM/yy', { locale: fr })}</p>
                         <p className="flex items-center gap-1"><Clock className="h-4 w-4" /> {match.time}</p>
                     </div>
                     <Separator orientation="vertical" className="hidden md:block h-10 self-center" />
                     <div className="flex items-center gap-2 md:gap-4 font-medium text-lg">
                          <span>Etoile du Sahel</span>
                          <Badge variant={match.score && parseInt(match.score.split('-')[0]) > parseInt(match.score.split('-')[1]) ? "default" : (match.score && parseInt(match.score.split('-')[0]) < parseInt(match.score.split('-')[1]) ? "destructive" : "secondary")} className="text-lg px-3 py-1">
                              {match.score || '-'}
                          </Badge>
                          <span>{match.opponent}</span>
                     </div>
                  </div>

                  <div className="text-sm text-muted-foreground text-center md:text-right space-y-1">
                    <p className="flex items-center justify-center md:justify-end gap-1"><Trophy className="h-4 w-4" /> {match.competition}</p>
                    <p className="flex items-center justify-center md:justify-end gap-1"><MapPin className="h-4 w-4" /> {match.stadium}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

       {matches.length === 0 && (
         <p className="text-center text-muted-foreground">Aucun match programmé ou joué récemment.</p>
       )}
    </div>
  );
}
