import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, Trophy, Users, Clock, CalendarCheck } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // Added Button
import Link from 'next/link'; // Added Link

export const metadata = {
  title: 'Histoire du Club - Etoile Sportive Du Sahel',
};

// Mock data - Replace with actual data fetching
const historyData = {
  foundationYear: 1925,
  introText: "Fondé en 1925, l'Etoile Sportive du Sahel est l'un des clubs les plus prestigieux de Tunisie et d'Afrique. Surnommé 'Jawharat es-Sahel' (La Perle du Sahel), le club a marqué l'histoire du football tunisien et africain par ses nombreux succès et son engagement envers l'excellence sportive.",
  keyMoments: [
    { year: 1950, title: 'Premier Titre de Champion', description: 'L\'ESS remporte son premier championnat de Tunisie.', icon: Trophy, dataAiHint: "vintage football trophy" },
    { year: 1963, title: 'Doublé Coupe-Championnat', description: 'Une saison historique avec la victoire en Coupe et Championnat.', icon: Trophy, dataAiHint: "multiple trophies" },
    { year: 1997, title: 'Coupe de la CAF', description: 'Premier titre continental majeur.', icon: Trophy, dataAiHint: "african football trophy" },
    { year: 2007, title: 'Ligue des Champions de la CAF', description: 'Consécration suprême sur le continent africain.', icon: Trophy, dataAiHint: "champions league trophy africa" },
    { year: 2015, title: 'Coupe de la Confédération', description: 'Nouveau succès continental.', icon: Trophy, dataAiHint: "confederation cup africa" },
  ],
  trophies: [
    { name: 'Championnat de Tunisie', count: 11, icon: Trophy },
    { name: 'Coupe de Tunisie', count: 10, icon: Trophy },
    { name: 'Ligue des Champions CAF', count: 1, icon: Trophy },
    { name: 'Coupe de la Confédération CAF', count: 2, icon: Trophy },
    { name: 'Coupe des Coupes CAF', count: 2, icon: Trophy },
    { name: 'Supercoupe de la CAF', count: 2, icon: Trophy },
    // Add more trophies as needed
  ],
  legendaryPlayers: [
    { name: 'Abdelmajid Chetali', period: '1957–1968', imageUrl: 'https://picsum.photos/100/100?random=71', dataAiHint: "vintage football player black and white" },
    { name: 'Zoubaier Baya', period: '1991–1997, 2001–2002', imageUrl: 'https://picsum.photos/100/100?random=72', dataAiHint: "football player 90s" },
    { name: 'Francileudo Santos', period: '2000–2005', imageUrl: 'https://picsum.photos/100/100?random=73', dataAiHint: "football player early 2000s" },
    { name: 'Amine Chermiti', period: '2006–2008, 2016-2019', imageUrl: 'https://picsum.photos/100/100?random=74', dataAiHint: "football player modern" },
  ],
  presidents: [
     { name: 'Chédly Boujemla', period: '1925–1926 (Premier Président)' },
     { name: 'Hamed Karoui', period: '1961–1981' },
     { name: 'Othman Jenayah', period: '1993–2006 & 2022-Présent' },
     { name: 'Ridha Charfeddine', period: '2012–2022' },
  ]
};

