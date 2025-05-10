

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BarChart3, Newspaper, Swords, Hand, Dribbble, Volleyball, ArrowRight, Shirt, Award } from 'lucide-react'; // Added Shirt, ArrowRight, Award
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import PlayerCard from '@/components/player-card'; 
import { cn } from '@/lib/utils'; 

export const dynamicParams = false; 

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

const footballTeamData = {
  gardiens: [
    { name: 'Anas Khardani', number: 40, age: 19, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/491996656_1042184334623392_6711461273907594506_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=AGNsKzsShq4Q7kNvwEWYXji&_nc_oc=AdldDIyRLvad8GlN8PJWm2g-ReQYrx17RYEbEIbdtEXbpl_bciiw1uGqRIg0dHcNIXI&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=Jih1_M4YFygIjcV7nrGLnw&oh=00_AfGqy4A0f2Gl_DiNk-EcucCg4LyH1SCEQKqWBTSmKvaizg&oe=681AEA03' },
  ],
  defenseurs: [
    { name: 'Zied Boughattas', number: 15, age: 34, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/489328660_1034934655348360_2243609516177186173_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=QuQQNNJdXmgQ7kNvwHsdH1P&_nc_oc=AdkpyETXae3-xkz07vTlVkimlSGMzeHXcFTTdfzAShmWifxLJAX8QC-gcsPbC4Owp4o&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=vb_42zquYFR1EBO1ObFvuQ&oh=00_AfHjrgPTLqiNNB_A6K_HcKaE_N7wJCXH0-EfN52eIWrAcA&oe=681B1529' },
    { name: 'Ghofrane Naouali', number: 3, age: 25, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/492763056_1045370367638122_8030355292069778414_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=MHmJ2MbJhI8Q7kNvwHonREn&_nc_oc=AdnHCyCZrXfyCbAyP6ghOKV-876aL7MLjKNTkh-cQ3jXcRU5FifcuiA35pngXN-p8pM&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=3HLTQ8wL3DL8II3s9UHdpA&oh=00_AfFLN9kHV15LZUSunf2FE9OAgBfi0Q1iRisH_yrShvkxhw&oe=681B0564' },
    { name: 'Houssem Dagdoug', number: 33, age: 26, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/490404729_1037060901802402_1023219486861097324_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=c4gHxiWlLEkQ7kNvwHH0nNu&_nc_oc=Admbw3IjmAxQC1nnEJAhQMDiaSmm7AelDcMeWffOS_9AR582HHblBaLb7OuS9ErUDKI&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=ENdGv5YBDeB4XUeJaDwmuQ&oh=00_AfGL-cAznPC1WeXeO675ZISyK9dc_dHQ8LoPuUHjsX7lcQ&oe=681B199F' },
    { name: 'Salaheddine Ghedamsi', number: 26, age: 26, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/494493863_1050381567137002_1038924075565308190_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=8asD0lXLXxAQ7kNvwFL5kpR&_nc_oc=AdlXjDlPGWqPJd9mTXgkc3vx4TXKiHIlG9UAgWKiHsngKiNHR9OxjTiGq05qkyi5bIY&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=Sp91qceqpxXELbGhj3Zx9g&oh=00_AfH-qxA0f9oTCPuQMmparmLuHXkCl28uv4STH3sHPMRlhg&oe=681B0C62' },
  ],
  milieux: [
    { name: 'Moukhles Chouchene', number: 13, age: 21, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/492522280_1045177557657403_6031301602544237455_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=FrdA5F8uFUMQ7kNvwHChYp5&_nc_oc=AdkhXklNH1qLY4uokZKeSAexkr9xoy5eG58pAmF6AECjnIxVGjUyUHOuSRFzfz1lTEQ&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=JKWojxeoUUX7h2KEkKoICg&oh=00_AfGDg0aYYRxV4ZeJLvrgX7PwcrUXSBQ-zc5V2_GQRcDBxQ&oe=681AE60A' },
    { name: 'Jean-Cedric Gbo', number: 6, age: 21, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/491144320_1041107841397708_3148846353066868825_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=I3VE93lTqkoQ7kNvwFONhlx&_nc_oc=Admogb72wndvu2WVeiDkMNNJbuR_SW1K5J2OLQGR86jM6p9dgupuJq4QbNDSskLLMZs&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=rZ88ifzu89s8Yfb2N2A_Tw&oh=00_AfHxJ0N3G_fWsT7DTmnpYRCzpI7KSPVXaI9dQKmrSGW6Lg&oe=681B05C2' },
    { name: 'Mohamed Amine Ben Amor', number: 29, age: 32, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/488903524_1031071715734654_8237923256666186189_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=vVvCKS4_NmQQ7kNvwHATNjY&_nc_oc=AdmfdBGTjDkc0XFZLb1U_n-KAFeSxQF2RGUbIozJV3lKkOjKSfaKQ3mhyCEOrGocjjw&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=J8rUp0eCLYvPx7NiSULgdA&oh=00_AfG8e5gBEJhtEzAAcCp_YaZU9bNmyGMi39mwTq3_9UjUpA&oe=681AF7E0' },
    { name: 'Mohamed Rayene Anane', number: 30, age: 18, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/491932096_1042343771274115_977730305078275370_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=WS1jrG5wg9IQ7kNvwF3gPpW&_nc_oc=Adm-QjTHcN1XkoEBIjkIkb6gz_VbFtteDYWFxz6rMYEKQccmLHaEolWNVwT0LMak1_U&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=S2Lp7dEk5sy5ZPvx0oFtOA&oh=00_AfExOoVz9VyOLx7r3FRqF1Z3e3fY6_EpDPVwJTdzN0QzlQ&oe=681B0DBD' },
  ],
  attaquants: [
    { name: 'Nizar Smichi', number: 21, age: 25, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/494350671_1051771460331346_5448770140573527931_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=w6NG4BoFJXMQ7kNvwEjJRdd&_nc_oc=AdlM_MYOJd3VbZi89HddGm6NXBTRjbWyNQJrGdGISRX16PGRkhpmJf7thVmbszRHRhg&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=NkDepaeWNcloyvbJWW8mNg&oh=00_AfEE7HuD0nEDWrWRhW0K38-jAqLeJ9lrGqjSOejjU69DLg&oe=681B1661' },
    { name: 'Ibrahim Souissi', number: 35, age: 20, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/492189950_1044506177724541_6423276058924632271_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=K_-vPCMO2YYQ7kNvwHajZ2W&_nc_oc=AdlAEvAhUYo4Movud2o6Lh1QbxHSbnl8wXJLRv1Yc91QNFIw6AV7QQicj5h3Q1oqUeo&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=lriNEMip68eJasrQXqsT6Q&oh=00_AfFysx90Zw5bCpIcTmSgS2V8sWKfJedq61lWndunnYpFYg&oe=681AF47A' },
    { name: 'Yassine Chamakhi', number: 17, age: 30, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/488972979_1032253515616474_6855352999991961119_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=cNRQOzM1BVsQ7kNvwG3YrQ0&_nc_oc=AdnBABWgI8BwGe0T1_GCuzrABCROi3GxO2VBg2FMqAzP0CakD0EhjTZ8KgL6BeBuNBQ&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=J8rUp0eCLYvPx7NiSULgdA&oh=00_AfE3yteKp56jysCohTlMMflpQ7TwxzPw8wXRCBAceCWBmQ&oe=681AFC2B' },
    { name: 'Raki Aouani', number: 28, age: 20, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/492188370_1045395084302317_8103899362619654230_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=0B3feKbk-yoQ7kNvwGaTj1u&_nc_oc=AdkToBYAPjW44lK8u-QnQkIx3GcadonrhLA579ZGbuSzvvDucd10L-PwabbluCSE4KU&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=SepFjwnfeuidf1aAReJGlQ&oh=00_AfFbHzNViMezUoThmfx5wm0EdRL13YIzntLLDf6kBJGD0Q&oe=681AF37B' },
    { name: 'Firas Chaouat', number: 9, age: 28, imageUrl: 'https://scontent.ftun19-1.fna.fbcdn.net/v/t39.30808-6/490575237_1036874401821052_6422065668135545515_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=F-rQZBMWe_IQ7kNvwFN46gS&_nc_oc=AdnluEEE3S66Lq2j9uATWh3AppCS2jt5yqobA6w-hZ-vM4P-mealqyyQKtkatIOT5u8&_nc_zt=23&_nc_ht=scontent.ftun19-1.fna&_nc_gid=_8Cipnb33us-FusSDTQfCw&oh=00_AfENgIPZakwvzSWAGOv8FiMxd1RZ0aSmYbyBLZwBiYgQ7A&oe=681B184B' },
  ]
};


const otherSportData: { [key: string]: any } = {
  handball: {
    name: 'Handball',
    icon: Hand,
    team: [{ name: 'Player A', position: 'Pivot', imageUrl: 'https://picsum.photos/100/100?random=21', dataAiHint: "handball player action" }, { name: 'Player B', position: 'Arrière', imageUrl: 'https://picsum.photos/100/100?random=22', dataAiHint: "handball player throwing" }],
    results: { rank: 2, points: 45, lastMatch: 'Nul 28-28 vs EST' },
    news: [{ title: 'Qualification pour la finale de la coupe', date: '17/07/2024' }],
  },
  basketball: {
    name: 'Basketball',
    icon: Dribbble,
    team: [{ name: 'Player X', position: 'Meneur', imageUrl: 'https://picsum.photos/100/100?random=31', dataAiHint: "basketball player dribbling" }, { name: 'Player Y', position: 'Ailier', imageUrl: 'https://picsum.photos/100/100?random=32', dataAiHint: "basketball player shooting" }],
    results: { rank: 3, points: 40, lastMatch: 'Défaite 75-82 vs USMo' },
    news: [{ title: 'Recrutement d\'un joueur étranger', date: '16/07/2024' }],
  },
  volleyball: {
    name: 'Volleyball',
    icon: Volleyball,
    team: [{ name: 'Player P', position: 'Central', imageUrl: 'https://picsum.photos/100/100?random=41', dataAiHint: "volleyball player spiking" }, { name: 'Player Q', position: 'Passeur', imageUrl: 'https://picsum.photos/100/100?random=42', dataAiHint: "volleyball player setting" }],
    results: { rank: 1, points: 50, lastMatch: 'Victoire 3-0 vs CSS' },
    news: [{ title: 'Stage de préparation en Europe', date: '14/07/2024' }],
  },
};

const footballGeneralInfo = {
  name: 'Football',
  icon: Swords,
  results: { rank: 3, points: 57, lastMatch: 'Victoire 2-1 vs CA' },
  news: [
    { title: 'Préparation intensive avant le prochain match', date: '18/07/2024' },
    { title: 'Nouveau sponsor maillot annoncé', date: '15/07/2024' },
  ],
};

function getSportDetails(sport: string) {
    if (sport.toLowerCase() === 'football') {
      return { ...footballGeneralInfo, team: footballTeamData };
    }
    return otherSportData[sport.toLowerCase()];
}

export default async function SportSectionPage({ params }: { params: { sport: string } }) {
  const sportDetails = getSportDetails(params.sport);

  if (!sportDetails) {
    notFound();
  }

  const SportIcon = sportDetails.icon;
  const isFootball = params.sport.toLowerCase() === 'football';

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b pb-4 mb-6">
        <SportIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Équipe Première</h1> 
      </div>

      {isFootball ? (
          <Tabs defaultValue="effectif" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6"> {/* Changed to 4 cols */}
                  <TabsTrigger value="presentation">Présentation</TabsTrigger>
                  <TabsTrigger value="effectif">Effectif</TabsTrigger>
                   <Link
                     href="/sections/football/classement"
                     className={cn(
                       "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                       "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                       "hover:bg-muted/50" 
                     )}
                   >
                     Classement
                   </Link>
                   <Link
                     href="/sections/football/coupe-de-tunisie" // Link to the new page
                     className={cn(
                       "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                       "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                       "hover:bg-muted/50"
                     )}
                   >
                     <Award className="h-4 w-4 mr-2" /> Coupe de Tunisie {/* Added Icon */}
                   </Link>
              </TabsList>
              <TabsContent value="presentation">
                  <Card>
                      <CardHeader>
                          <CardTitle>Présentation de la Section Football</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                          <p className="text-muted-foreground">
                            Bienvenue dans la section football de l'Etoile Sportive du Sahel. Ici vous trouverez les dernières actualités, 
                            informations sur l'effectif, le calendrier des matchs, le classement en championnat et le parcours en Coupe de Tunisie.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <Link href="/sections/football#effectif" className="block">
                               <Button variant="outline" className="w-full justify-start gap-2">
                                 <Users className="h-5 w-5 text-primary" /> Voir l'effectif complet
                               </Button>
                             </Link>
                             <Link href="/sections/football/classement" className="block">
                               <Button variant="outline" className="w-full justify-start gap-2">
                                 <BarChart3 className="h-5 w-5 text-primary" /> Consulter le classement
                               </Button>
                             </Link>
                             <Link href="/calendrier" className="block">
                               <Button variant="outline" className="w-full justify-start gap-2">
                                 <CalendarDays className="h-5 w-5 text-primary" /> Calendrier des matchs
                               </Button>
                             </Link>
                             <Link href="/sections/football/coupe-de-tunisie" className="block">
                               <Button variant="outline" className="w-full justify-start gap-2">
                                 <Award className="h-5 w-5 text-primary" /> Parcours Coupe de Tunisie
                               </Button>
                             </Link>
                          </div>

                          <Card className="mt-6">
                              <CardHeader>
                                  <CardTitle className="flex items-center gap-2"><Newspaper className="h-5 w-5 text-primary" /> Actualités Football</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <ul className="space-y-3">
                                      {sportDetails.news.map((newsItem: any, index: number) => (
                                          <li key={index} className="border-b pb-2 last:border-b-0">
                                              <p className="font-medium">{newsItem.title}</p>
                                              <p className="text-sm text-muted-foreground">{newsItem.date}</p>
                                          </li>
                                      ))}
                                      {sportDetails.news.length === 0 && <p className="text-muted-foreground text-center">Aucune actualité pour cette section.</p>}
                                  </ul>
                                   <Button variant="link" asChild className="mt-4 p-0 h-auto text-primary">
                                       <Link href="/actualites?category=football">
                                           Voir toutes les actualités football <ArrowRight className="ml-1 h-4 w-4" />
                                       </Link>
                                   </Button>
                              </CardContent>
                          </Card>
                      </CardContent>
                  </Card>
              </TabsContent>
              <TabsContent value="effectif">
                  <section className="mb-8">
                      <h2 className="text-2xl font-semibold mb-4">Gardiens</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                          {sportDetails.team.gardiens.map((player: any) => (
                              <PlayerCard key={player.name} player={player} position="Gardien" />
                          ))}
                      </div>
                      {sportDetails.team.gardiens.length === 0 && <p className="text-muted-foreground text-center">Aucun gardien enregistré.</p>}
                  </section>

                  <section className="mb-8">
                      <h2 className="text-2xl font-semibold mb-4">Défenseurs</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                          {sportDetails.team.defenseurs.map((player: any) => (
                              <PlayerCard key={player.name} player={player} position="Défenseur" />
                          ))}
                      </div>
                       {sportDetails.team.defenseurs.length === 0 && <p className="text-muted-foreground text-center">Aucun défenseur enregistré.</p>}
                  </section>

                  <section className="mb-8">
                      <h2 className="text-2xl font-semibold mb-4">Milieux</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                          {sportDetails.team.milieux.map((player: any) => (
                              <PlayerCard key={player.name} player={player} position="Milieu" />
                          ))}
                      </div>
                      {sportDetails.team.milieux.length === 0 && <p className="text-muted-foreground text-center">Aucun milieu enregistré.</p>}
                  </section>

                  <section>
                      <h2 className="text-2xl font-semibold mb-4">Attaquants</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                          {sportDetails.team.attaquants.map((player: any) => (
                              <PlayerCard key={player.name} player={player} position="Attaquant" />
                          ))}
                      </div>
                      {sportDetails.team.attaquants.length === 0 && <p className="text-muted-foreground text-center">Aucun attaquant enregistré.</p>}
                  </section>
              </TabsContent>
          </Tabs>
      ) : (
          <>
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
                                      data-ai-hint="sports player action" 
                                  />
                                  <p className="font-medium text-sm">{player.name}</p>
                                  <p className="text-xs text-muted-foreground">{player.position}</p>
                              </div>
                          ))}
                      </div>
                      {sportDetails.team.length === 0 && <p className="text-muted-foreground text-center">Informations sur l'effectif bientôt disponibles.</p>}
                  </CardContent>
              </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> Résultats & Classement</span>
                    </CardTitle>
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
          </>
      )}
    </div>
  );
}

