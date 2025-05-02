import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, Trophy, Users, Clock } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Histoire du Club - Etoile Sportive Du Sahel',
};

// Mock data - Replace with actual data fetching
const historyData = {
  foundationYear: 1925,
  keyMoments: [
    { year: 1950, title: 'Premier Titre de Champion', description: 'L\'ESS remporte son premier championnat de Tunisie.', icon: Trophy, dataAiHint: "vintage football trophy" },
    { year: 1963, title: 'Doublé Coupe-Championnat', description: 'Une saison historique avec la victoire en Coupe et Championnat.', icon: Trophy, dataAiHint: "multiple trophies" },
    { year: 1997, title: 'Coupe de la CAF', description: 'Premier titre continental majeur.', icon: Trophy, dataAiHint: "african football trophy" },
    { year: 2007, title: 'Ligue des Champions de la CAF', description: 'Consécration suprême sur le continent africain.', icon: Trophy, dataAiHint: "champions league trophy africa" },
    { year: 2015, title: 'Coupe de la Confédération', description: 'Nouveau succès continental.', icon: Trophy, dataAiHint: "confederation cup africa" },
  ],
  legendaryPlayers: [
    { name: 'Abdelmajid Chetali', period: '1957–1968', imageUrl: 'https://picsum.photos/100/100?random=71', dataAiHint: "vintage football player black and white" },
    { name: 'Zoubaier Baya', period: '1991–1997, 2001–2002', imageUrl: 'https://picsum.photos/100/100?random=72', dataAiHint: "football player 90s" },
    { name: 'Francileudo Santos', period: '2000–2005', imageUrl: 'https://picsum.photos/100/100?random=73', dataAiHint: "football player early 2000s" },
  ],
  presidents: [
     { name: 'Chédly Boujemla', period: '1925–1926 (Premier Président)' },
     { name: 'Hamed Karoui', period: '1961–1981' },
     { name: 'Othman Jenayah', period: '1993–2006' },
     { name: 'Ridha Charfeddine', period: '2012–2022' },
  ]
};

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <Landmark className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Histoire du Club</h1>
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-lg">Fondé en <span className="font-bold text-primary">{historyData.foundationYear}</span>, l'Etoile Sportive du Sahel est l'un des clubs les plus prestigieux de Tunisie et d'Afrique, riche d'une histoire marquée par de nombreux succès.</p>
          <Image
              src="https://picsum.photos/600/300?random=70" // Placeholder vintage image
              alt="Ancienne équipe ESS"
              width={600}
              height={300}
              className="rounded-lg mx-auto mt-4 shadow-md"
              data-ai-hint="vintage football team black and white tunisia"
          />
        </CardContent>
      </Card>


      {/* Interactive Timeline Section - Conceptual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Moments Clés (Ligne du Temps)</CardTitle>
        </CardHeader>
        <CardContent className="relative pl-6">
          {/* Vertical line */}
           <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border -ml-[1px]"></div>

          {historyData.keyMoments.map((moment, index) => (
            <div key={moment.year} className="relative mb-8 pl-8">
               {/* Dot on the line */}
               <div className={`absolute left-0 top-1 w-3 h-3 rounded-full bg-primary -ml-[7px] border-2 border-background`}></div>
               <p className="font-semibold text-primary text-lg">{moment.year}</p>
               <h4 className="font-medium mt-1 flex items-center gap-1"><moment.icon className="h-4 w-4 text-accent" /> {moment.title}</h4>
               <p className="text-sm text-muted-foreground mt-1">{moment.description}</p>
               <Image
                  src={`https://picsum.photos/200/100?random=${75 + index}`} // Placeholder image for moment
                  alt={moment.title}
                  width={200}
                  height={100}
                  className="rounded-md mt-2 shadow-sm"
                  data-ai-hint={moment.dataAiHint}
                />
            </div>
          ))}
            <p className="text-center text-muted-foreground italic pt-4">
             Note: Une ligne du temps interactive sera implémentée pour une meilleure expérience.
           </p>
        </CardContent>
      </Card>

      {/* Legendary Players Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Joueurs de Légende</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
           {historyData.legendaryPlayers.map((player) => (
               <div key={player.name} className="text-center p-2 border rounded-lg hover:shadow-sm transition-shadow">
                   <Image
                       src={player.imageUrl}
                       alt={player.name}
                       width={80}
                       height={80}
                       className="rounded-full mx-auto mb-2 border-2 border-accent"
                       data-ai-hint={player.dataAiHint}
                   />
                   <p className="font-medium text-sm">{player.name}</p>
                   <p className="text-xs text-muted-foreground">{player.period}</p>
               </div>
           ))}
        </CardContent>
      </Card>

       {/* Presidents Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5 text-primary" /> Présidents Marquants</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {historyData.presidents.map((president) => (
               <li key={president.name} className="flex justify-between">
                   <span>{president.name}</span>
                   <span className="text-muted-foreground">{president.period}</span>
               </li>
            ))}
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}
