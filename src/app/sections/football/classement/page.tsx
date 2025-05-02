import LeagueTable from '@/components/league-table';
import { BarChart3 } from 'lucide-react';

export const metadata = {
  title: 'Classement Football - Etoile Sportive Du Sahel',
};

export default function FootballClassementPage() {
  return (
    <div className="space-y-8">
        <div className="flex items-center gap-3 border-b pb-4 mb-6">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Classement Ligue 1</h1>
        </div>
        <p className="text-muted-foreground">
            Suivez la position de l'Etoile Sportive du Sahel dans le championnat tunisien de Ligue 1.
        </p>
        <LeagueTable />
    </div>
  );
}
