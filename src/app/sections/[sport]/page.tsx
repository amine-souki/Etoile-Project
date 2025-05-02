import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BarChart3, Newspaper, Swords, Hand, Dribbble, Volleyball } from 'lucide-react'; // Changed Handball to Hand
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamicParams = false; // Prevent generation of routes not explicitly listed

export async function generateStaticParams() {
  return [
    { sport: 'football' },
    { sport: 'handball' },
    { sport: 'basketball' },
    { sport: 'volleyball' },
  ];
}

export async function generateMetadata({ params }: { params: { sport: string } }) {
  const sportName = getSportDetails(params.sport)?.name || 'Section Sportive';
  return {
    title: `${sportName} - Etoile Sportive Du Sahel`,
  };
}


// Mock data - Replace with actual data fetching
const sportData: { [key: string]: any } = {
  football: {
    name: 'Football',
    icon: Swords,
    team: [
      { name: 'Ali Jemal', position: 'Gardien', imageUrl: 'https://picsum.photos/100/100?random=11', dataAiHint: "football player portrait" },
      { name: 'Ghofrane Naouali', position: 'Défenseur', imageUrl: 'https://picsum.photos/100/100?random=12', dataAiHint: "football player portrait" },
      { name: 'Yassine Chikhaoui', position: 'Milieu', imageUrl: 'https://picsum.photos/100/100?random=13', dataAiHint: "football player portrait" },
      { name: 'Vinny Bongonga', position: 'Attaquant', imageUrl: 'https://picsum.photos/100/100?random=14', dataAiHint: "football player portrait" },
    ],
    results: { rank: 1, points: 58, lastMatch: 'Victoire 2-1 vs CA' },
    news: [
      { title: 'Préparation intensive avant le prochain match', date: '18/07/2024' },
      { title: 'Nouveau sponsor maillot annoncé', date: '15/07/2024' },
    ],
  },
  handball: {
    name: 'Handball',
    icon: Hand, // Changed from Handball
    team: [{ name: 'Player A', position: 'Pivot', imageUrl: 'https://picsum.photos/100/100?random=21', dataAiHint: "handball player action" }, { name: 'Player B', position: 'Arrière', imageUrl: 'https://picsum.photos/100/100?random=22', dataAiHint: "handball player action" }],
    results: { rank: 2, points: 45, lastMatch: 'Nul 28-28 vs EST' },
    news: [{ title: 'Qualification pour la finale de la coupe', date: '17/07/2024' }],
  },
  basketball: {
      name: 'Basketball',
      icon: Dribbble, // Changed from Basketball
      team: [{ name: 'Player X', position: 'Meneur', imageUrl: 'https://picsum.photos/100/100?random=31', dataAiHint: "basketball player action" }, { name: 'Player Y', position: 'Ailier', imageUrl: 'https://picsum.photos/100/100?random=32', dataAiHint: "basketball player action" }],
      results: { rank: 3, points: 40, lastMatch: 'Défaite 75-82 vs USMo' },
      news: [{ title: 'Recrutement d\'un joueur étranger', date: '16/07/2024' }],
  },
   volleyball: {
      name: 'Volleyball',
      icon: Volleyball,
      team: [{ name: 'Player P', position: 'Central', imageUrl: 'https://picsum.photos/100/100?random=41', dataAiHint: "volleyball player action" }, { name: 'Player Q', position: 'Passeur', imageUrl: 'https://picsum.photos/100/100?random=42', dataAiHint: "volleyball player action" }],
      results: { rank: 1, points: 50, lastMatch: 'Victoire 3-0 vs CSS' },
      news: [{ title: 'Stage de préparation en Europe', date: '14/07/2024' }],
  },
};

function getSportDetails(sport: string) {
    return sportData[sport.toLowerCase()];
}

export default async function SportSectionPage({ params }: { params: { sport: string } }) {
  const sportDetails = getSportDetails(params.sport);

  if (!sportDetails) {
    notFound();
  }

  const SportIcon = sportDetails.icon;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <SportIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Section {sportDetails.name}</h1>
      </div>

      {/* Team Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Effectif</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
             {sportDetails.team.map((player: any) => (
                <div key={player.name} className="text-center p-2 border rounded-lg hover:shadow-sm transition-shadow">
                    <Image
                        src={player.imageUrl}
                        alt={player.name}
                        width={80}
                        height={80}
                        className="rounded-full mx-auto mb-2 border-2 border-primary"
                        data-ai-hint={player.dataAiHint}
                    />
                    <p className="font-medium text-sm">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.position}</p>
                </div>
             ))}
           </div>
           {sportDetails.team.length === 0 && <p className="text-muted-foreground text-center">Informations sur l'effectif bientôt disponibles.</p>}
        </CardContent>
      </Card>

      {/* Results/Ranking Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Résultats & Classement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sportDetails.results ? (
             <>
                <p><strong>Classement:</strong> {sportDetails.results.rank}e place</p>
                <p><strong>Points:</strong> {sportDetails.results.points}</p>
                <p><strong>Dernier Match:</strong> {sportDetails.results.lastMatch}</p>
             </>
          ) : (
              <p className="text-muted-foreground text-center">Résultats et classement bientôt disponibles.</p>
          )}
        </CardContent>
      </Card>

      {/* Specific News Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Newspaper className="h-5 w-5 text-primary" /> Actualités {sportDetails.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {sportDetails.news.map((newsItem: any, index: number) => (
              <li key={index} className="border-b pb-2 last:border-b-0">
                <p className="font-medium">{newsItem.title}</p>
                <p className="text-sm text-muted-foreground">{newsItem.date}</p>
              </li>
            ))}
             {sportDetails.news.length === 0 && <p className="text-muted-foreground text-center">Aucune actualité spécifique pour cette section.</p>}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
