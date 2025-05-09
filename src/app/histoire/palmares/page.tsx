'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Trophy, Camera, Hand, Dribbble, Volleyball } from 'lucide-react';
import { historyData as clubHistoryData } from '../page'; // Assuming historyData is exported from ../page.tsx
import { getTrophyImage } from '@/lib/trophy-images'; // Import the helper

type TrophyItem = {
  name: string;
  totalCount: number;
  icon: React.ElementType;
  years: string;
  winYears?: number[];
  mainImageUrl?: string;
  trophyIconUrl?: string;
  trophyIconDataAiHint?: string; // Hint for the trophy icon image
  dataAiHint?: string; // Hint for the main gallery image
  imageGalleryCount?: number;
};

const footballPalmares: TrophyItem[] = clubHistoryData.trophies.map(trophy => {
  const nameParts = trophy.name.toLowerCase().split(' ');
  const iconHint = nameParts.length > 1 ? `${nameParts[0]} ${nameParts[1]}`.substring(0,20) : nameParts[0].substring(0,20);
  return {
    ...trophy,
    mainImageUrl: trophy.mainImageUrl || `https://picsum.photos/300/200?random=football-${trophy.name.replace(/\s/g, '-')}`,
    trophyIconUrl: getTrophyImage(trophy.name),
    trophyIconDataAiHint: iconHint,
    dataAiHint: trophy.dataAiHint || `club trophy celebration`, // Default for gallery image
    imageGalleryCount: trophy.totalCount > 1 ? trophy.totalCount : undefined,
  };
});

const handballPalmares: TrophyItem[] = [
  { name: 'Championnat de Tunisie Handball', totalCount: 5, icon: Hand, years: '2010, 2012, 2015, 2018, 2022', mainImageUrl: 'https://picsum.photos/300/200?random=handball-league', trophyIconUrl: getTrophyImage('Championnat de Tunisie Handball'), trophyIconDataAiHint: 'handball league', dataAiHint: 'handball league trophy', imageGalleryCount: 5 },
  { name: 'Coupe de Tunisie Handball', totalCount: 3, icon: Hand, years: '2011, 2016, 2020', mainImageUrl: 'https://picsum.photos/300/200?random=handball-cup', trophyIconUrl: getTrophyImage('Coupe de Tunisie Handball'), trophyIconDataAiHint: 'handball cup', dataAiHint: 'handball cup trophy', imageGalleryCount: 3 },
];

const basketballPalmares: TrophyItem[] = [
  { name: 'Championnat de Tunisie Basketball', totalCount: 7, icon: Dribbble, years: '2008, 2009, 2013, 2014, 2017, 2019, 2021', mainImageUrl: 'https://picsum.photos/300/200?random=basketball-league', trophyIconUrl: getTrophyImage('Championnat de Tunisie Basketball'), trophyIconDataAiHint: 'basketball league', dataAiHint: 'basketball league trophy', imageGalleryCount: 7 },
  { name: 'Coupe de Tunisie Basketball', totalCount: 4, icon: Dribbble, years: '2007, 2010, 2018, 2023', mainImageUrl: 'https://picsum.photos/300/200?random=basketball-cup', trophyIconUrl: getTrophyImage('Coupe de Tunisie Basketball'), trophyIconDataAiHint: 'basketball cup', dataAiHint: 'basketball cup trophy', imageGalleryCount: 4 },
];

const volleyballPalmares: TrophyItem[] = [
  { name: 'Championnat de Tunisie Volleyball', totalCount: 6, icon: Volleyball, years: '2005, 2006, 2011, 2012, 2016, 2020', mainImageUrl: 'https://picsum.photos/300/200?random=volleyball-league', trophyIconUrl: getTrophyImage('Championnat de Tunisie Volleyball'), trophyIconDataAiHint: 'volleyball league', dataAiHint: 'volleyball league trophy', imageGalleryCount: 6 },
];


const TrophyCard = ({ trophy }: { trophy: TrophyItem }) => {
  const LucideIconComponent = trophy.icon;
  return (
    <Card className="w-full bg-card shadow-sm hover:shadow-md transition-shadow duration-200 mb-6 rounded-xl">
      <div className="flex items-center justify-between p-4 sm:p-6">
        {/* Left Part: Icon and Count */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          {trophy.trophyIconUrl ? (
            <Image
              src={trophy.trophyIconUrl}
              alt={`${trophy.name} Trophy Icon`}
              width={60} // Adjust size as needed, e.g., 60 or 80
              height={80} // Adjust size as needed
              className="object-contain"
              data-ai-hint={trophy.trophyIconDataAiHint || "sports trophy"}
            />
          ) : (
            LucideIconComponent && (
              <LucideIconComponent className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
            )
          )}
          <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">{trophy.totalCount}</span>
        </div>

        {/* Middle Part: Title and Years */}
        <div className="flex-1 min-w-0 mx-4 sm:mx-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground truncate">{trophy.name}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">{trophy.years}</p>
        </div>

        {/* Right Part: Gallery Image */}
        {trophy.mainImageUrl && (
          <div className="w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 relative rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={trophy.mainImageUrl}
              alt={`Image gallery for ${trophy.name}`}
              layout="fill"
              objectFit="cover"
              data-ai-hint={trophy.dataAiHint || "club trophy celebration"}
            />
            {trophy.imageGalleryCount && trophy.imageGalleryCount > 1 && (
              <div className="absolute top-1.5 right-1.5 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                <Camera className="h-3 w-3" /> +{trophy.imageGalleryCount}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};


export default function PalmaresCompletPage() {
  const [activeTab, setActiveTab] = useState('football');

  const TABS_CONFIG = [
    { value: 'football', label: 'Football', data: footballPalmares, icon: Trophy },
    { value: 'handball', label: 'Handball', data: handballPalmares, icon: Hand },
    { value: 'basketball', label: 'Basket-ball', data: basketballPalmares, icon: Dribbble },
    { value: 'volleyball', label: 'Volley-ball', data: volleyballPalmares, icon: Volleyball },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/histoire" className="inline-flex items-center text-sm text-primary hover:underline mb-6 group">
        <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
        Retour à l'Histoire
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Palmarès</h1>
         <p className="text-muted-foreground mt-2">Un héritage de victoires et de trophées.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          {TABS_CONFIG.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.icon && <tab.icon className="h-4 w-4 mr-2" />}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS_CONFIG.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="space-y-0"> {/* Removed space-y-6 */}
            {tab.data.length > 0 ? (
              tab.data.map((trophy) => (
                <TrophyCard key={`${tab.value}-${trophy.name}`} trophy={trophy} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-10">Aucun palmarès disponible pour {tab.label.toLowerCase()}.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}