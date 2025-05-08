

'use client'; // Make this a Client Component

import * as React from 'react'; // Import React and hooks
import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Landmark, Trophy, Users, Clock, ArrowRight, Camera } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from '@/components/ui/slider'; // Import ShadCN Slider

// Removed metadata export as it's not supported in Client Components directly
// export const metadata = { ... }; // Move to parent layout or generateMetadata if needed

// Keep original data structure but add winYears array
const historyData = {
  foundationYear: 1925,
  introText: "Fondé en 1925, l'Etoile Sportive du Sahel est l'un des clubs les plus prestigieux de Tunisie et d'Afrique. Surnommé 'Jawharat es-Sahel' (La Perle du Sahel), le club a marqué l'histoire du football tunisien et africain par ses nombreux succès et son engagement envers l'excellence sportive.",
  keyMoments: [
    { year: 1950, title: 'Premier Titre de Champion', description: 'L\'ESS remporte son premier championnat de Tunisie.', icon: Trophy, dataAiHint: "vintage football trophy" },
    { year: 1963, title: 'Doublé Coupe-Championnat', description: 'Une saison historique avec la victoire en Coupe et Championnat.', icon: Trophy, dataAiHint: "multiple trophies" },
    { year: 1997, title: 'Coupe d\'Afrique des Vainqueurs', description: 'Victoire dans la compétition.', icon: Trophy, dataAiHint: "african football trophy" }, // Updated name
    { year: 1999, title: 'Coupe de la Confédération', description: 'Victoire en Coupe de la CAF.', icon: Trophy, dataAiHint: "confederation cup africa" }, // Added 1999 CAF Cup
    { year: 2003, title: 'Coupe d\'Afrique des Vainqueurs', description: 'Deuxième victoire dans la compétition.', icon: Trophy, dataAiHint: "african football trophy" }, // Added 2003 Cup Winners Cup
    { year: 2006, title: 'Coupe de la Confédération', description: 'Nouveau succès continental.', icon: Trophy, dataAiHint: "confederation cup africa" }, // Added 2006 CAF Cup
    { year: 2007, title: 'Ligue des Champions de la CAF', description: 'Consécration suprême sur le continent africain.', icon: Trophy, dataAiHint: "champions league trophy africa" },
    { year: 2008, title: 'Supercoupe de la CAF', description: 'Victoire en Supercoupe Africaine.', icon: Trophy, dataAiHint: "african super cup trophy" }, // Added 2008 Super Cup
    { year: 2015, title: 'Coupe de la Confédération', description: 'Troisième succès dans la compétition.', icon: Trophy, dataAiHint: "confederation cup africa" },
    { year: 2023, title: '11ème Championnat', description: 'Dernier titre de champion en date.', icon: Trophy, dataAiHint: "modern football trophy tunisia" },
  ].sort((a, b) => a.year - b.year), // Sort key moments chronologically
  trophies: [
      { name: 'Championnat de Tunisie', totalCount: 11, icon: Trophy, years: '22/23, 15/16, 06/07, 96/97, 86/87, 85/86, 71/72, 65/66, 62/63, 57/58, 49/50', winYears: [2023, 2016, 2007, 1997, 1987, 1986, 1972, 1966, 1963, 1958, 1950], mainImageUrl: 'https://picsum.photos/300/200?random=tunisian-league', dataAiHint: 'tunisian league trophy' },
      { name: 'Coupe de Tunisie', totalCount: 10, icon: Trophy, years: '14/15, 13/14, 11/12, 95/96, 82/83, 80/81, 74/75, 73/74, 62/63, 58/59', winYears: [2015, 2014, 2012, 1996, 1983, 1981, 1975, 1974, 1963, 1959], mainImageUrl: 'https://picsum.photos/300/200?random=tunisian-cup', dataAiHint: 'tunisian cup trophy' },
      { name: 'Supercoupe de Tunisie', totalCount: 3, icon: Trophy, years: '86/87, 85/86, 72/73', winYears: [1987, 1986, 1973], mainImageUrl: 'https://picsum.photos/300/200?random=tunisian-supercup', dataAiHint: 'tunisian supercup trophy' },
      { name: 'Ligue des Champions CAF', totalCount: 1, icon: Trophy, years: '2007', winYears: [2007], mainImageUrl: 'https://picsum.photos/300/200?random=caf-champions-league', dataAiHint: 'caf champions league trophy' },
      { name: 'Coupe de la Confédération CAF', totalCount: 4, icon: Trophy, years: '2015, 2006, 98/99, 94/95', winYears: [2015, 2006, 1999, 1995], mainImageUrl: 'https://picsum.photos/300/200?random=caf-confederation-cup', dataAiHint: 'caf confederation cup trophy' },
      { name: 'Supercoupe de la CAF', totalCount: 2, icon: Trophy, years: '07/08, 97/98', winYears: [2008, 1998], mainImageUrl: 'https://picsum.photos/300/200?random=caf-supercup', dataAiHint: 'caf supercup trophy' },
      { name: "Coupe d'Afrique des Vainqueurs", totalCount: 2, icon: Trophy, years: '02/03, 96/97', winYears: [2003, 1997], mainImageUrl: 'https://picsum.photos/300/200?random=african-cup-winners', dataAiHint: 'african cup winners trophy' },
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


// Function to calculate trophy count up to a selected year
const calculateTrophiesByYear = (trophies: typeof historyData.trophies, selectedYear: number) => {
  const MAX_SCALE = 20; // Set the maximum scale for each progress bar
  return trophies.map(trophy => {
    const count = trophy.winYears.filter(year => year <= selectedYear).length;
    // Calculate percentage based on the fixed scale of 20, capped at 100%
    const percentage = MAX_SCALE > 0 ? Math.min((count / MAX_SCALE) * 100, 100) : 0;
    return { ...trophy, currentCount: count, percentage };
  });
};


export default function HistoryPage() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Calculate trophy counts based on the selected year using useMemo
  const trophiesByYear = useMemo(() => {
      return calculateTrophiesByYear(historyData.trophies, selectedYear);
  }, [selectedYear]); // Recalculate only when selectedYear changes


  // Split trophies for display
  const splitTrophies = (trophies: typeof trophiesByYear) => {
    const mid = Math.ceil(trophies.length / 2);
    return [trophies.slice(0, mid), trophies.slice(mid)];
  };
  const [leftTrophies, rightTrophies] = splitTrophies(trophiesByYear);


  // Handle slider change
  const handleSliderChange = useCallback((value: number[]) => {
    setSelectedYear(value[0]);
  }, []); // Empty dependency array as setSelectedYear is stable


  return (
    <div className="space-y-10 bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden rounded-b-lg shadow-xl">
        <Image
          src="https://picsum.photos/1400/400?random=100"
          alt="Stade Olympique de Sousse - Histoire"
          layout="fill"
          objectFit="cover"
          data-ai-hint="stadium panorama history"
          className="brightness-50"
          priority // Load hero image faster
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
                src="https://picsum.photos/400/400?random=70"
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
               <p className="text-sm text-muted-foreground mt-4">Un héritage de victoires et de trophées.</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Palmarès Section - Updated Design with Slider Functionality */}
      <section className="container mx-auto px-4 py-12">
         <header className="text-left mb-8">
             <h2 className="text-3xl font-bold text-primary">
                 Un palmarès pour la légende
             </h2>
             <p className="text-muted-foreground mt-2">Un héritage de victoires et de trophées.</p>
         </header>
         <div className="relative md:flex md:gap-8">
            {/* Image Column */}
            <div className="hidden md:block md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0">
                <div className="sticky top-24">
                    <Image
                        src="https://publish-p47754-e237306.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--8b61ca70-43f7-4be6-9c51-99888d45a26f/ND_SALA_JUNTAS_HE02463Thumb.app.webp?preferwebp=true&width=700"
                        alt="Palmarès ESS - Trophées"
                        width={400}
                        height={600}
                        className="rounded-lg shadow-lg object-cover h-[600px]"
                        data-ai-hint="trophy cabinet football display"
                    />
                </div>
            </div>

             {/* Content Column */}
            <div className="flex-1 rm-palmares__container">
                <Card className="shadow-lg border rounded-lg overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                         {/* Wrap Tabs and Content */}
                         <Tabs defaultValue="football" className="w-full">
                           {/* Tabs and Link Row */}
                           <div className="rm-palmares__nav flex justify-between items-center mb-6 border-b pb-4">
                               <TabsList className="rm-palmares__tabs bg-transparent p-0 gap-2">
                                     <TabsTrigger value="football" className="rm-tabs__pill rm-tabs__pill--x-small rm-tabs__pill--selected data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1 h-auto text-xs">Football</TabsTrigger>
                                     <TabsTrigger value="handball" className="rm-tabs__pill rm-tabs__pill--x-small data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1 h-auto text-xs border border-border">Handball</TabsTrigger>
                                     <TabsTrigger value="basketball" className="rm-tabs__pill rm-tabs__pill--x-small data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1 h-auto text-xs border border-border">Basket-ball</TabsTrigger>
                                     <TabsTrigger value="volleyball" className="rm-tabs__pill rm-tabs__pill--x-small data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1 h-auto text-xs border border-border">Volley-ball</TabsTrigger>
                               </TabsList>
                                <Button variant="link" size="sm" asChild className="rm-palmares__button text-xs text-primary hover:underline p-0 h-auto">
                                   <Link href="/histoire/palmares">
                                       Voir le palmarès complet
                                   </Link>
                               </Button>
                           </div>

                           {/* Trophy List Columns */}
                           <TabsContent value="football">
                             <div className="rm-palmares__content grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                               {/* Column 1 */}
                               <ol className="rm-palmares__list space-y-5">
                                  {leftTrophies.map((trophy) => (
                                     <li key={trophy.name} className="rm-palmares__item">
                                        <div className="rm-bar flex flex-col group" title={`${trophy.currentCount} (${trophy.years})`}>
                                            <div className="rm-bar__content flex items-center gap-3 mb-1">
                                                <trophy.icon className="rm-bar__icon h-6 w-6 text-accent flex-shrink-0" />
                                                <span className="rm-bar__number text-lg font-bold text-foreground">{trophy.currentCount}</span>
                                                 <p className="rm-palmares__name text-sm font-medium text-muted-foreground truncate flex-1">{trophy.name}</p>
                                            </div>
                                            {/* Dynamic Progress Bar */}
                                            <div className="rm-bar__bg h-1 w-full bg-muted rounded-full overflow-hidden ml-9">
                                                <div className="rm-bar__progress h-full bg-primary rounded-full transition-all duration-300 group-hover:bg-accent" style={{ width: `${trophy.percentage}%` }}></div>
                                            </div>
                                        </div>
                                     </li>
                                  ))}
                               </ol>
                               {/* Column 2 */}
                               <ol className="rm-palmares__list space-y-5">
                                  {rightTrophies.map((trophy) => (
                                     <li key={trophy.name} className="rm-palmares__item">
                                        <div className="rm-bar flex flex-col group" title={`${trophy.currentCount} (${trophy.years})`}>
                                            <div className="rm-bar__content flex items-center gap-3 mb-1">
                                                <trophy.icon className="rm-bar__icon h-6 w-6 text-accent flex-shrink-0" />
                                                <span className="rm-bar__number text-lg font-bold text-foreground">{trophy.currentCount}</span>
                                                 <p className="rm-palmares__name text-sm font-medium text-muted-foreground truncate flex-1">{trophy.name}</p>
                                            </div>
                                            {/* Dynamic Progress Bar */}
                                            <div className="rm-bar__bg h-1 w-full bg-muted rounded-full overflow-hidden ml-9">
                                                <div className="rm-bar__progress h-full bg-primary rounded-full transition-all duration-300 group-hover:bg-accent" style={{ width: `${trophy.percentage}%` }}></div>
                                            </div>
                                        </div>
                                     </li>
                                  ))}
                               </ol>
                             </div>

                             {/* Footer - Range Slider */}
                             <div className="rm-palmares__footer mt-8 pt-6 border-t">
                                <div className="rm-palmares__control rm-range flex items-center gap-4">
                                     <Slider
                                         id="palmaresYearSlider"
                                         min={historyData.foundationYear}
                                         max={currentYear}
                                         step={1}
                                         value={[selectedYear]} // Controlled component value
                                         onValueChange={handleSliderChange} // Use the handler
                                         className="flex-grow"
                                         aria-label="Année du palmarès"
                                     />
                                     <span className="rm-range__value text-sm font-medium text-foreground w-12 text-right">{selectedYear}</span>
                                </div>
                             </div>
                           </TabsContent>

                           {/* Placeholder Content for other sports */}
                           <TabsContent value="handball"><p className="text-muted-foreground p-4 text-center">Palmarès Handball bientôt disponible.</p></TabsContent>
                           <TabsContent value="basketball"><p className="text-muted-foreground p-4 text-center">Palmarès Basket-ball bientôt disponible.</p></TabsContent>
                           <TabsContent value="volleyball"><p className="text-muted-foreground p-4 text-center">Palmarès Volley-ball bientôt disponible.</p></TabsContent>

                         </Tabs> {/* End Tabs Wrapper */}
                    </CardContent>
                </Card>
            </div>
         </div>
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
                <div className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background shadow md:left-1/2 md:-translate-x-1/2 flex items-center justify-center`}>
                </div>
                <Card className={`w-full md:w-[45%] p-4 shadow-lg bg-card ${index % 2 === 0 ? 'ml-12 md:ml-0' : 'ml-12 md:ml-0 md:mr-0'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <Badge variant="default" className="text-base">{moment.year}</Badge>
                         <moment.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h4 className="font-semibold text-lg mb-1">{moment.title}</h4>
                    <p className="text-sm text-muted-foreground">{moment.description}</p>
                    <Image
                       src={`https://picsum.photos/300/150?random=${75 + index}`}
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
         <Card>
           <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 pt-6">
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