export default function HistoryPage() {
  return (
    <div className="space-y-10 bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-b-lg shadow-xl">
        <Image
          src="https://picsum.photos/1400/400?random=100" // Placeholder image for the hero section
          alt="Stade Olympique de Sousse - Histoire"
          layout="fill"
          objectFit="cover"
          data-ai-hint="stadium panorama history"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-t from-black/50 to-transparent p-4">
          <Landmark className="h-16 w-16 text-white mb-4 drop-shadow-lg" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight drop-shadow-lg">
            Notre Glorieuse Histoire
          </h1>
          <p className="text-lg md:text-xl max-w-3xl text-white/90 drop-shadow-md">
            Depuis 1925, l'Etoile brille dans le ciel du football africain.
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
        <Card className="shadow-xl bg-card text-card-foreground border border-border overflow-hidden">
          <div className="md:flex items-stretch">
            <div className="md:w-1/3 relative hidden md:block">
              <Image
                src="https://picsum.photos/400/400?random=70" // Placeholder image
                alt="Fondation ESS - Vintage"
                layout="fill"
                objectFit="cover"
                data-ai-hint="vintage football team black and white tunisia"
                className="rounded-l-lg"
              />
            </div>
            <div className="md:w-2/3 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-4 text-sm bg-accent/10 text-accent-foreground border-accent/20">
                 Fondé le <span className="font-bold ml-1">{historyData.foundationYear}</span>
              </Badge>
              <CardTitle className="text-3xl font-bold mb-4 text-primary">Jawharat es-Sahel</CardTitle>
              <CardDescription className="text-base leading-relaxed text-foreground/80">
                {historyData.introText}
              </CardDescription>
            </div>
          </div>
        </Card>
      </section>


       {/* Palmarès Section - New Design */}
       <section className="container mx-auto px-4 py-12">
         <div className="text-center mb-8">
             <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
                 <Trophy className="h-8 w-8 text-accent" /> Palmarès du Club
             </h2>
             <p className="text-muted-foreground mt-2">Un héritage de victoires et de trophées.</p>
         </div>
         <Card className="overflow-hidden shadow-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Column - Image */}
                <div className="relative h-64 md:h-auto">
                    <Image
                        src="https://picsum.photos/600/400?random=80" // Placeholder for trophy cabinet image
                        alt="Palmarès ESS - Trophées"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                        data-ai-hint="trophy cabinet football"
                    />
                </div>
                {/* Right Column - Trophy List */}
                <div className="p-6 md:p-8">
                    {/* Optional: Filter Buttons (Omitted for now) */}
                    {/* <div className="flex gap-2 mb-6">
                        <Button size="sm">Football</Button>
                        <Button size="sm" variant="outline">Basket-ball</Button>
                    </div> */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                        {historyData.trophies.map((trophy) => (
                            <div key={trophy.name} className="flex items-start gap-3">
                                <trophy.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-3xl font-bold text-foreground">{trophy.count}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{trophy.name}</p>
                                    <div className="w-10 h-0.5 bg-primary mt-1.5"></div> {/* Decorative line */}
                                </div>
                            </div>
                        ))}
                    </div>
                     {/* Optional: Link to full list (Omitted for now) */}
                    {/* <Button variant="link" className="mt-6 p-0 text-primary">Voir le palmarès complet</Button> */}
                </div>
            </div>
         </Card>
       </section>


      {/* Key Moments Timeline Section */}
      <section className="container mx-auto px-4 py-12 bg-muted/50 rounded-lg">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
                <Clock className="h-8 w-8 text-primary" /> Moments Historiques
            </h2>
             <p className="text-muted-foreground mt-2">Les dates qui ont façonné notre légende.</p>
        </div>
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent md:before:mx-auto md:before:ml-0">
          {historyData.keyMoments.map((moment, index) => (
            <div key={moment.year} className={`relative flex items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} md:justify-between`}>
                {/* Dot */}
                <div className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background shadow md:left-1/2 md:-translate-x-1/2 flex items-center justify-center`}>
                    <moment.icon className="h-2 w-2 text-primary-foreground" />
                </div>
                 {/* Content Card */}
                <Card className={`w-full md:w-[45%] p-4 shadow-lg bg-card ${index % 2 === 0 ? 'ml-12 md:ml-0' : 'ml-12 md:ml-0 md:mr-0'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <Badge variant="default" className="text-base">{moment.year}</Badge>
                         <moment.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h4 className="font-semibold text-lg mb-1">{moment.title}</h4>
                    <p className="text-sm text-muted-foreground">{moment.description}</p>
                    {/* Optional Image inside card */}
                    <Image
                       src={`https://picsum.photos/300/150?random=${75 + index}`} // Placeholder image
                       alt={moment.title}
                       width={300}
                       height={150}
                       className="rounded-md shadow-sm border mt-3 w-full object-cover"
                       data-ai-hint={moment.dataAiHint}
                    />
                </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Legendary Players Section */}
       <section className="container mx-auto px-4 py-12">
         <div className="text-center mb-8">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
               <Users className="h-8 w-8 text-primary" /> Joueurs Emblématiques
            </h2>
             <p className="text-muted-foreground mt-2">Ceux qui ont porté nos couleurs avec fierté.</p>
        </div>
         {/* Corrected: Wrapped the grid in Card and CardContent */}
         <Card>
           <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 pt-6"> {/* Added pt-6 for padding */}
             {historyData.legendaryPlayers.map((player) => (
                 <div key={player.name} className="text-center p-4 border rounded-lg bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                     <Image
                         src={player.imageUrl}
                         alt={player.name}
                         width={100}
                         height={100}
                         className="rounded-full mx-auto mb-4 border-4 border-primary/20 shadow-lg"
                         data-ai-hint={player.dataAiHint}
                     />
                     <p className="font-semibold text-lg text-foreground">{player.name}</p>
                     <p className="text-xs text-muted-foreground mt-1">{player.period}</p>
                 </div>
             ))}
           </CardContent>
         </Card>
       </section>

       {/* Presidents Section */}
      <section className="container mx-auto px-4 py-12 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
         <div className="text-center mb-8">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
               <Landmark className="h-8 w-8 text-primary" /> Présidents Marquants
            </h2>
            <p className="text-muted-foreground mt-2">Les dirigeants qui ont guidé le club.</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {historyData.presidents.map((president) => (
                   <li key={president.name} className="flex justify-between items-center p-4 hover:bg-muted/50">
                       <span className="font-medium text-foreground">{president.name}</span>
                       <Badge variant="outline" className="text-xs">{president.period}</Badge>
                   </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}
