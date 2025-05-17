
import AdminHeader from '@/components/admin/admin-header';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Newspaper, CalendarDays, Ticket as TicketIcon, BarChartHorizontalBig, ArrowRight, Edit3, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge'; // Added import for Badge

// Mock data for dashboard
const stats = [
  { title: 'Visiteurs', value: '12,345', change: '+12%', icon: Users, iconBgColor: 'bg-red-100', iconTextColor: 'text-red-600' },
  { title: 'Actualités', value: '48', change: '+5', icon: Newspaper, iconBgColor: 'bg-blue-100', iconTextColor: 'text-blue-600' },
  { title: 'Matches à venir', value: '3', change: '0', icon: CalendarDays, iconBgColor: 'bg-yellow-100', iconTextColor: 'text-yellow-600' },
  { title: 'Billets vendus', value: '1,234', change: '+43%', icon: TicketIcon, iconBgColor: 'bg-green-100', iconTextColor: 'text-green-600' },
];

const upcomingEvents = [
  { title: 'Match vs Espérance Tunis', date: '20/05/2024', time: '19:00', location: 'Stade Olympique de Sousse' },
  { title: 'Match vs Club Africain', date: '27/05/2024', time: '17:00', location: 'Stade Olympique de Radès' },
  { title: 'Détection U17', date: '05/06/2024', time: '09:00', location: 'Centre de Formation ESS' },
];

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader pageTitle="Tableau de bord" pageSubtitle="Bienvenue sur votre espace administrateur" />
      <div className="space-y-6 mt-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="shadow hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-md ${stat.iconBgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconTextColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : ''}>
                    {stat.change.startsWith('+') || stat.change.startsWith('-') ? stat.change : stat.change !== '0' ? `+${stat.change}` : ''}
                  </span>
                  {stat.change !== '0' && ' vs hier'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Statistiques des visites (Placeholder) */}
          <Card className="lg:col-span-2 shadow hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartHorizontalBig className="h-5 w-5 text-primary" />
                Statistiques des visites
              </CardTitle>
              <CardDescription>Aperçu des visites sur les 30 derniers jours.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
              Graphique des statistiques des visites (Placeholder)
            </CardContent>
          </Card>

          {/* Prochains Événements */}
          <Card className="shadow hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Prochains Événements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start justify-between pb-2 border-b last:border-b-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.location}, {event.time}</p>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">{event.date}</Badge>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-muted-foreground text-center">Aucun événement à venir.</p>
              )}
              <Button variant="outline" size="sm" asChild className="w-full mt-4">
                <Link href="/admin/matches">
                  Gérer les matches <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions or other sections can be added here */}
        <Card>
            <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Button variant="default" asChild>
                    <Link href="/admin/actualites/ajouter">
                        <Edit3 className="mr-2 h-4 w-4" /> Ajouter une actualité
                    </Link>
                </Button>
                 <Button variant="outline" asChild>
                    <Link href="/admin/equipes">
                        <Users className="mr-2 h-4 w-4" /> Gérer les équipes
                    </Link>
                </Button>
                 <Button variant="outline" asChild>
                    <Link href="/admin/palmares">
                        <Trophy className="mr-2 h-4 w-4" /> Gérer le palmarès
                    </Link>
                </Button>
            </CardContent>
        </Card>

      </div>
    </>
  );
}
